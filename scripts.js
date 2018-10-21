// //saves full source code of page to variable
// var url1 = $(".url1").val();


//loads JSON-encoded data from the server using a GET HTTP request. Saves as variable.
var myUrl = 'https://dl.acm.org/citation.cfm?id=3240360';

var urls = [
	'http://dl.acm.org/citation.cfm?id=3240357',
	'http://dl.acm.org/citation.cfm?id=3240375',
	'http://dl.acm.org/citation.cfm?id=3240381',
	'http://dl.acm.org/citation.cfm?id=3241852',
	'http://dl.acm.org/citation.cfm?id=3241865',
]

//pull data from paper web page on Digital Library
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

//pulls only needed strings out of webpage markup with Regex
function regexFunction(resolvedData) {
	var arr = resolvedData.contents.match(/(<title>(.*)<\/title>)|"Conference Website"(.*)>(.*)<\/a>|"Author Profile Page"(.*)>(.*)<\/a>|award.*alt="(.*)"\s/gm);

	return arr;
}

let cleaned = [];
let promises = urls.map(test);
let results =
	Promise.all(promises)
		.then(data => {
			return data.map(regexFunction)
		})
		.then(regexes => {
			console.log(cleanStrings);
			return regexes.map(regex => {
				return cleanStrings(regex);
			});
		})
		// .then(results => {
		// 	results.forEach(result => {
		// 		cleaned.push(result);
		// 	});
		// });
		.then(results => {
			return mapUrls(urls, results);
		})
		.then(tableRows => {
			const table = $("#table-body");
			return tableRows.forEach(row => {
				table.append(`<tr><td>${row.url}</td><td>${row.title}</td><td>${row.award}</td><td>${row.authors}</td><td>${row.conference}</td></tr>`);
			})
		})

// console.log(results);


// get clean data out of Regex strings
var arr = [
	"<title>Causal embeddings for recommendation</title>",
	"\"Author Profile Page\" target=\"_self\">Stephen Bonner</a>",
	"\"Author Profile Page\" target=\"_self\">Flavian Vasile</a>",
	"\"Conference Website\" target=\"_blank\"><img style=\"margin-top:5px; border-width:1px; border-color:black\" src=\"https://portalparts.acm.org/3250000/3240323/thumb/cover_thumb.jpg\" height=\"102\" width=\"79\" alt=\"Cover Image\" /></a>",
	"\"Conference Website\" target=\"_self\" class=\"link-text\">RecSys '18</a>",
	"award.jpg\" alt=\"Best Paper\" ",
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

	console.log("THE TITLE IS: " + title);
	console.log("THE AWARD NAME IS: " + award);
	console.log("THE CONFERENCE NAME IS: " + conference);
	console.log("THE AUTHORS ARE: " + authors);
	return {
		award,
		conference,
		authorsNumber,
		authors,
		title,
	}
}

function mapUrls(urls, resultsObjectsArray) {
	return resultsObjectsArray.map((resultsObject, index) => {
		return Object.assign({}, resultsObject, { url: urls[index] });
	});
}

cleanStrings(arr);


