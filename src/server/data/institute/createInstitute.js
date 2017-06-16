// @flow
import { GraphQLString, GraphQLNonNull } from 'graphql'
import createInstituteValidator from 'shared/validators/createInstituteValidator'
import { ValidationError } from 'server/error'
import { InstituteEdge } from './InstituteType'
import { authMutation, assertCap, edgeWrap } from '../shared/mutation'

const input = () => ({
  name: { type: new GraphQLNonNull(GraphQLString) },
  country: { type: new GraphQLNonNull(GraphQLString) },
  website: { type: new GraphQLNonNull(GraphQLString) }
})

const output = () => ({
  newInstituteEdge: edgeWrap(InstituteEdge, ({ institute }) => institute)
})

async function nameTaken (ctx, name: string) {
  // TODO: Using search is not ideal
  const institutes = await ctx.entities.Institute.loadMany('', true, { search: name, per_page: 1 })
  if (institutes[0] && institutes[0].name === name) {
    return true
  }
  return false
}

export default authMutation('CreateInstitute', input, output, async (user, i, ctx) => {
  await assertCap(user, 'institute:create')
  const { Institute } = ctx.entities
  createInstituteValidator(i)

  // $FlowIgnore
  if (await nameTaken(ctx, i.name)) {
    throw new ValidationError('Name already taken', 'name')
  }

  const institute = await Institute.create()
  institute.setFields(i)
  await Institute.commit(institute)

  return {
    institute
  }
})
