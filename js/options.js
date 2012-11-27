// Saves options to localStorage.
function save_favorite() {
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

function build_favorite_selector() {
    chrome.bookmarks.getTree(function(bookmarks) {
        add_bookmarks('', bookmarks);
        restore_options();
    });
}

function build_hide() {
    if(localStorage['hide_auto'] == "true") {
        $('#hide_auto').prop('checked', true);
    } else {
        $('#hide_auto').prop('checked', false);
    }
    var days = localStorage['hide_days'];
    if (!days) {
        days = 7;    
    }
    $('#hide_days').val(days);
}

function save_hide() {
    localStorage['hide_auto'] = $('#hide_auto').is(':checked');
    localStorage['hide_days'] = $('#hide_days').val();
    var alert = $('#hide-alert');
    alert.show(200);
    setTimeout(function() {
        alert.hide(1000);
    }, 5000);
}

function reset_hide() {
    for(key in localStorage) {
        if (key.substr(0, 5) == "HIDE_") {
            localStorage.removeItem(key);        
        }
    }
    var alert = $('#hide-reset-alert');
    alert.show(200);
    setTimeout(function() {
        alert.hide(1000);
    }, 5000);
}

$(document).ready(function(){
    build_favorite_selector();
    build_hide(); 
    $('#save-favorite').click(save_favorite);
    $('#save-hide').click(save_hide);
    $('#reset-hide').click(reset_hide);
})
