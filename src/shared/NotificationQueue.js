// @flow
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { OrderedMap } from 'immutable'
import s from './NotificationQueue.scss'

type NotificationType = 'info' | 'success' | 'error'

type Notification = {
  type: NotificationType,
  content: $FlowFixMe
}

type NotificationQueueState = {
  queue: OrderedMap<number, Notification>
}

type NotificationHandle = {
  remove: () => void,
  change: (content: ?$FlowFixMe, type?: NotificationType) => void
}

export type NotifyFn = (content: $FlowFixMe, type?: NotificationType) => NotificationHandle

class NotificationQueue extends React.Component {
  props: {
    register: (notify: NotifyFn) => void,
    max: number
  };

  nextId: number = 0
  state: NotificationQueueState = {
    queue: new OrderedMap()
  };

  componentDidMount () {
    this.props.register(this.notify)
  }

  notify: NotifyFn = (content, type = 'info') => {
    let { queue } = this.state
    if (queue.size === this.props.max) {
      queue = queue.rest()
    }
    const id = this.nextId++
    queue = queue.set(id, { type, content }).toOrderedMap()
    // $FlowFixMe: FlowType definitions for toOrderedMap are currently broken
    this.setState({ queue })

    return {
      remove: () => this.remove(id),
      change: (content: ?$FlowFixMe, type: ?NotificationType) => {
        let { queue } = this.state
        if (!queue.has(id)) return // could already have been removed
        queue = queue.update(id, (n) => {
          n.content = content || n.content
          n.type = type || n.type
          return n
        }).toOrderedMap()
        // $FlowFixMe: FlowType definitions for toOrderedMap are currently broken
        this.setState({ queue })
      }
    }
  };

  remove = (id: number) => {
    let { queue } = this.state
    queue = queue.delete(id)
    this.setState({ queue })
  };

  render () {
    return (
      <div>
        {this.state.queue.map((n, id) => (
          <div key={id} className={`${s.notification} ${s[n.type]}`}>
            {n.content}
          </div>
        )).reverse().toArray()}
      </div>
    )
  }
}

export default withStyles(s)(NotificationQueue)
