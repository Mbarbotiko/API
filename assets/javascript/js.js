$(document).ready(function () {
    var buttons = ['spongebob', 'barney', 'simpsons'];


    function renderBtns() {
        $('#buttons-here').empty();
        for (var i = 0; i < buttons.length; i++) {

            var a = $('<button>');
            a.addClass('cartoon-btn');
            a.attr('data-name', buttons[i]);
            a.text(buttons[i]);
            $('#buttons-here').append(a);
        }


    }

    renderBtns();


    function displayGiphys() {


        $('button').on('click', function () {
            clearGiphys();
            var buttons = $(this).attr('data-name');
            




            var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=1oLgnFR0ZIDUMCW2FUUjzuV4DazPFejN&q=' + buttons + '&limit=10';

            $.ajax({
                url: queryURL,
                method: 'GET'
            })

                .then(function (response) {
                    console.log(response);
                    console.log(queryURL);

                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {






                        var ratingPara = $("<p id='rating'>").text('Rating: ' + results[i].rating);

                        


                        var cartoonImage = $('<img>');
                        cartoonImage.attr('src', results[i].images.fixed_height_still.url);

                    
                        cartoonImage.addClass('gif');




                        var smallerDiv = $("<div id='onegif'>").append(cartoonImage, ratingPara);

                        $('#giphyDiv').append(smallerDiv);

                        $(".gif").on('click', function () {
                            $('giphyDiv').append(cartoonImage2);
                        });
                    
                        var cartoonImage2 =$('<img>');
                        cartoonImage2.attr('src', results[i].images.fixed_height.url);

                        

                       



                    }
                });


        });
    }





    displayGiphys();
    





    function clearGiphys() {
        $('#giphyDiv').empty();
    }


  








});

