// //saves full source code of page to variable
// var url1 = $(".url1").val();

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



var arr = [
  "<title>Causal embeddings for recommendation</title>",
  "\"Author Profile Page\" target=\"_self\">Stephen Bonner</a>",
  "\"Author Profile Page\" target=\"_self\">Flavian Vasile</a>",
  "\"Conference Website\" target=\"_blank\"><img style=\"margin-top:5px; border-width:1px; border-color:black\" src=\"https://portalparts.acm.org/3250000/3240323/thumb/cover_thumb.jpg\" height=\"102\" width=\"79\" alt=\"Cover Image\" /></a>",
  "\"Conference Website\" target=\"_self\" class=\"link-text\">RecSys '18</a>",
  "award.jpg\" alt=\"Best Paper\" "
]


//gets title from arr[0]
// arr[0].replace("<title>", "").replace("</title>", "");

//gets conference out of full string 
// arr[arr.length - 2].replace("\"Author Profile Page\" target=\"_self\">", "").replace("</a>", "")

//gets award name out of full string
// arr[arr.length -1].replace("award.jpg\" alt=\"", "").replace("\" ", "");

//get individual author name
// arr[1].replace("\"Author Profile Page\" target=\"_self\">", "").replace("</a>", "");

function cleanStrings(arr){
	var title = arr[0].replace("<title>", "").replace("</title>", "");
	var award = arr[arr.length -1].replace("award.jpg\" alt=\"", "").replace("\" ", "");
	var conference = arr[arr.length - 2].replace("\"Author Profile Page\" target=\"_self\">", "").replace("</a>", "");
	var authorsNumber = arr.length - 4;
	var authors = [];

	for (i = 1; i = authorsNumber - 1; i++){
		arr[i].replace("\"Author Profile Page\" target=\"_self\">", "").replace("</a>", "");
		authors.push(arr[i]);
	}

	consolelog(title);

}

cleanStrings(arr);




