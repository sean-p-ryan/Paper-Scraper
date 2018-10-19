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

function test(myUrl, callback) {
    $.getJSON(
        'https://allorigins.me/get?url=' + encodeURIComponent(myUrl) + '&callback=?',
        function(data){
            // console.log('I\'m in a callback');
            // variableToStore = data;
            // console.log('Here\'s the data:', variableToStore);
            // callback(variableToStore);
            console.log(data);
            callback(data);
        }
    );
}

function myCallback(workingVariable) {
    // console.log('I\'m in another callback');
    var arr = workingVariable.contents.match(/(<title>(.*)<\/title>)|"Conference Website"(.*)>(.*)<\/a>|"Author Profile Page"(.*)>(.*)<\/a>|award.*alt="(.*)"\s/gm);

    console.log('arr:');
    console.log(arr);
    // console.log('FIN');
    // return arr;
    return arr;
}

function getResult(urls) {
    return urls.map(function(url) {
        return test(url, myCallback);
    });
}

let urlResults = getResult(urls);

// async function anotherAsyncWrapper(urls) {
//     let result = await getResult(urls)
//     console.log(result);
//     return result;
// }

// anotherAsyncWrapper(urls);



// async function mapUrls(urls) {
//     let result = await urls.map(async function(url) {
//         let singleResult = await test(url, myCallback);
//         return singleResult;
//     });

//     console.log(result);
//     return result;
// }

// async function getResult(urls) {
//     let result = await mapUrls(urls);
//     console.log(result);
// }

// getResult(urls);

// var result = urls.map(url => {
//     return test(url, myCallback);
// });


// test(markup1, myCallback);




//capture paper title, award name, author names and conference names from web page markup inside JSON-encoded data

//push appropriate table cells with paper title, award name, author names and conference names 

//write function to add above text content to formatted HTML markup

//repeat for ten table rows of papers