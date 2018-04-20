$(document).ready(function () {
    var buttons = ['spongebob', 'barney', 'simpsons'];

    console.log(buttons);

    //Initial array of strings to search



    renderBtns();
    displayGiphys();

    $("#add-giphy").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var addingGif = $("#giphy-search").val().trim();

        // Adding the gif from the textbox to our array
        buttons.push(addingGif);
        console.log(buttons);
        console.log(addingGif);

        
        renderBtns();
        //Running function that creates the button as the user submits their gif search
        displayGiphys();
        //running the display function after the button has been created so that the query is called for the search item added to the array.


    });

    function renderBtns() {
        $('#buttons-here').empty();
        for (var i = 0; i < buttons.length; i++) {

            var a = $('<button>');
            a.addClass('cartoon-btn');
            a.attr('data-name', buttons[i]);
            a.text(buttons[i]);
            $('#buttons-here').append(a);
        }

        //Creating a function that creates the buttons from the information entered into the array "buttons.


    }

   

    //Calling the function to create buttons.


    function displayGiphys() {


        $('button').on('click', function () {
            clearGiphys();
            var buttons = $(this).attr('data-name');
            //Creating a function that displays the giphys, this is a function that on click of the button will run a function to clear the DIV holding the giphs to make room for the new ones being called.





            var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=1oLgnFR0ZIDUMCW2FUUjzuV4DazPFejN&q=' + buttons + '&limit=10';

            //Setting up query URL with users input from the buttons created.

            $.ajax({
                url: queryURL,
                method: 'GET'
            })

                .then(function (response) {
                    console.log(response);
                    console.log(queryURL);

                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {
                        //Looping through the results from the Query, creating a P tag for all of the results with text that tells the user the rating of the giph, then creates an image tag for the results as well.






                        var ratingPara = $("<p id='rating'>").text('Rating: ' + results[i].rating);




                        var cartoonImage = $('<img>');

                        cartoonImage.attr({ 'src': results[i].images.fixed_height_still.url });

                        cartoonImage.attr({ 'data-animate': results[i].images.fixed_height.url });


                        cartoonImage.attr({ 'data-still': results[i].images.fixed_height_still.url });

                        cartoonImage.attr({ 'data-state': "still" });



                        cartoonImage.addClass('gif');
                        //Adding attributes to call later to the images that are called, animate, and still, and gif to target for an onclick later in the function.





                        var smallerDiv = $("<div id='onegif'>").append(cartoonImage, ratingPara);
                        //Creating a smaller DIV that holds the image and the p tag created together for visual purposes.

                        $('#giphyDiv').append(smallerDiv);
                        //Appending the DIVS created into the HTML

                        $(".gif").on('click', function () {
                            var state = $(this).attr("data-state");
                            //Creating a variable to use in if else statement and targeting the class "gif" for the click function.

                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");

                            }//need to trouble shoot why every other giphy animates and stops upon click.
                        });

                        








                    }
                });


        });
    }





   








    function clearGiphys() {
        $('#giphyDiv').empty();
    }











});
