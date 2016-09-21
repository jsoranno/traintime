$(document).ready(function() {
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
	
	// Convert initial time
    // makes sure it comes before current time
    newTime = moment(moment(newTime,"hh:mm A").subtract(1, "years"),"hh:mm").format("hh:mm A");

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

// Calculate minutes away
    var timeDifference = moment().diff(moment(start,"hh:mm A"),'m');
    var timeRemaining = timeDifference % freq;
    var timeMinsAway = freq - timeRemaining;

    // Calculate next arrival
    var timeNext = moment().add(timeMinsAway,'m');

    // Set variables
    var next = moment(timeNext).format("hh:mm A");
    var away = timeMinsAway;
  

	$("#trainresults").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + next + "</td><td>" + away + "</td></tr>");
}, function(errorObject){
	console.log("oh bumpers!"+ errorObject.code)

}); //close child added

function displayTime() {

    var currentDay = moment().format("dddd, MMMM D YYYY,");

    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    setInterval(displayTime, 1000);
               
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var meridiem = "AM";

    if (hours > 12) {
        hours = hours - 12;
        meridiem = "PM";
    }

    if (hours === 0) {
        hours = 12;    
    }

    $('#currentTime').text(
      currentDay + " " + 
      hours + ":" + minutes + ":" + seconds + " " + meridiem);
  }

  displayTime();

});//close doc ready

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

