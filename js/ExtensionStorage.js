function ExtensionStorage() {
    var es = this;
    this.savedCallback = null;
    this.savedKey = null;
    // firefox storage
    if (typeof chrome === "undefined") {
        this.getLocal = function(key, callback) {
            es.savedCallback = callback;
            es.savedKey = key;
            self.port.emit("get", key);
        }
        this.getSync = this.getLocal;
        this.setLocal = function(data, callback) {
            es.savedCallback = callback;
            self.port.emit("set", data);
        }
        this.setSync = this.setLocal;
        self.port.on("getResult",function(data) {
            var ret = {};
            if (data !== null)
                ret[es.savedKey] = data;
            es.savedCallback(ret);
        });
        self.port.on("setResult",function(result) {
            es.savedCallback();
        });
    }
    // chrome storage
    else {
        this.getLocal = chrome.storage.local.get;
        this.setLocal = chrome.storage.local.set;
        this.setSync = chrome.storage.sync.set;
        this.getSync = chrome.storage.sync.get;
    }
}