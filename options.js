// Saves options to localStorage.
function save_options() {
    localStorage["favorite_dir"] = $('#dir').val();
    console.debug(localStorage["favorite_dir"]);
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var favorite = localStorage["favorite_dir"];
    if (!favorite) {
        return;
    }
    var dir = $('#dir');
    var options = $('option', dir);
    options.each(function() {
        if ($(this).text() == favorite)
        $(this).select();
    });
}

function add_bookmarks(root, bookmarks) {
    bookmarks.forEach(function(bookmark) {
        if (bookmark.children) {
            root = root + bookmark.title + '/';
            $('#dir').append(new Option(root, bookmark.id));
            add_bookmarks(root, bookmark.children);
        }
    });
} 

function build_selector() {
    chrome.bookmarks.getTree(function(bookmarks) {
        add_bookmarks('', bookmarks);
    });
}

$(document).ready(function(){
    build_selector();
    restore_options();
    $('#save').click(save_options);
})
