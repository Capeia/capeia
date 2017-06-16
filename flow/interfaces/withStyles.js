/**
 * Flowtype declaration for the withStyles higher-order component provided
 * by 'isomorphic-style-loader'. This enables type checking for the styled
 * component.
 *
 * FIXME: This does not support stateless functional components!
 * @flow
 */
declare module 'isomorphic-style-loader/lib/withStyles' {
  declare function exports<D, P, S, C: React$Component<D, P, S>>(
    ...styles: Array<Object>
  ): (component: Class<$Subtype<C>>) => Class<$Subtype<C>>
}
