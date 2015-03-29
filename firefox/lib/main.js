var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var array = require('sdk/util/array');
var workers = [];

var popup = require("sdk/panel").Panel({
  contentURL: data.url("popup.html"),
  contentScriptFile: data.url("popup.js")
});
popup.on('click', function() {
    popup.hide();
});

var button = buttons.ActionButton({
  id: "twitter-block-chain-link",
  label: "Twitter Block Chain",
  icon: {
    "16": "./icon16.png",
    "32": "./icon32.png",
    "64": "./icon64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
    var worker = findWorkerForCurrentTab();
    if (worker) {
        worker.port.emit("blockChainStart", true);
    }
    else {
        popup.show();
    }
    //woerk.port.emit("blockChainStart", true);
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