/**
 * 1.localStorage: 本地存储
 * 2.sessionStorage: 会话存储
 * 3.页面内实现跳转属于同一个会话
 */

/**
 * 常用api: setItem, getItem, key, removeItem, clear
 */


class Cache {
    constructor (isLocal = true) {
        this.storage = isLocal ? localStorage : sessionStorage
    }

    setItem (key, value) {
       value && this.storage.setItem(key, JSON.stringify(value))
    }

    getItem (key) {
        this.storage.getItem(key)
    }

    removeItem (key) {
        this.storage.removeItem(key)
    }

    clear () {
        this.storage.clear()
    }
}

const localCache = new Cache()
const sessionCache = new Cache(false)

export {
    localCache,
    sessionCache
}