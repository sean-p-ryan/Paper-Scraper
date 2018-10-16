//saves full source code of page to variable
var url1 = $(".url1").val()

//loads JSON-encoded data from the server using a GET HTTP request. Saves as variable.
var markup1 = $.getJSON('https://allorigins.me/get?url=' + encodeURIComponent('https://dl.acm.org/citation.cfm?id=3240360') + '&callback=?', function(data){
    return data.contents;
});

//