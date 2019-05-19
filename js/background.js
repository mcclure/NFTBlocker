const runtimeid = chrome.runtime.id;
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        //details holds all request information. 
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            //Find and change the particular header.
            if (details.requestHeaders[i].name === 'Origin' && details.requestHeaders[i].value == 'chrome-extension://'+runtimeid) {
                details.requestHeaders[i].value ="https://twitter.com";
                break;
            }
        }
        return { requestHeaders: details.requestHeaders };
    },
    {urls: ['https://twitter.com/i/user/block']},
    ['blocking', 'requestHeaders']
);