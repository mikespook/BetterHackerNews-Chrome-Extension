console.debug("Better Hacker News")

function add_bookmark(title, url) {
    var favorite = localStorage["favorite_dir"];
    if (!favorite) {
        favorite = 0;
    }
    chrome.bookmarks.create({'parentId': favorite,
        'title': title, 'url': url});
}
