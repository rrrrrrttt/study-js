class EventBus {
    constructor() {
        this.eventBus = {}
    }

    on(eventName, eventCallback, thisArg) {
        let handlers = this.eventBus[eventName]
        if (!handlers) {
            handlers = []
            this.eventBus[eventName] = handlers
        }
        handlers.push({ eventCallback, thisArg })
    }

    off(eventName, eventCallback) {
        if (eventName && eventCallback) {
            const handlers = this.eventBus[eventName]
            const newHandlers = [...handlers]
            for (let index = 0; index < newHandlers; index++) {
                const handler = newHandlers[index];
                if(handler.eventCallback === eventCallback) {
                    const index = handlers.indexOf(handler)
                    handlers.splice(index, 1)
                }
            }
        }
    }

    emit(eventName, ...payload) {
        const handlers = this.eventBus[eventName]
        if (!handlers) return
        handlers.forEach(handler => {
            handler.eventCallback.apply(handler.thisArg, payload)
        })
    }

    once(eventName, eventCallback, thisArg) {
        const tempCallback = (...payload) => {
            this.off(eventName, eventCallback)
            eventCallback.apply(thisArg, payload)
        }
        return this.on(eventName, tempCallback, thisArg)
    }
}


const eventBus = new EventBus()


const handerCallback = function (payload) {
    console.log('监听callback', this, payload);
}

eventBus.on('abc', handerCallback, { name: 'aaa' })

eventBus.emit('abc', 'payload1')
eventBus.off('abc', handerCallback)


// eventBus.off('abc')