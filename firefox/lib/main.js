var buttons = require('sdk/ui/button/action');
var { ToggleButton } = require('sdk/ui/button/toggle');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var array = require('sdk/util/array');
var workers = [];
var self = require("sdk/self");
var ss = require("sdk/simple-storage");

var popup = require("sdk/panel").Panel({
    contentURL: data.url("popup.html"),
    contentScriptFile: data.url("popup.js")
});

popup.on('click', function() {
    popup.hide();
});

var contextPanel = require("sdk/panel").Panel({
    contentURL: data.url("contextmenu.html"),
    contentScriptFile: data.url("contextmenu.js"),
    onHide: handleHide
});

function handleHide() {
    button.state('window', {checked: false});
}

contextPanel.port.on("click",function(option) {
    if (option == "activate") {
        var worker = findWorkerForCurrentTab();
        if (worker) {
            worker.port.emit("blockChainStart", true);
        }
        else {
            popup.show();
        }
    }
    else {
        require("sdk/tabs").open({
            url: "options.html",
            onReady: function(tab) {
                var worker = tab.attach({
                    contentScriptFile: [
                        data.url('bower_components/jquery/dist/jquery.js'),
                        data.url('bower_components/datatables/media/js/jquery.dataTables.min.js'),
                        data.url('bower_components/angular/angular.js'),
                        data.url('bower_components/angular-route/angular-route.min.js'),
                        data.url('bower_components/angular-datatables/dist/angular-datatables.min.js'),
                        data.url('js/ExtensionStorage.js'),
                        data.url('js/options.js')
                    ]
                });
                worker.port.on("get",function(key) {
                    worker.port.emit("getResult",ss.storage[key]);
                });
                worker.port.on("set",function(data) {
                    for (var key in data) {
                        ss.storage[key] = data[key];
                    }
                    worker.port.emit("setResult", true);
                });
            }
        });
    }    
});

var button = ToggleButton({
    id: "twitter-block-chain-link",
    label: "Twitter Block Chain",
    icon: {
    "16": "./icon16.png",
    "32": "./icon32.png",
    "64": "./icon64.png"
    },
    onChange: handleChange
});

function handleChange(state) {
  if (state.checked) {
    contextPanel.show({
      position: button
    });
  }
}

function findWorkerForCurrentTab(){
    var i;
	for(i = 0;i < workers.length;i++){
        console.log(i,workers[i]);
		if (workers[i].tab == tabs.activeTab){
            try {
                workers[i].port.emit('are-you-frozen');
            }
            catch(e) {
                continue;
            }
			return workers[i];
		}
	}
	return false;
}

pageMod.PageMod({
    include: "*.twitter.com",
    contentStyleFile: data.url("css/content.css"),
    contentScriptFile: [data.url("bower_components/jquery/dist/jquery.min.js"),data.url("js/Queue.js"),data.url("js/ExtensionStorage.js"),data.url("js/blockchain.js")],
    onAttach: function(worker) {
        array.add(workers, this);
        worker.on('detach', function () { array.remove(workers, this); });
        worker.port.on("get",function(key) {
            worker.port.emit("getResult",ss.storage[key]);
        });
        worker.port.on("set",function(data) {
            for (var key in data) {
                ss.storage[key] = data[key];
            }
            worker.port.emit("setResult", true);
        });
        //worker.on('pageshow', function() { array.add(workers, this); });
        //worker.on('pagehide', function() { array.remove(workers, this); });
    }
});