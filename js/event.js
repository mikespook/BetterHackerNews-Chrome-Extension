chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "BOOKMARK") {
            var dir = localStorage['favorite_dir'];
            if (!dir) {
                dir = 0;    
            }
            chrome.bookmarks.create({'parentId': dir,
                'title': request.title,
                'url': request.url});
            return;
        }
        if (request.type == "HIDE") {
            localStorage['HIDE_' + request.url] = new Date();
            return;
        }
        if (request.type == "CHECK") {
            sendResponse(localStorage['HIDE_' + request.url] != undefined);
            return;
        }
        if (request.type == "CLICK") {
            sendResponse(localStorage['hide_auto'] == 'true');
            request.type = 'HIDE';
            chrome.extension.sendMessage(request); 
            return;
        }
        if (request.type == "CLEAR") {
            clearStorage();
            return;
        }

    }
);

function clearStorage() {
    var now = new Date();
    for(key in localStorage) {
        if (key.substr(0, 5) == "HIDE_") {
            if ((now - new Date(localStorage[key])) > 1000 * 60 * 60 * 24 * 7) {
                localStorage.removeItem(key)
            }
        }
    }   
}
