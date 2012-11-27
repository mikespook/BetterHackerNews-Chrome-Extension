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
        }
    }
);
