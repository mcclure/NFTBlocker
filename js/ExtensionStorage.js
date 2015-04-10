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
        this.getLocal = function (key, callback) { chrome.storage.local.get(key, callback) };
        this.setLocal = function (data, callback) { chrome.storage.local.set(data, callback) };
        this.getSync = function (key, callback) { chrome.storage.sync.get(key, callback) };
        this.setSync = function (data, callback) { chrome.storage.sync.set(data, callback) };;
    }
}