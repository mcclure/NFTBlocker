const mobileTwitterBearerToken = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';

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
