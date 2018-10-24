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

// pull data from paper web page on Digital Library
function getData(myUrl, callback) {
	return $.getJSON(
		'https://allorigins.me/get?url=' + encodeURIComponent(myUrl) + '&callback=?',
		callback,
	);
}

const getPromisedData = (url) => {
	return new Promise((resolve, reject) => {
		getData(url, data => resolve(data));
	});
}

// pulls only needed strings out of webpage markup with Regex
function applyRegex (resolvedData) {
	// console.log("RESOLVED DATA");
	// console.log(resolvedData.contents);
	// return resolvedData.contents.match(/(<title>(.*)<\/title>)|"Conference Website"(.*)>(.*)<\/a>|"Author Profile Page"(.*)>(.*)<\/a>|award.*alt="(.*)"\s/gm);
	let html = resolvedData.contents;

	let rx = /(<title>(.*)<\/title>)|"Conference Website"(.*)>(.*)<\/a>|"Author Profile Page"(.*)>(.*)<\/a>|award.*alt="(.*)"\s/gm;

	let award = '';
	let authors = [];
	let conference = '';
	let title = '';

	while (rx.exec(html) !== null) {
		let iterationPass = rx.exec(html);
		console.log(iterationPass);

		if (iterationPass === null) {
			break;
		}

		iterationPass = iterationPass.filter(result => {
			return result !== undefined;
		});

		console.log(iterationPass);

		if (iterationPass.some(result => {
			return result.includes('<title>');
		})) {
			console.log('title hit');
			title = iterationPass[iterationPass.length - 1];
		}

		else if (iterationPass.some(result => {
			return result.includes('Conference Website')
		})) {
			console.log('conf hit');
			conference = iterationPass[iterationPass.length - 1];
		}

		else if (iterationPass.some(result => {
			return result.includes('award')
		})) {
			console.log('award hit');
			award = iterationPass[iterationPass.length - 1];
		}

		else if (iterationPass.some(result => {
			return result.includes('Author')
		})) {
			console.log('author hit');
			authors.push(iterationPass[iterationPass.length - 1]);
		}
	}

	let result = [
		award,
		authors,
		conference,
		title,
	];
	console.log(result);
	return result;
}

let cleaned = [];

let rawData = [];
let promises = urls.map(getPromisedData);
let results =
	Promise.all(promises)
		.then(data => {
			rawData.push(data);
			return data.map(applyRegex)
		})
		.then(regexes => {
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
				console.log(row);
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

		if (i !== 1){
			authors.push(" " + author);
		} else {

			authors.push(author);
		}
	}

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



