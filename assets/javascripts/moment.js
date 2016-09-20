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
	console.log(newName);
	console.log(newDest);
	console.log(newTime);
	console.log(newFreq);

	// var newTrain = {
	// name:  newName,
	// dest: newDest,
	// start: newTime,
	// freq: newFreq,
	// dateAdded: firebase.database.ServerValue.TIMESTAMP
	// }//close newTrain

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
	console.log(childSnapshot.val());

	var name = childSnapshot.val().name;
	var dest = childSnapshot.val().dest;
	var start = childSnapshot.val().start;
	var freq = childSnapshot.val().freq;

	//calculate next arrival and minutes away here

	$(".tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + "next arrival" + "</td><td>" + "minutes away" + "</td></tr>");
}, function(errorObject){
	console.log("oh bumpers!"+ errorObject.code)

});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
	// Change the HTML to reflect
	$(".tbody").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().dest + "</td><td>" + snapshot.val().freq + "</td><td>" + "next arrival" + "</td><td>" + "minutes away" + "</td></tr>");

})
