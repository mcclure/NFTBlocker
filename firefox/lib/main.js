var buttons = require('sdk/ui/button/action');
var { ToggleButton } = require('sdk/ui/button/toggle');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var array = require('sdk/util/array');
var workers = [];
var self = require("sdk/self");

var popup = require("sdk/panel").Panel({
    contentURL: data.url("popup.html"),
    contentScriptFile: data.url("popup.js")
});

popup.on('click', function() {
    popup.hide();
});

var contextPanel = require("sdk/panel").Panel({
    contentURL: data.url("contextmenu.html"),
    onHide: handleHide
});

function handleHide() {
    button.state('window', {checked: false});
}

contextPanel.on("click",function(option) {
    if (option == "blockAll") {
        var worker = findWorkerForCurrentTab();
        if (worker) {
            worker.port.emit("blockChainStart", true);
        }
        else {
            popup.show();
        }
    }
    else {
        require("sdk/tabs").open(data.url("options.html"));
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
    contentScriptFile: [data.url("jquery.min.js"),data.url("Queue.js"),data.url("blockchain.js")],
    onAttach: function(worker) {
        array.add(workers, this);
        worker.on('detach', function () { array.remove(workers, this); });
        //worker.on('pageshow', function() { array.add(workers, this); });
        //worker.on('pagehide', function() { array.remove(workers, this); });
    }
});