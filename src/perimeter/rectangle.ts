import { State } from '../core'
import { Rectangle, Point } from '../struct'

export function rectangle(
  bounds: Rectangle,
  state: State,
  next: Point = new Point(),
  orthogonal: boolean = false,
) {
  const cx = bounds.getCenterX()
  const cy = bounds.getCenterY()
  const dx = next.x - cx
  const dy = next.y - cy
  const alpha = Math.atan2(dy, dx)
  const p = new Point(0, 0)
  const PI = Math.PI
  const PI_HALF = Math.PI / 2
  const beta = PI_HALF - alpha
  const t = Math.atan2(bounds.height, bounds.width)

  if (alpha < -PI + t || alpha > PI - t) {
    // Left edge
    p.x = bounds.x
    p.y = cy - bounds.width * Math.tan(alpha) / 2
  } else if (alpha < -t) {
    // Top Edge
    p.y = bounds.y
    p.x = cx - bounds.height * Math.tan(beta) / 2
  } else if (alpha < t) {
    // Right Edge
    p.x = bounds.x + bounds.width
    p.y = cy + bounds.width * Math.tan(alpha) / 2
  } else {
    // Bottom Edge
    p.y = bounds.y + bounds.height
    p.x = cx + bounds.height * Math.tan(beta) / 2
  }

  if (orthogonal) {
    if (next.x >= bounds.x && next.x <= bounds.x + bounds.width) {
      p.x = next.x
    } else if (next.y >= bounds.y && next.y <= bounds.y + bounds.height) {
      p.y = next.y
    }
    if (next.x < bounds.x) {
      p.x = bounds.x
    } else if (next.x > bounds.x + bounds.width) {
      p.x = bounds.x + bounds.width
    }

    if (next.y < bounds.y) {
      p.y = bounds.y
    } else if (next.y > bounds.y + bounds.height) {
      p.y = bounds.y + bounds.height
    }
  }

  return p
}
