function ExtensionStorage() {
    this.getLocal = function (key, callback) {
        chrome.storage.local.get(key, callback)
    };
    this.setLocal = function (data, callback) {
        chrome.storage.local.set(data, callback)
    };
    this.getSync = function (key, callback) {
        if (chrome.storage.sync) {
            chrome.storage.sync.get(key, callback)
        } else {
            chrome.storage.local.get(key, callback)
        }
    };
    this.setSync = function (data, callback) {
        if (chrome.storage.sync) {
            chrome.storage.sync.set(data, callback)
        } else {
            chrome.storage.local.set(data, callback)
        }
    }
}