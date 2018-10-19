// //saves full source code of page to variable
// var url1 = $(".url1").val();


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


// get clean data out of Regex strings
var arr = [

"<title>Causal embeddings for recommendation</title>",
"\"Author Profile Page\" target=\"_self\">Stephen Bonner</a>",
"\"Author Profile Page\" target=\"_self\">Flavian Vasile</a>",
"\"Conference Website\" target=\"_blank\"><img style=\"margin-top:5px; border-width:1px; border-color:black\" src=\"https://portalparts.acm.org/3250000/3240323/thumb/cover_thumb.jpg\" height=\"102\" width=\"79\" alt=\"Cover Image\" /></a>",
"\"Conference Website\" target=\"_self\" class=\"link-text\">RecSys '18</a>",
"award.jpg\" alt=\"Best Paper\" "

]

function cleanStrings(arr){

	var title = arr[0].replace("<title>", "").replace("</title>", "");
	var award = arr[arr.length -1].replace("award.jpg\" alt=\"", "").replace("\" ", "");
	var conference = arr[arr.length - 2].replace("\"Conference Website\" target=\"_self\" class=\"link-text\">", "").replace("</a>", "");
	var authorsNumber = arr.length - 4;
	var authors = [];

	for (i = 1; i < authorsNumber + 1; i++){
		var author = arr[i].replace("\"Author Profile Page\" target=\"_self\">", "").replace("</a>", "");

		if (i != 1){
			authors.push(" " + author);
		} else {

			authors.push(author);
		}
	}

	console.log("this is the title " + title);
	console.log("this is the award " + award);
	console.log("this is the conference " + conference);
	console.log("these are the authors " + authors);
}

cleanStrings(arr);

// //loads JSON-encoded data from the server using a GET HTTP request. Saves as variable.
// var markup1;

// function getWebPage(variableToStore, callback) {
//    $.getJSON(
//        'https://allorigins.me/get?url=' + encodeURIComponent('https://dl.acm.org/citation.cfm?id=3240360') + '&callback=?',
//        function(data){
//            console.log('I\'m in a callback');
//            variableToStore = data;
//            console.log('Here\'s the data:', variableToStore);
//            callback(variableToStore);
//        }
//    );
// }

// function myCallback(workingVariable) {
//    console.log('I\'m in another callback');
//    var arr = workingVariable.contents.match(/(<title>(.*)<\/title>)|"Conference Website"(.*)>(.*)<\/a>|"Author Profile Page"(.*)>(.*)<\/a>|award.*alt="(.*)"\s/gm);

//    console.log('Here\'s the arr');
//    console.log(arr);
//    console.log('FIN');
// }

// getWebPage(markup1, myCallback);



	// var arr = [
	//   "<title>Causal embeddings for recommendation</title>",
	//   "\"Author Profile Page\" target=\"_self\">Stephen Bonner</a>",
	//   "\"Author Profile Page\" target=\"_self\">Flavian Vasile</a>",
	//   "\"Conference Website\" target=\"_blank\"><img style=\"margin-top:5px; border-width:1px; border-color:black\" src=\"https://portalparts.acm.org/3250000/3240323/thumb/cover_thumb.jpg\" height=\"102\" width=\"79\" alt=\"Cover Image\" /></a>",
	//   "\"Conference Website\" target=\"_self\" class=\"link-text\">RecSys '18</a>",
	//   "award.jpg\" alt=\"Best Paper\" "
	// ]


//gets title from arr[0]
// arr[0].replace("<title>", "").replace("</title>", "");

//gets conference out of full string 
// arr[arr.length - 2].replace("\"Author Profile Page\" target=\"_self\">", "").replace("</a>", "")

//gets award name out of full string
// arr[arr.length -1].replace("award.jpg\" alt=\"", "").replace("\" ", "");

//get individual author name
// arr[1].replace("\"Author Profile Page\" target=\"_self\">", "").replace("</a>", "");

// function cleanStrings(arr){
// 	var title = arr[0].replace("<title>", "").replace("</title>", "");
// 	var award = arr[arr.length -1].replace("award.jpg\" alt=\"", "").replace("\" ", "");
// 	var conference = arr[arr.length - 2].replace("\"Author Profile Page\" target=\"_self\">", "").replace("</a>", "");
// 	var authorsNumber = arr.length - 4;
// 	var authors = [];

// 	for (i = 1; i = authorsNumber - 1; i++){
// 		arr[i].replace("\"Author Profile Page\" target=\"_self\">", "").replace("</a>", "");
// 		authors.push(arr[i]);
// 	}

// 	consolelog(title);

// }

// cleanStrings(arr);





