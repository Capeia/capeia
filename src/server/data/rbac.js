// @flow
import RBAC from 'easy-rbac'

// TODO: It would be cool if we could return custom error messages from these

async function onlyOwnUnpublished ({ actor, article, context }, cb) {
  if (article.status === 'publish') {
    cb(null, false)
    return
  }
  const author = await context.elevate(() => article.author)
  if (actor.id !== author.id) {
    cb(null, false)
    return
  }
  cb(null, true)
}

async function whenInFieldOfExpertise ({ actor, category }, cb) {
  cb(null, (await actor.fieldOfExpertise).id === category.id)
}

async function whenOwnMedia ({ actor, media }, cb) {
  const author = await media.author
  if (author == null) {
    // Author is not yet publicly visible, in any case, it's not the actor
    cb(null, false)
    return
  }
  cb(null, actor.id === author.id)
}

async function whenSelf ({ actor, author, source }, cb) {
  // Compat for restrict()
  // TODO: This is getting too messy
  const user = author || source
  cb(null, actor.id === user.id)
}

async function whenDonee ({ actor, source: donation }, cb) {
  const donee = await donation.donee
  cb(null, donee != null && actor.id === donee.id)
}

async function whenOwnReward ({ actor, reward }, cb) {
  const author = await reward.author
  cb(null, author != null && actor.id === author.id)
}

async function whenClaimDonee ({ actor, claim }, cb) {
  const donee = await claim.donee
  cb(null, donee != null && actor.id === donee.id)
}

export default new RBAC({
  'capeia-editor': {
    can: [
      'sign-in',
      'user:impersonate',
      'author:set-institute',
      'author:set-allow-site-donations',
      'author:update',
      'author:private-fields',
      'user:create',
      'application:set-status',
      'institute:create',
      'institute:private-fields',
      'article:create',
      'article:update',
      'article:publish',
      'article:set-editorial',
      'media:upload',
      'media:update',
      'donation:private-fields',
      'list-applications',
      'list-authors',
      'list-institutes'
    ]
  },
  'capeia-author': {
    can: [
      'sign-in',
      'stripe:connect',
      { name: 'article:create', when: whenInFieldOfExpertise },
      { name: 'article:update', when: onlyOwnUnpublished },
      'donation:receive',
      { name: 'donation:private-fields', when: whenDonee },
      { name: 'article:publish', when: onlyOwnUnpublished },
      'media:upload',
      { name: 'media:update', when: whenOwnMedia },
      { name: 'author:update', when: whenSelf },
      { name: 'author:private-fields', when: whenSelf },
      'extended-profile-page',
      'reward:create',
      { name: 'reward:update', when: whenOwnReward },
      { name: 'reward-claim:update', when: whenClaimDonee }
    ]
  },
  'capeia-guest': {
    can: [
      'sign-in',
      { name: 'article:create', when: whenInFieldOfExpertise },
      { name: 'article:update', when: onlyOwnUnpublished },
      // TODO: In the future guests won't be able to do this
      { name: 'article:publish', when: onlyOwnUnpublished },
      'media:upload',
      { name: 'media:update', when: whenOwnMedia },
      { name: 'author:update', when: whenSelf },
      { name: 'author:private-fields', when: whenSelf },
      { name: 'reward-claim:update', when: whenClaimDonee }
    ]
  },
  'capeia-applicant': {
    can: [
      'post:submit-for-review', // TODO: Rename to article
      {
        name: 'sign-in',
        when: async ({ actor }, cb) => {
          // TODO: Also check if application hasn't been denied!
          const { institute } = await actor.affiliation
          cb(null, institute !== null)
        }
      },
      'stripe:connect',
      { name: 'article:create', when: whenInFieldOfExpertise },
      { name: 'article:update', when: onlyOwnUnpublished },
      // This is somewhat misleading, as we primarily need this for
      // setAffiliationIdentifier. While applicants technically can receive
      // donations, they are not publicly visible - so they won't receive any.
      'donation:receive',
      { name: 'donation:private-fields', when: whenDonee },
      'media:upload',
      { name: 'media:update', when: whenOwnMedia },
      { name: 'author:update', when: whenSelf },
      { name: 'author:private-fields', when: whenSelf },
      'extended-profile-page',
      'reward:create',
      { name: 'reward:update', when: whenOwnReward }
    ]
  },
  'capeia-institute-manager': {
    can: [
      'sign-in',
      'stripe:connect',
      // FIXME: Not an author ...
      { name: 'author:update', when: whenSelf },
      // TODO: Should also have access to institutes authors!
      { name: 'author:private-fields', when: whenSelf }
    ]
  }
})
