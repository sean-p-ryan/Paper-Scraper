//saves full source code of page to variable
var url1 = $(".url1").val()

//loads JSON-encoded data from the server using a GET HTTP request. Saves as variable.
var markup1 = $.getJSON('https://allorigins.me/get?url=' + encodeURIComponent('https://dl.acm.org/citation.cfm?id=3240360') + '&callback=?', function(data){
    return data.contents;
});

//capture paper title, award name, author names and conference names from web page markup inside JSON-encoded data

//push appropriate table cells with paper title, award name, author names and conference names 

//write function to add above text content to formatted HTML markup

//repeat for ten table rows of papers