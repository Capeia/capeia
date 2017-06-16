// @flow
import { GraphQLNonNull, GraphQLID } from 'graphql'
import { ApplicationType, ApplicationStatusType } from './ApplicationType'
import { toLocalId } from 'server/data/util'
import { UserType } from 'server/data/user'
import { authMutation, assertCap } from '../shared/mutation'

const input = () => ({
  applicationId: { type: new GraphQLNonNull(GraphQLID) },
  status: { type: new GraphQLNonNull(ApplicationStatusType) }
})

const output = () => ({
  application: {
    type: ApplicationType
  },
  user: {
    type: UserType
  }
})

export default authMutation('SetApplicationStatus', input, output, async (user, i, ctx) => {
  await assertCap(user, 'application:set-status')
  const { Application, User } = ctx.entities

  const application = await Application.get(toLocalId(i.applicationId))
  if (application == null) {
    throw new Error('Invalid application')
  }

  const applicant = await application.applicant

  application.status = i.status
  if (i.status === 'accepted') {
    applicant.type = 'capeia-author'
  }
  await Application.commit(application)
  await User.commit(applicant)

  // TODO: Send email to applicant (now author)
  return {
    application,
    user: applicant
  }
})
