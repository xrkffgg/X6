---
title: 鼠标滚轮 MouseWheel
order: 13
redirect_from:
  - /zh/docs
  - /zh/docs/manual
  - /zh/docs/manual/tutorial
---

鼠标滚轮的默认行为是滚动页面，启用 [`Scroller`](./scroller) 后用于滚动画布，但在某些场景下我们需要用滚轮来缩放画布，所为了避免交互冲突，通常配合修饰键来实现滚轮缩放画布，参考下面配置。

```ts
const graph = new Graph({
  scroller: {
    enabled: true,
    pageVisible: true,
    pageBreak: false,
    panning: true,
  },
  mousewheel: {
    enabled: true,
    modifiers: ['ctrl', 'meta'],
  },
})
```

## 选项

```ts
interface MouseWheelOptions {
  enabled?: boolean
  global?: boolean
  factor?: number
  fixed?: boolean
  modifiers?: string | ('alt' | 'ctrl' | 'meta' | 'shift')[] | null
  guard?: (this: Graph, e: MouseWheelEvent) => boolean
}
```

### enabled

是否开启滚轮缩放交互。

### factor

滚动缩放因子。默认为 `1.2`。

### fixed

是否将鼠标位置作为中心缩放，默认为 `true`。

### global

是否为全局事件，设置为 `true` 时滚轮事件绑定在 `Document` 上，否则绑定在画布容器上。默认为 `false`。

### modifiers

修饰键(如 `'alt'`、`'ctrl'`、`'meta'`、`'shift'`)，设置修饰键后需要按下修饰键并滚动鼠标滚轮时才触发画布缩放。通过设置修饰键可以解决默认滚动行为与画布缩放冲突问题。

支持配置单个（如 `'alt'`）或多个（如 `['alt', 'ctrl']`）修饰键，通过数组形式配置的多个修饰键是*或关系*，比如刚刚配置的修饰键表示按下 `'alt'` 或 `'ctrl'`，如果需要更加灵活的配置，可以使用如下这些形式：

- `'alt|ctrl'` 表示按下 `'alt'` 或 `'ctrl'`。
- `'alt&ctrl'` 表示同时按下 `'alt'` 和 `'ctrl'`。
- `'alt|ctrl&shift'` 表示同时按下 `'alt'` 和 `'shift'` 或者同时按下 `'ctrl'` 和 `'shift'`。

### guard

判断一个滚轮事件是否应该被处理，返回 `false` 时对应的事件被忽略。

```ts
const graph = new Graph({
  mousewheel: {
    enabled: true,
    guard(this: Graph, e: MouseWheelEvent) {
      if (e.altKey) { // 当按下 alt 键时，忽略所有滚动事件
        return false 
      }
      return true
    },
  },
})
```

## Playground

> 按住 `Command` 键通过滚轮缩放画布，建议点击 Playground 中【在新窗口中预览】按钮打开新窗口体验。

<iframe
  src="https://codesandbox.io/embed/x6-playground-mousewheel-zwj4v?fontsize=14&hidenavigation=1&theme=light&view=preview"
  style="width:100%; height:500px; border:1px solid #f0f0f0; border-radius: 4px; overflow:hidden; margin-top: 16px;"
  title="x6-playground-mousewheel"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>