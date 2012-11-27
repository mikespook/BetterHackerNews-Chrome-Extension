$(document).ready(function(){
    var i = 0;
    $('.subtext').each(function() {
        $(this).parent('tr').prev('tr').attr('id', 'bhn_1_' + i);
        $(this).parent('tr').attr('id', 'bhn_2_' + i);
        $(this).parent('tr').next('tr').attr('id', 'bhn_3_' + i);

        var l = $(this).parent('tr').prev('tr').children('td.title').children('a');
        var title = l.text().replace(/\"/g, '\'').replace(/'/g, "\\'");
        var url = l.attr('href');
        $(this).append(" | <a href=\"javascript:hide_item(" + i + ",'" + url + "');\">hide</a>")
        $(this).append(" | <a href=\"javascript:add_bookmark('" + title +
        "', '" + url + "');\">bookmark</a>");
        if (localStorage['HIDE_' + url]) {
            $('#bhn_1_' + i).hide();
            $('#bhn_2_' + i).hide();
            $('#bhn_3_' + i).hide();              
        }
        i ++;
    });
    var script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = chrome.extension.getURL('js/context.js');
    document.getElementsByTagName("head")[0].appendChild(script);

    window.addEventListener("message", function(event) {
        if (event.source != window)
            return;
        if (event.data.type && (event.data.type == "BOOKMARK")) {
            chrome.extension.sendMessage(event.data);
            return;
        }
        if (event.data.type && (event.data.type == "HIDE")) {
            $('#bhn_1_' + event.data.id).hide();
            $('#bhn_2_' + event.data.id).hide();
            $('#bhn_3_' + event.data.id).hide();
            localStorage['HIDE_' + event.data.url] = new Date();
            return;
        }
    }, false);

    var now = new Date();
    for(key in localStorage) {
        if (key.substr(0, 5) == "HIDE_") {
            if ((now - new Date(localStorage[key])) > 1000 * 60 * 60 * 24 * 7) {
                localStorage.removeItem(key)
            }
        }
    }
})
