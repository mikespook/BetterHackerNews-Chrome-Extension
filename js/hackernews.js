$(document).ready(function(){
    // add links
    addUI();

    // page css
    addCss('css/bootstrap.min.css');
    addCss('css/bootstrap-responsive.min.css');

    // page script
    addScript('js/jquery.min.js');
    addScript('js/bootstrap.min.js');
    addScript('js/context.js');
    // receiving messages from page
    messageProcessing();
})

function addScript(file) {
    var script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = chrome.extension.getURL(file);
    document.getElementsByTagName("body")[0].appendChild(script);     
}

function addCss(file) {
    var link = document.createElement("link");
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = chrome.extension.getURL(file);
    document.getElementsByTagName("head")[0].appendChild(link);
}

function addUI() {
    var i = 0;
    $('.subtext').each(function() {
        $(this).parent('tr').prev('tr').attr('id', 'bhn_1_' + i);
        $(this).parent('tr').attr('id', 'bhn_2_' + i);
        $(this).parent('tr').next('tr').attr('id', 'bhn_3_' + i);

        var l = $(this).parent('tr').prev('tr').children('td.title').children('a');
        var title = l.text().replace(/\"/g, '\'').replace(/'/g, "\\'");
        var url = l.attr('href');
        l.attr('onclick', "click_item(" + i + ",'" + url + "');").attr('target', '_blank');
        $(this).append(" | <a href=\"javascript:hide_item(" + i + ",'" + url + "');\">hide</a>")
        $(this).append(" | <a href=\"javascript:add_bookmark('" + title +
            "', '" + url + "');\">bookmark</a>");
        $(this).children('a').first().addClass('bhn_user');
        var obj = {type: 'CHECK', url: url};
        chrome.extension.sendMessage(obj, function(response) {
            console.debug(response);
            if (response) {
                $('#bhn_1_' + i).hide();
                $('#bhn_2_' + i).hide();
                $('#bhn_3_' + i).hide();              
            }
        }); 
        i ++;
    }); 
    chrome.extension.sendMessage({type: 'CLEAR'});
}

function messageProcessing() {
    window.addEventListener("message", function(event) {
        if (event.source != window) return;
        console.debug(event.data);
    if (event.data.type && (event.data.type == "BOOKMARK")) {
        chrome.extension.sendMessage(event.data);
        return;
    }
    if (event.data.type && (event.data.type == "HIDE")) {
        $('#bhn_1_' + event.data.id).hide();
        $('#bhn_2_' + event.data.id).hide();
        $('#bhn_3_' + event.data.id).hide();
        chrome.extension.sendMessage(event.data);       
        return;
    }
    if (event.data.type && (event.data.type == "CLICK")) {
        chrome.extension.sendMessage(event.data, function(response) {
            if (response) {
                $('#bhn_1_' + i).hide();
                $('#bhn_2_' + i).hide();
                $('#bhn_3_' + i).hide();              
            }
        }); 
        return;
    }
    }, false);   
}
