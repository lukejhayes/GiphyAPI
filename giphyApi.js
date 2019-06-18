$(document).ready(function() {// create new array where the buttons will go and appends the new ones.
var buttons = ["The Hangover", "Star Wars", "Step Brothers", "Spiderman", "The Godfather", "Forrest Gump", "Anchorman", "Dumb & Dumber", "Superbad", "Ghost Busters"];
// function that renders the new buttons.
function renderButtons(){
    // clears the div before rendering.
    $("#new-button").empty();

    // loops through the new array and generates a button for each index.
    for (var i = 0; i < buttons.length; i++){
        // makes new button tag
        var newButton = $("<button>");
        // assigns value of button index as newButton's text
        newButton.text(buttons[i]);
        // adds class for all currently generated buttons
        newButton.addClass("gen-button");
        // adds a custom attribute for newly generated buttons,
        // then sets the value of button's index as the custom attribute's value.
        newButton.attr("data-button", buttons[i]);
        // appends newly generated buttons to its div
        $("#new-button").append(newButton);
        // console.log(newButton);
    }
}

// creates an 'onClick' event that adds buttons to the array.
$("#add-movie").on("click", function(e){
    // prevents the current from refreshing
    e.preventDefault();

    // creates variable that takes user input value
    var userButton = $("#movie-input").val();

    // pushes the userButton to array
    buttons.push(userButton);
    renderButtons();
})

// creates on click event for new button
$(document).on("click", ".gen-button", function(event){
    // adds custom made attribute to the clicked button and assign it to a variable.
    var buttonName = $(this).attr("data-button");

    // sets the API key and generates the jqueryURL
    var apiKey = "c59OeoUTfoBMqI9eXGv06pZ18R1Qkf4s";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + buttonName + "'&api_key=" + apiKey + "&limit=10&rating=g";
    
    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(res){
        $("#image-space").empty();
        // console.log(res)
        
        var gifArray = res.data;
        // randomGif = Math.floor(Math.random() * (4 - 1 + 1)) + 1;   

        for(var i = 0; i < gifArray.length; i ++){
           
            var animatedUrl = res.data[i].images.fixed_height_small.url;
            
            // gif image location
            var imageUrl = res.data[i].images.fixed_height_small_still.url;

            // creates a new div for each gif
            var gifDiv = $("<div>");
            gifDiv.addClass("col-md-3 col-sm-6");
            // creates a new paragraph tag for 'rating'
            var rated = $("<p>").text("Rating: " + gifArray[i].rating);
            // creates image tag inside of newGif
            var newGif = $("<img>");

            // add attributes first
            newGif.attr("src", imageUrl);
            newGif.addClass("gif");
            newGif.attr("data-still", imageUrl);
            newGif.attr("data-animate", animatedUrl);
            newGif.attr("data-state", "still");

            // then append it to its div
            gifDiv.append(rated);
            gifDiv.append(newGif);

            // appends newdiv to html space
            $("#image-space").prepend(gifDiv);
        } 
    })  
})

$(document).on("click",".gif", function(){
    // console.log(this);
    var state = $(this).attr("data-state");
    var animated = $(this).attr("data-animate");
    var still = $(this).attr("data-still");
    // console.log(state);
    // console.log(this);
    if (state === "still"){
        $(this).attr("src", animated);
        $(this).attr("data-state", "animate");
    }
    else{  
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }
})

// calls the function too display current buttons.
renderButtons();

});