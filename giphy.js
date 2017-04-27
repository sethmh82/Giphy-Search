var toDoCount = 0;
var Giphys = ["Cat", "Funny", "Silly", "Dog", "Rabbit", "Random", "Super"];

function displaygiphyInfo() {

  var theGiphy = $(this).attr("data-name");

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + theGiphy + "&api_key=dc6zaTOxFJmzC";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    var imageUrl = response.data[0].images.downsized.url;

    $("<img src='" + imageUrl + "' class='imgiphy' id='item-" + toDoCount + "'/>").attr("giphyAtt", toDoCount).appendTo("#giphy-view");
      toDoCount++;

  });
}

//// HERE WE ARE SELECTING THE IMAGE WITH THE CLASS IMGIPHY AND THE ID ITEM-(NUMBER)
$(document.body).on("click", ".imgiphy", function() {
var giphyNumber = $(this).attr("giphyAtt");
$("#item-" + giphyNumber).remove();
});


// Function for displaying giphy data
function renderButtons() {

  // Deleting the Giphys prior to adding new Giphys
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of Giphys
  for (var i = 0; i < Giphys.length; i++) {

    // Then dynamicaly generating buttons for each giphy in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of giphy to our button
    a.addClass("giphy");
    // Adding a data-attribute
    a.attr("data-name", Giphys[i]);
    // Providing the initial button text
    a.text(Giphys[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a giphy button is clicked
$("#add-giphy").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var giphy = $("#giphy-input").val().trim();

  // Adding giphy from the textbox to our array
  Giphys.push(giphy);

  // Calling renderButtons which handles the processing of our giphy array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "giphy"
$(document).on("click", ".giphy", displaygiphyInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();