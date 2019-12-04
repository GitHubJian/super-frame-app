const event = require('./event')

class SuperFrameApp extends event.EventEmitter {
  constructor() {
    super()
  }

  render() {
    // 渲染 video 元素
    this.emit('DOMContentLoaded')

    this.emit('load')
    // 卸载 video
    this.emit('unload')
  }

  destroy() {
    this.emit('beforeunload')
    // 卸载 video
    this.emit('unload')
  }
}

module.exports = SuperFrameApp
