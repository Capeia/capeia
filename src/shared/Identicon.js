// @flow // TODO: Check overhead caused by these libs (only used here!)
import crypto from 'crypto'
import ColorScheme from 'color-scheme'
import React from 'react'

type Point = {
  x: number,
  y: number
}

type Props = {
  seed: string,
  width: number,
  height: number
}

function round (x: number) {
  return Math.round(x * 100) / 100
}

export default class Identicon extends React.Component {
  static defaultProps = {
    width: 120,
    height: 120
  }

  props: Props

  _renderSlice (
    center: Point,
    innerRadius: number,
    outerRadius: number,
    angle: number,
    size: number,
    fill: string,
    key: string) {
    // overlap angles slightly to avoid visible seams
    const jitter = 0.01
    // round to avoid having minor deviations w/ SSR (reconciliation)
    innerRadius = round(innerRadius)
    outerRadius = round(outerRadius)
    const x1 = round(center.x + Math.cos(angle - size / 2 - jitter) * outerRadius)
    const x2 = round(center.x + Math.cos(angle + size / 2 + jitter) * outerRadius)
    const y1 = round(center.y + Math.sin(angle - size / 2 - jitter) * outerRadius)
    const y2 = round(center.y + Math.sin(angle + size / 2 + jitter) * outerRadius)
    const cx = round(center.x + Math.cos(angle) * innerRadius)
    const cy = round(center.y + Math.sin(angle) * innerRadius)

    const d = `M${x1},${y1} ` +
              `A${outerRadius},${outerRadius} 0 0,1 ${x2},${y2} ` +
              `L${cx},${cy}`
    return (
      <path
        key={key}
        d={d}
        fill={fill} />
    )
  }

  _renderRing (
    colors: Array<string>,
    digest: Buffer,
    center: Point,
    radius: number,
    innerRadius: number,
    keyPrefix: string
  ) {
    const paths = []
    const parts = 6 + digest[0] % 50
    const size = 2 * Math.PI / parts

    for (let idx = 0; idx < parts; idx++) {
      const angle = 2 * Math.PI * (idx / parts)

      let fill = '#' + colors[idx * digest[9] % colors.length]
      // inward facing slice
      // TODO: Omitting this also looks cool - for now we'll stick with it though
      paths.push(this._renderSlice(
        center,
        innerRadius,
        radius,
        angle,
        size,
        // size * 0.005, // This also looks cool, but is wasteful (use lines)
        fill,
        `${keyPrefix}-${idx}-a`
      ))

      fill = '#' + colors[Math.abs((parts - digest[idx % digest.length]) % colors.length)]
      // outward facing slice
      paths.push(this._renderSlice(
        center,
        radius,
        innerRadius,
        angle + size / 2,
        2 * Math.PI / parts,
        fill,
        `${keyPrefix}-${idx}-b`
      ))
    }

    return paths
  }

  render () {
    const { seed, width, height } = this.props
    const digest = crypto.createHash('sha1').update(seed).digest()
    const center = {x: width / 2.0, y: height / 2.0}
    const radius = width / 2.0
    const innerRadius = radius * 0.8

    let paths = []

    // draw background circle
    paths.push(
      <circle key='bg' cx={center.x} cy={center.y} r={radius} fill='white' />
    )

    // outer ring
    const scheme = new ColorScheme()
    scheme.from_hue(digest[8] % 10).scheme('triade').variation('pastel')
    const colors = scheme.colors()
    paths = paths.concat(this._renderRing(colors, digest, center, radius, innerRadius, 'outer'))

    // inner ring
    scheme.from_hue(50 + digest[6] % 10).scheme('triade').variation('pastel')
    const colors2 = scheme.colors()
    paths = paths.concat(this._renderRing(colors2, digest, center, radius * 0.75, innerRadius * 0.4, 'inner'))

    return (
      <svg width={width} height={height}>
        {paths}
      </svg>
    )
  }
}
