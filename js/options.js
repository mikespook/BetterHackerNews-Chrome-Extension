// Saves options to localStorage.
function save_options() {
    localStorage["favorite_dir"] = $('#default-folder').val();
    // Update status to let user know options were saved.
    var alert = $('#favorite-alert');
    alert.show(200);
    setTimeout(function() {
        alert.hide(1000);
    }, 5000);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var favorite = localStorage["favorite_dir"];
    if (!favorite) {
        return;
    }
    var folder = $('#default-folder');
    var options = $('option', folder);
    options.each(function() {
        if ($(this).attr('value') == favorite) {
            console.debug('select: ' + favorite);
            $(this).attr('selected', '');
        }
    });
}

function add_bookmarks(root, bookmarks) {
    bookmarks.forEach(function(bookmark) {
        if (bookmark.children) {
            var t = root + bookmark.title + '/';
            $('#default-folder').append(new Option(t, bookmark.id));
            add_bookmarks(t, bookmark.children);
        }
    });
} 

function build_selector() {
    chrome.bookmarks.getTree(function(bookmarks) {
        add_bookmarks('', bookmarks);
        restore_options();
    });
}

$(document).ready(function(){
    build_selector();
    $('#save-favorite').click(save_options);
})
