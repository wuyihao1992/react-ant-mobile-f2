/**
 * 事件订阅/发布
 * */
class _Event {
  constructor() {
    this._events = {};
  }
  on(event, fn) {
    if (Array.isArray(event)) {
      event.forEach((e) => { this.on(e, fn) });
    } else {
      (this._events[event] || (this._events[event] = [])).push(fn);
    }
  }
  once(event, fn) {
    function on () {
      this.off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
  }
  off(event, fn) {
    if (!arguments.length) {
      this._events = Object.create(null);
      return true;
    }
    if (Array.isArray(event)) {
      event.forEach((e) => { this.off(e, fn) });
      return true;
    }
    let eventFns = this._events[event];
    if (!eventFns) {
      return false;
    }
    if (!fn) {
      this._events[event] = null;
      return true;
    }
    if (fn) {
      let eventFn;
      let len = eventFns.length;
      while (len--) {
        eventFn = eventFns[len];
        if (eventFn === fn || eventFn.fn === fn) {
          eventFns.splice(len, 1);
          break;
        }
      }
      return true;
    }
  }
  emit(event) {
    let eventFns = this._events[event];
    if (eventFns) {
      let [ , ...rest ] = arguments;
      eventFns.forEach((fn) => {
        try {
          fn.apply(this, rest);
        } catch (err) {
          console.error(`Error: event handler for "${event}"`, err, this);
        }
      });
    }
  }
}
function createSingleton(construct) {
  let storage = null;
  let handle = {
    construct: function(trapTarget, argumentList) {
      if (!storage) {
        storage = new trapTarget(argumentList[0]);
      }
      return storage;
    },
  };
  return new Proxy(construct, handle);
}
let Event = createSingleton(_Event);

global.GlobalEvent = new Event();
