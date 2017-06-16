// @flow
import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql'
import NewApplicationEmail from 'server/email/NewApplicationEmail'
import { ValidationError, AuthorizationError } from 'server/error'
import registerAuthorValidator from 'shared/validators/registerAuthorValidator'
import { toLocalId } from 'server/data/util'
import { mutation } from '../shared/mutation'
import { isHandleTaken } from './util/isHandleTaken'

const input = () => ({
  firstName: { type: new GraphQLNonNull(GraphQLString) },
  lastName: { type: new GraphQLNonNull(GraphQLString) },
  email: { type: new GraphQLNonNull(GraphQLString) },
  handle: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },
  confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
  degree: { type: new GraphQLNonNull(GraphQLString) },
  customDegree: { type: GraphQLString },
  fieldOfExpertise: { type: new GraphQLNonNull(GraphQLID) },
  institute: { type: new GraphQLNonNull(GraphQLString) },
  instituteCountry: { type: new GraphQLNonNull(GraphQLString) },
  facultyWebsite: { type: new GraphQLNonNull(GraphQLString) },
  pub1Title: { type: new GraphQLNonNull(GraphQLString) },
  pub1Url: { type: new GraphQLNonNull(GraphQLString) },
  pub2Title: { type: new GraphQLNonNull(GraphQLString) },
  pub2Url: { type: new GraphQLNonNull(GraphQLString) },
  notes: { type: GraphQLString },
  agreement: { type: new GraphQLNonNull(GraphQLString) }
})

const output = () => ({})

export default mutation('RegisterAuthor', input, output, async (i, ctx) => {
  if (ctx.userId !== null) {
    throw new AuthorizationError('You are already registered')
  }

  const { User, Application, Category } = ctx.entities
  registerAuthorValidator(i)
  const degree = i.degree !== 'other' ? i.degree : i.customDegree

  // FIXME: Using the handle function feels hacky
  if (await isHandleTaken(ctx, i.email)) {
    throw new ValidationError('Email address is already in use', 'email')
  }

  if (await isHandleTaken(ctx, i.handle)) {
    throw new ValidationError('Handle is already taken!', 'handle')
  }

  const cat = await Category.get(toLocalId(i.fieldOfExpertise))
  if (cat === null) {
    throw new ValidationError('Invalid category', 'fieldOfExpertise')
  }

  const author = await User.create()
  const application = await Application.create()

  author.setFields({
    roles: ['capeia-applicant'],
    firstName: i.firstName,
    lastName: i.lastName,
    email: i.email,
    slug: i.handle,
    password: i.password,
    degree: degree,
    fieldOfExpertise: i.fieldOfExpertise
  })

  application.setFields({
    institute: i.institute,
    instituteCountry: i.instituteCountry,
    facultyWebsite: i.facultyWebsite,
    pub1Title: i.pub1Title,
    pub1Url: i.pub1Url,
    pub2Title: i.pub2Title,
    pub2Url: i.pub2Url,
    notes: i.notes
  })

  await ctx.elevate(() => User.commit(author))
  application.applicant = author
  await ctx.elevate(() => Application.commit(application))

  new NewApplicationEmail(ctx, application).send()
  return {}
})
