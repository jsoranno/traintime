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
// var tableArray {
// 	name: "",
// 	destination: "",
// 	frequency: 0,
// 	next: 0,
// 	minutes: 0,
// };
var name = "";
var destination = "";
var frequency = 0;
var next = 0;
var minutes = 0;

// Add a new train click function
$(".new").on("click", function(){
	var newTrain = $("#newName").val().trim();
	var newDest = $("#newDestination").val().trim();
	var new
});