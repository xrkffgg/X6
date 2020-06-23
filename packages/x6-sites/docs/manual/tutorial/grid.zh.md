---
title: 网格 Grid
order: 4
redirect_from:
  - /zh/docs
  - /zh/docs/manual
  - /zh/docs/manual/tutorial
---

网格是渲染/移动节点的最小单位，网格默认大小为 `10px`，渲染节点时表示以 `10` 为最小单位对齐到网格，如位置为 `{ x: 24, y: 38 }`的节点渲染到画布后的实际位置为 `{ x: 20, y: 40 }`， 移动节点时表示每次移动最小距离为 `10px`。

## 网格大小

初始化画布时，通过下面配置来设置网格大小。

```ts
const graph = new Graph({
  grid: 10,
})

// 等同于
const graph = new Graph({
  grid: {
    size: 10,
  },
})
```

创建画布后，可以调用 `graph.setGridSize(20)` 方法来修改网格大小，并触发网格重绘（如果网格可见）。

## 网格样式

网格默认不可见，初始化画布时，通过下面配置来绘制网格。

```ts
const graph = new Graph({
  grid: true, // 网格大小 10px，并绘制网格
})

// 等同于
const graph = new Graph({
  grid: {
    size: 10,      // 网格大小 10px
    visible: true, // 绘制网格
  },
})
```

同时，我们内置了以下四种网格样式，默认使用 `dot` 样式。

- dot (默认值)
- fixedDot
- mesh
  ```ts
  const graph = new Graph({
      grid: {
        size: 10,
        visible: true,
        type: 'dot', // 'dot' | 'fixedDot' | 'mesh'
        args: { 
          color: '#a0a0a0', // 网格线/点颜色
          thickness: 1,     // 网格线宽度/网格点大小
        },
      },
  })
  ```
- doubleMesh
  ```ts
  const graph = new Graph({
      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          { 
            color: '#a0a0a0', // 主网格线颜色
            thickness: 1,     // 主网格线宽度
          },
          { 
            color: '#a0a0a0', // 次网格线颜色
            thickness: 1,     // 次网格线宽度
            factor: 4,        // 主次网格线间隔
          },
        ],
      },
  })
  ```

创建画布后可以调用 `graph.drawGrid(options?: DrawGridOptions)` 来重绘网格。

```ts
// 选项类型定义
type DrawGridOptions = 
| {
    type: 'dot' | 'fixedDot' | 'mesh'
    args?: {
      color: string     // 网格线/点颜色
      thickness: number // 网格线宽度/网格点大小
    }
  }
| {
    type: 'doubleMesh'
    args?: [
      {
        color: string     // 主网格线颜色
        thickness: number // 主网格线宽度
      },
      {
        color: string     // 次网格线颜色
        thickness: number // 次网格线宽度
        factor: number    // 主次网格线间隔
      },
    ]
  }  
| {
    type: string // 自定义网格类型
    args?: any   // 自定义网格参数 
  }
```

例如，使用网格颜色 `#f0f0f0` 和默认线宽绘制 `mesh` 网格。

```ts
graph.drawGrid({
  type: 'mesh',
  args: {
    color: '#f0f0f0'
  },
})
```


## Playground

- 选择体验不同的网格样式。
- 设置不同的网格大小，通过拖动节点来了解网格大小对节点位置的影响。
- 设置网格颜色和网点/线框大小。

<iframe
  src="https://codesandbox.io/embed/x6-playground-grid-bzoy0?fontsize=14&hidenavigation=1&theme=light&view=preview"
  style="width:100%; height:500px; border: 1px solid #f0f0f0; border-radius: 4px; overflow:hidden; margin-top: 16px;"
  title="x6-playground-grid"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## API

- `graph.drawGrid(options?: DrawGridOptions)` 绘制网格
- `graph.getGridSize()` 获取网格大小
- `graph.setGridSize(gridSize: number)` 设置网格大小
- `graph.showGrid()` 显示网格
- `graph.hideGrid()` 隐藏网格
- `graph.clearGrid()` 隐藏并销毁网格