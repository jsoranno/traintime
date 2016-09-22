// Initialize Firebase
var config = {
	apiKey: "AIzaSyCxOaTKird9qLx2DzTh0-at1YwFUlUsimc",
	authDomain: "chug-traintime.firebaseapp.com",
	databaseURL: "https://chug-traintime.firebaseio.com",
	storageBucket: "chug-traintime.appspot.com",
	messagingSenderId: "105595551581"
};
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
	
	// Convert initial time
    // makes sure it comes before current time
    newTime = moment(moment(newTime,"hh:mm A").subtract(1, "years"),"hh:mm").format("hh:mm A");

	dataRef.ref().push({
		name:  newName,
		dest: newDest,
		start: newTime,
		freq: newFreq,
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
	//console.log("childsnap" + childSnapshot.val().name); //console log shows names from Firebase

	var name = childSnapshot.val().name;
	var dest = childSnapshot.val().dest;
	var start = childSnapshot.val().start;
	var freq = childSnapshot.val().freq;
	//console.log(name); //console log shows updated names

	// Calculate minutes away
    var timeDifference = moment().diff(moment(start,"hh:mm A"),'m');
    var timeRemaining = timeDifference % freq;
    var timeMinsAway = freq - timeRemaining;
    //console.log("Time diff in minutes:" + timeDifference); 
    //console.log("Time remaining before the next train:" + timeRemaining);

    // Calculate next arrival
    var timeNext = moment().add(timeMinsAway,'m');
    //console.log("Minutes until the next train " + timeNext);

    // Set variables
    var next = moment(timeNext).format("hh:mm A");
    console.log("Formatted minutes: " + next);
    var away = timeMinsAway;
    console.log("Minutes away: " + away);
  

	$("#trainresults").append(
		"<tr><td>" + name + 
		"</td><td>" + dest + 
		"</td><td>" + freq + 
		"</td><td>" + next + 
		"</td><td>" + away + 
		"</td></tr>");

}, function(errorObject){
	console.log("oh bumpers!"+ errorObject.code)

}); //close child added