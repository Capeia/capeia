// @flow
import React from 'react'
import { Table, Button } from 'react-bootstrap'
import invariant from 'invariant'

type Props = {
  relay: Object,
  /**
   * Additional variables to be passed into the refetch query.
   * This is useful when the query itself requires paremeters (e.g. an ID).
   * Relay Modern only.
   */
  refetchVariables?: Object,
  children?: $FlowIssue,
  // FIXME Properly type this
  data: Object,
  className?: mixed,
  rowPropsFn?: (node: Object) => Object
}

type ColumnProps = {
  label: string, // eslint-disable-line react/no-unused-prop-types
  path?: string | Array<string>,
  children?: $FlowIssue,
  data: Object
}

export default class DataTable extends React.Component {
  props: Props
  static Column: ReactClass<ColumnProps>

  nextPage = () => {
    const { relay, data, refetchVariables } = this.props
    if (!data.morePageInfo || !data.morePageInfo.page) return
    const page = data.morePageInfo.page + 1

    // TODO RELAY Remove classic compat logic
    if (relay.refetch) {
      // Modern
      relay.refetch(fragmentVariables => ({ page, ...refetchVariables }))
    } else {
      // Classic
      relay.setVariables({ page })
    }
  }

  previousPage = () => {
    const { relay, data, refetchVariables } = this.props
    if (!data.morePageInfo || !data.morePageInfo.page) return
    const page = data.morePageInfo.page - 1

    // TODO RELAY Remove classic compat logic
    if (relay.refetch) {
      // Modern
      relay.refetch(fragmentVariables => ({ page, ...refetchVariables }))
    } else {
      // Classic
      relay.setVariables({ page })
    }
  }

  renderPageControls () {
    const { data } = this.props
    if (!data.morePageInfo) return null
    const { hasNextPage, hasPreviousPage, totalPages, page } = data.morePageInfo

    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {(totalPages && page) && `Page ${page} of ${totalPages}`}
        {page &&
          <span>
            <Button disabled={!hasPreviousPage} bsSize='xs' onClick={this.previousPage}>
              &lsaquo; Previous
            </Button>
            {' | '}
            <Button disabled={!hasNextPage} bsSize='xs' onClick={this.nextPage}>
              Next &rsaquo;
            </Button>
          </span>
        }
      </div>
    )
  }

  render () {
    const { data, children, className, rowPropsFn } = this.props
    const columns = React.Children.map(children, c => c.props.label)
    const hasLabels = columns.some(l => l !== '')

    return (
      <div>
        <Table className={className}>
          {hasLabels &&
            <thead>
              <tr>
                {columns && columns.map((label, i) => <th key={i}>{label}</th>)}
              </tr>
            </thead>
          }
          <tbody>
            {children && data.edges.map((edge, idx) => {
              const rowProps = rowPropsFn ? rowPropsFn(edge.node) : {}
              // Try to use node id if present, fall back to index
              const key = edge.node.id || idx
              return (
                <tr key={key} {...rowProps}>
                  {React.Children.map(children, c =>
                    React.cloneElement(c, { data: edge.node })
                  )}
                </tr>
              )
            })}
          </tbody>
        </Table>
        {this.renderPageControls()}
      </div>
    )
  }
}

export class Column extends React.Component {
  props: ColumnProps

  static defaultProps = {
    label: ''
  }

  render () {
    const { children, path, data } = this.props
    invariant((!children && path) || (children && !path),
      'Expected either \'children\' or \'path\'.')

    if (path) {
      const _path = (typeof path === 'string') ? [path] : path
      let displayValue = data
      _path.forEach(key => {
        displayValue = displayValue[key]
      })
      return <td>{displayValue}</td>
    }

    invariant(typeof children === 'function', 'Expected function as child.')
    return <td>{children(data)}</td>
  }
}

DataTable.Column = Column
