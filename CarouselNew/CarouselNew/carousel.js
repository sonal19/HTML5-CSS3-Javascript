// JavaScript source code
(function () {

    //an image width in pixels 
    var imageWidth, sliderWidth, numFrames = 2, numImages = 6;


    //DOM and all content is loaded 
    $(window).ready(function () {

        function init() {
            $('#resetbtn').attr("disabled", true);
            buttonClickEvent();
            resetButtonClickEvent();
            var currentImage = 0;
            //setup slideshow frame width
            $('#slider ul').width(numImages * imageWidth);

            //////////Next Event function Call//////////////////////
            //attach click event to slideshow buttons
            $('#next').click(function () {

                //increase image counter
                currentImage++;

                if (currentImage + numFrames === numImages) {
                    // currentImage = 0;
                    $('#next').css("display", "none");
                }
                if (currentImage > 0) {
                    $('#prev').css("display", "block");
                }
                //calcualte and set position
                setFramePosition(currentImage);

            });
            ///////////////////////////////////////////////////////
            //////////////Prev event function Call////////////////
            $('#prev').click(function () {


                //decrease image counter
                currentImage--;

                if (currentImage === 0) {
                    //currentImage = allImages - 1;
                    $('#prev').css("display", "none");
                }
                if (currentImage < numImages) {
                    $('#next').css("display", "block");
                }
                //calcualte and set position
                setFramePosition(currentImage);

            });
            //////////////////////////////////////////////////////////

        }

        function buttonClickEvent() {
            $('#cnbtn').click(function () {
                //debugger;
                numImages = parseInt($('#imageNumber').val(), 10);
                numFrames = parseInt($('#carouselnum').val(), 10);

                if (isNaN(numImages)) {
                    alert("Please Enter proper number of Images");
                    return;
                }
                if (isNaN(numFrames)) {
                    alert("Please Enter proper Frame number");
                    return;
                }

                if (numFrames < 2 || numFrames > 10) {
                    alert("Please Enter proper value of Frame number between 2 and 10");
                    return;

                }

                sliderWidth = parseInt($('#slider').css("width"), 10);
                imageWidth = (sliderWidth) / numFrames;


                if (numImages === numFrames) {
                    $('#next').css("display", "none");
                }
                if (numImages < numFrames) {
                    alert("Number of images must be equal or greater than number of frames");
                    return;
                }

                $('img').css("width", imageWidth - 20)
                $('#divCarousel').css("display", "block");
                $('#cnbtn').attr("disabled", true);
                $('#resetbtn').attr("disabled", false);
                $('#imageNumber').attr("disabled", true);
                $('#carouselnum').attr("disabled", true);

            });
        }

        function resetButtonClickEvent() {
            $('#resetbtn').click(function () {
                location.reload();

            });
        }



        // Call init function
        init();
    });

    //calculate the slideshow frame position and animate it to the new position
    function setFramePosition(pos) {

        //calculate position
        var px = imageWidth * pos * -1;
        //set ul left position
        $('#slider ul').animate({
            left: px
        }, 300);
    }


})();
