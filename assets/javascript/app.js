<!-- jQuery -->

// <script type="text/javascript">
// Initialize Firebase
var config = {
    apiKey: "AIzaSyALdbA5W8LvEAg6hU_eiNJObpQjA9s59Zg",
    authDomain: "train-schedule-bdf41.firebaseapp.com",
    databaseURL: "https://train-schedule-bdf41.firebaseio.com",
    projectId: "train-schedule-bdf41",
    storageBucket: "train-schedule-bdf41.appspot.com",
    messagingSenderId: "453459308524"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();


// Capture submission info

$("#submit").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

    // Grabs user input
    var name = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    // Log my inputs to see if the app is working
    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);


    //push to firebase
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    });


    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

})


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;


    //Military train time

   console.log(moment(trainTime, "hh:mm a").format("HH:mm"));

  var militaryTime = moment(trainTime, "hh:mm a").format("HH:mm") || moment(trainTime, "hh:mm").format("HH:mm") || moment(trainTime, "hh:mm").format("HH:mm") || moment(trainTime, "hhmm").format("HH:mm");

  //next arrival calculation
  function newArrival(){
    var trainMinutes = Math.floor(time / 60);
    console.log(trainMinutes);
  }



    // Add each train's data into the table

    $(".table").append("<tr class='table-row'><td id='comment'> " + childSnapshot.val().name +
        " </td><td id='comment'> " + childSnapshot.val().destination +
        " </td><td id='comment'> " + militaryTime +
        " </td><td id='comment'> " + childSnapshot.val().frequency + " </td></tr>");
});

// database.ref().on('child_added', function(childSnapshot) {
//   console.log(childSnapshot.val())
//   console.log(childSnapshot.val().name);
//   var tableRow = $("<tr>")
//   var tableDataName = $("<td>").text(childSnapshot.val().name);
//   //var tableDataDestination = ("<td>").text(childSnapshot.val().destination);
//   var tableDataFirstTrainTime = $("<td>").text(childSnapshot.val().time);
//   console.log(time);
//   // var tableDataFrequency = childSnapshot.val().frequency;

//   tableRow.append(tableDataName)
// $("#table-body").append(tableRow);
//   })

// database.ref().on("child_added", function(childSnapshot) {

//     // Log everything that's coming out of snapshot
//     console.log(childSnapshot.val().name);

//     console.log(childSnapshot.val().destination);
//     // console.log(childSnapshot.val().joinDate);

//})
