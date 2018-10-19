//saves full source code of page to variable
var url1 = $(".url1").val();

//loads JSON-encoded data from the server using a GET HTTP request. Saves as variable.
var markup1;
var myUrl = 'https://dl.acm.org/citation.cfm?id=3240360';

var urls = [
    'http://dl.acm.org/citation.cfm?id=3240357',
    'http://dl.acm.org/citation.cfm?id=3240375',
    'http://dl.acm.org/citation.cfm?id=3240381',
    'http://dl.acm.org/citation.cfm?id=3241852',
    'http://dl.acm.org/citation.cfm?id=3241865',
]

function getData(myUrl, callback) {
    return $.getJSON(
        'https://allorigins.me/get?url=' + encodeURIComponent(myUrl) + '&callback=?',
        callback,
    );
}

const test = (url) => {
    return new Promise((resolve, reject) => {
        getData(url, data => resolve(data));
    });
}

function regexFunction(resolvedData) {
    var arr = resolvedData.contents.match(/(<title>(.*)<\/title>)|"Conference Website"(.*)>(.*)<\/a>|"Author Profile Page"(.*)>(.*)<\/a>|award.*alt="(.*)"\s/gm);

    return arr;
}


let promises = urls.map(test);
let results = Promise.all(promises).then(data => data.map(regexFunction));
console.log(results);



//capture paper title, award name, author names and conference names from web page markup inside JSON-encoded data

//push appropriate table cells with paper title, award name, author names and conference names 

//write function to add above text content to formatted HTML markup

//repeat for ten table rows of papers