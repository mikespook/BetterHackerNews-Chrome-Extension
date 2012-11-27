function add_bookmark(title, url) {
    obj = {title: title, url: url, type: 'BOOKMARK'};
    window.postMessage(obj, "*");
}

function hide_item(i, url) {
    obj = {id: i, url: url, type: 'HIDE'};
    window.postMessage(obj, "*");       
}
