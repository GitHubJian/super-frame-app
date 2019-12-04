const event = require('./event')

class SuperFrameApp extends event.EventEmitter {
  constructor(options = {}) {
    super()

    this.bindEvent()

    this.init()
  }

  bindEvent() {
    this.on('DOMContentLoadedEvent', function() {
      console.log('DOMContentLoaded Event')
    })

    this.on('loadEvent', function() {
      console.log('Onload Event')
    })

    this.on('beforeunloadEvent', function() {
      console.log('Onbeforeunload Event')
    })

    this.on('unloadEvent', function() {
      console.log('Onunload Event')
    })

    this.on('load', function() {
      console.log('load assets')
    })

    this.on('parse', function() {
      console.log('预创建 video tag')
      console.log('domtree & cssom')
    })

    this.on('renderTree', function() {
      console.log('render tree')
    })

    this.on('init', function() {
      console.log('init')
    })
  }

  init() {
    this.emit('init')
  }

  request() {
    this.dns()
    this.load()
    this.parse()
    this.renderTree()
  }

  // dns 解析 - 白页
  dns() {
    var layer = document.getElementById('layer')

    layer.classList.add('sfa-loading-open')

    console.log('dns parse')
  }
  // 下载 css js 资源
  load() {
    this.emit('load')
  }
  // 解析资源 - 预创建
  parse() {
    // create video tag
    this.emit('parse')
  }
  // 渲染 - 创建
  renderTree() {
    this.emit('DOMContentLoadedEvent')

    this.emit('renderTree')

    this.emit('loadEvent')
  }

  destroyLoadingLayer() {
    var layer = document.getElementById('layer')
    layer.classList.add('sfa-loading-close')
  }

  destroy() {
    this.destroyLoadingLayer()

    this.emit('beforeunloadEvent')
    // 卸载 video
    this.emit('unloadEvent')
  }
}

module.exports = SuperFrameApp
