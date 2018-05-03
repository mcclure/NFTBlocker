function ExtensionStorage() {
    this.getLocal = function (key, callback) {
        browser.storage.local.get(key).then(callback)
    };
    this.setLocal = function (data, callback) {
        browser.storage.local.set(data).then(callback)
    };
    this.getSync = function (key, callback) {
        if (browser.storage.sync) {
            browser.storage.sync.get(key).then(callback)
        } else {
            browser.storage.local.get(key).then(callback)
        }
    };
    this.setSync = function (data, callback) {
        if (browser.storage.sync) {
            browser.storage.sync.set(data).then(callback)
        } else {
            browser.storage.local.set(data).then(callback)
        }
    }
}
