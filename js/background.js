function blockingListener(details) {
  return {cancel: true};
}
var tabId;
chrome.storage.onChanged.addListener(function(changes, namespace) {
  var doAdd = false;
  for (key in changes) {
    if (key == "tabId") {
      tabId = changes[key].newValue;
    }
    if (key == "removeImageBlock") {
      chrome.webRequest.onBeforeRequest.removeListener(
        blockingListener
      );
    }
    if (key == "addImageBlock") {
      doAdd = true;
    }
  }
  if (doAdd) {
    chrome.webRequest.handlerBehaviorChanged();
    chrome.webRequest.onBeforeRequest.addListener(
      blockingListener,
      {urls: ["*://*.twimg.com/*"], tabId: tabId},
      ["blocking"]
    );
  }
});