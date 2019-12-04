function isUndefined(v) {
  return void 0 === v
}

class EventEmitter {
  constructor() {
    this._events = this._events || {}
  }

  emit(event) {
    this._events || (this._events = {})

    var listeners = this._events[event]

    if (isUndefined(listeners)) {
      return !1
    }

    listeners.forEach(function(listener) {
      listener.call(null)
    })
  }

  on(event, listener) {
    this._events || (this._events = {})

    this._events[event] || (this._events[event] = [])

    this._events[event].push(listener)
  }
}

class Scenario extends EventEmitter {
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

var scenario = new Scenario()

scenario.on('DOMContentLoaded', function() {
  console.log('DOMContentLoaded')
})

scenario.render()
