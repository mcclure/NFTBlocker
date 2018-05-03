function ExtensionStorage() {
    function errorCB(callback) {
        return callback();
    }
    this.getLocal = function (key, callback) {
        browser.storage.local.get(key).then(callback, errorCB.bind(this, callback))
    };
    this.setLocal = function (data, callback) {
        browser.storage.local.set(data).then(callback, errorCB.bind(this, callback))
    };
    this.getSync = function (key, callback) {
        if (browser.storage.sync) {
            browser.storage.sync.get(key).then(callback, errorCB.bind(this, callback))
        } else {
            browser.storage.local.get(key).then(callback, errorCB.bind(this, callback))
        }
    };
    this.setSync = function (data, callback) {
        if (browser.storage.sync) {
            browser.storage.sync.set(data).then(callback, errorCB.bind(this, callback))
        } else {
            browser.storage.local.set(data).then(callback, errorCB.bind(this, callback))
        }
    }
}
