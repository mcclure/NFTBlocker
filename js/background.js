const runtimeid = chrome.runtime.id;
const mobileTwitterBearerToken = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        //details holds all request information. 
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            //Find and change the particular header.
            if (details.requestHeaders[i].name === 'Origin' && details.requestHeaders[i].value == 'chrome-extension://' + runtimeid) {
                details.requestHeaders[i].value = "https://twitter.com";
                break;
            }
        }
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ['https://twitter.com/i/user/block'] },
    ['blocking', 'requestHeaders']
);
function _makeRequest(obj) {
    const addtlHeaders = {
        authorization: mobileTwitterBearerToken,
        'x-csrf-token': obj.CSRFCookie,
    };
    if (obj.headers) {
        Object.assign(obj.headers, addtlHeaders);
    } else {
        obj.headers = addtlHeaders;
    }
    return fetch(
        obj.url, 
        {
            credentials: 'include',
            method: obj.method || "GET",
            headers: {
                ...obj.headers
            },
            body: obj.body
        }
    ).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        else {
            throw new Error(response.statusText);
        }
    })
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open(obj.method || "GET", obj.url);
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
}
// request.user_id
// request.CSRFCookie
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.contentScriptQuery == "doRequest") {
            _makeRequest({
                ...request,
                url: 'https://api.twitter.com/1.1/' + request.url,
            })
            .then((response) => sendResponse({success: true, response: response}))
            .catch((response) => sendResponse({success: false, response: response}))
            return true;  // Will respond asynchronously.
        }
    }
);
