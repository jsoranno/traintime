  // Initialize Firebase
var config = {
	apiKey: "AIzaSyCxOaTKird9qLx2DzTh0-at1YwFUlUsimc",
	authDomain: "chug-traintime.firebaseapp.com",
	databaseURL: "https://chug-traintime.firebaseio.com",
	storageBucket: "",
	messagingSenderId: "105595551581"
}; // end config
	firebase.initializeApp(config);

//initial variables
var dataRef = firebase.database();
var name = "";
var destination = "";
var frequency = 0;
var next = 0;
var minutes = 0;

// Add a new train click function
$('.btn').on('click', function(){
	console.log("Submit Clicked")
	var newName = $("#newName").val().trim();
	var newDest = $("#newDestination").val().trim();
	var newTime = $("#newTime").val().trim();
	var newFreq = $("#newFreq").val().trim();
	//tests to see if input captured
	// console.log(newName);
	// console.log(newDest);
	// console.log(newTime);
	// console.log(newFreq);

	dataRef.ref().push({
		name:  newName,
		dest: newDest,
		start: newTime,
		freq: newFreq,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
})
	//test to see if added to database
	// console.log(newTrain.name);
	// console.log(newTrain.dest);
	// console.log(newTrain.start);
	// console.log(newTrain.freq);

	$("#newName").val("");
	$("#newDestination").val("");
	$("#newTime").val("");
	$("#newFreq").val("");

	return false;
}); //close on click

dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {
	//test output
	//console.log("childsnap" + childSnapshot.val());

	var name = childSnapshot.val().name;
	var dest = childSnapshot.val().dest;
	var start = childSnapshot.val().start;
	var freq = childSnapshot.val().freq;

	//calculate next arrival and minutes away here
	//get current time and minus start time
	var now = moment().toDate().getTime();
	var newNow = moment(now).format("HH:mm EST");
	//console.log(newNow); //this works. shows current time in HH:mm 24hr clock
	// console.log(now); //this works. shows current time in unix 
	// var diff = moment(now, "HH:mm").subtract(start, "HH:mm");
	// //console.log(diff);
	// var minAway = diff/freq;
	// var nextTrain = minAway + newNow;
	// //console.log(nextTrain);
	// var newNextTrain = "next train";//moment().format(nextTrain, "mm");
	// console.log(minAway);
	// TRY AGAIN
	// var unixStart = moment.unix(start);
	// console.log(unixStart);
	// var startPretty = moment.unix(start).format("HH:mm EST");
	// trainDiff = moment(now).diff(start, "HH:mm EST");
	// // console.log(trainDiff);
	// var minAway = trainDiff / freq;
	// console.log(minAway);


	$("#trainresults").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + "newNextTrain" + "</td><td>" + "minAway" + "</td></tr>");
}, function(errorObject){
	console.log("oh bumpers!"+ errorObject.code)

});


// dataRef.ref().orderByChild("dateAdded").on("child_added", function(snapshot){
// 	// Change the HTML to reflect
// 	$("#trainresults").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().dest + "</td><td>" + snapshot.val().freq + "</td><td>" + "next arrival" + "</td><td>" + "minutes away" + "</td></tr>");

// })
// var jumboHeight = $('.jumbotron').outerHeight();
// function parallax(){
//     var scrolled = $(window).scrollTop();
//     $('.bg').css('height', (jumboHeight-scrolled) + 'px');
// }

// $(window).scroll(function(e){
//     parallax();
// });

