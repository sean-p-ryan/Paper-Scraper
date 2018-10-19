//saves full source code of page to variable
var url1 = $(".url1").val();

//loads JSON-encoded data from the server using a GET HTTP request. Saves as variable.
var markup1;

function test(variableToStore, callback) {
   $.getJSON(
       'https://allorigins.me/get?url=' + encodeURIComponent('https://dl.acm.org/citation.cfm?id=3240360') + '&callback=?',
       function(data){
           console.log('I\'m in a callback');
           variableToStore = data;
           console.log('Here\'s the data:', variableToStore);
           callback(variableToStore);
       }
   );
}

function myCallback(workingVariable) {
   console.log('I\'m in another callback');
   var arr = workingVariable.contents.match(/(<title>(.*)<\/title>)|"Conference Website"(.*)>(.*)<\/a>|"Author Profile Page"(.*)>(.*)<\/a>|award.*alt="(.*)"\s/gm);

   console.log('Here\'s the arr');
   console.log(arr);
   console.log('FIN');
}

test(markup1, myCallback);


