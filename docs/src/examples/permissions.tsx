import React from 'react'
import { Graph, DomEvent } from '../../../src'

export class Permissions extends React.Component {
  private container: HTMLDivElement

  componentDidMount() {
    DomEvent.disableContextMenu(this.container)
    const graph = new Graph(this.container, {
      rubberband: true,
    })

    graph.batchUpdate(() => {
      const node1 = graph.addNode({
        data: 'Hello', x: 60, y: 60, width: 80, height: 30,
      })

      graph.addNode({
        data: 'Hello', x: 320, y: 60, width: 80, height: 30,
      })

      const node2 = graph.addNode({
        data: 'World', x: 240, y: 240, width: 80, height: 30,
      })

      graph.addEdge({ data: 'Edge Label', sourceNode: node1, targetNode: node2 })
    })
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  update() { }

  render() {
    return (
      <div>
        <div>
          <button>Enable All</button>
        </div>
        <div
          ref={this.refContainer}
          className="graph-container big" />
      </div>
    )
  }
}