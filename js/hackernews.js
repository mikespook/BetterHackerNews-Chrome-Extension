$(document).ready(function(){
    var i = 0;
    $('.subtext').each(function() {
        $(this).attr('id', 'test' + i);
        var l = $(this).parent('tr').prev('tr').children('td.title').children('a');
        console.debug(l);
        var title = l.text().replace(/\"/g, '\'').replace(/'/g, "\\'");
        var url = l.attr('href');
        $(this).append(" | <a href=\"javascript:void();\">hide</a>" + 
        " | <a href=\"javascript:add_bookmark('" + title +
        "', '" + url + "');\">bookmark</a>")
        i++;
    });
    var script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = chrome.extension.getURL('js/context.js');
    document.getElementsByTagName("head")[0].appendChild(script);
})
