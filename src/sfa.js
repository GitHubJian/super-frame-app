const event = require('./event')

class SuperFrameApp extends event.EventEmitter {
  constructor() {
    super()
  }

  render() {
    var layer = document.getElementById('layer')

    layer.classList.add('sfa-loading-open')
    // 渲染 video 元素
    this.emit('DOMContentLoaded')

    this.emit('load')
    // 卸载 video
    this.emit('unload')
  }

  destroy() {
    var layer = document.getElementById('layer')
    layer.classList.add('sfa-loading-close')

    this.emit('beforeunload')
    // 卸载 video
    this.emit('unload')
  }
}

module.exports = SuperFrameApp
