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
var database = firebase.database();
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
	console.log(newName);
	console.log(newDest);
	console.log(newTime);
	console.log(newFreq);

	var newTrain = {
	name:  newName,
	dest: newDest,
	start: newTime,
	freq: newFreq
	}//close newTrain

	database.ref().push(newTrain);

	$("#newName").val("");
	$("#newDestination").val("");
	$("#newTime").val("");
	$("#newFreq").val("");

	return false;
});
//add error message to say, "oh bumpers!"



