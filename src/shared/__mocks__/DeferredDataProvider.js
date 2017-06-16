import React from 'react'

type Props = {
  children?: $FlowFixMe
}

const DeferredDataProvider = ({children}: Props) => {
  const child = React.Children.only(children)
  const name = child.type.displayName || child.type.name || 'Unknown'
  return (
    <div>
      {'<DeferredDataProvider>'}
      {`  <${name.trim()} />`}
      {'</DeferredDataProvider>'}
    </div>
  )
}

export default DeferredDataProvider
