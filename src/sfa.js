const event = require('./event')

class SuperFrameApp extends event.EventEmitter {
  constructor(options = {}) {
    super()

    this.renderTree =
      options.renderTree ||
      function() {
        console.log('render tree')
      }

    this.on('DOMContentLoaded', function() {
      console.log('DOMContentLoaded Event')
    })

    this.on('load', function() {
      console.log('Onload Event')
    })

    this.on('beforeunload', function() {
      console.log('Onbeforeunload Event')
    })

    this.on('unload', function() {
      console.log('Onunload Event')
    })
  }

  request() {
    this.dns()
    this.load()
    this.parse()
    this.render()
  }

  // dns 解析 - 白页
  dns() {
    var layer = document.getElementById('layer')

    layer.classList.add('sfa-loading-open')

    console.log('dns parse')
  }
  // 下载 css js 资源
  load() {
    console.log('load assets')
  }
  // 解析资源 - 预创建
  parse() {
    // create video tag
    console.log('domtree & cssom')
  }
  // 渲染 - 创建
  render() {
    this.emit('DOMContentLoaded')

    this.renderTree()

    this.emit('load')
  }

  destroyLoadingLayer() {
    var layer = document.getElementById('layer')
    layer.classList.add('sfa-loading-close')
  }

  destroy() {
    this.destroyLoadingLayer()

    this.emit('beforeunload')
    // 卸载 video
    this.emit('unload')
  }
}

module.exports = SuperFrameApp
