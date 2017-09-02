// JavaScript source code
(function () {

    var imageWidth, sliderWidth, numFrames = 2, numImages = 6;

    //  $(window).ready(function () {
    $(document).ready(function () {
        var $resetbtn, $next, $prev, $cnbtn, $divCarousel, $imagenumber, $carouselnum, $img;

        //Caching the variables
        $resetbtn = $('#resetbtn');
        $next = $('#next');
        $prev = $('#prev');
        $cnbtn = $('#cnbtn');
        $divCarousel = $('#divCarousel');
        $imageNumber = $('#imageNumber');
        $carouselnum = $('#carouselnum');
        $img = $('img');
        $slider = $('#slider');

        function init() {
            $resetbtn.attr("disabled", true);
            buttonClickEvent();
            resetButtonClickEvent();
            var currentImage = 0;
            $('#slider ul').width(numImages * imageWidth);

            //////////Next Event function Call//////////////////////
            $next.click(function () {

                //increase image counter
                currentImage++;

                if (currentImage + numFrames === numImages) {
                    $next.css("display", "none");
                }
                if (currentImage > 0) {
                    $prev.css("display", "block");
                }
                setFramePosition(currentImage);

            });
            ///////////////////////////////////////////////////////
            //////////////Prev event function Call/////////////////
            $prev.click(function () {


                currentImage--;

                if (currentImage === 0) {
                    $prev.css("display", "none");
                }
                if (currentImage < numImages) {
                    $next.css("display", "block");
                }
                setFramePosition(currentImage);

            });
            //////////////////////////////////////////////////////////
        }

        function buttonClickEvent() {
            $cnbtn.click(function () {
                //debugger;
                numImages = parseInt($imageNumber.val(), 10);
                numFrames = parseInt($carouselnum.val(), 10);

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


                sliderWidth = parseInt($slider.css("width"), 10);
                imageWidth = (sliderWidth) / numFrames;


                if (numImages === numFrames) {
                    $next.css("display", "none");
                }
                if (numImages < numFrames) {
                    alert("Number of images must be equal or greater than number of frames");
                    return;
                }

                $img.css("width", imageWidth - 20);
                $divCarousel.css("display", "block");
                $cnbtn.attr("disabled", true);
                $resetbtn.attr("disabled", false);
                $imageNumber.attr("disabled", true);
                $carouselnum.attr("disabled", true);

            });
        }

        function resetButtonClickEvent() {
            $resetbtn.click(function () {
                location.reload();

            });
        }

        // Call init function
        init();
    });

    function setFramePosition(pos) {
        var px = imageWidth * pos * -1;
        $('#slider ul').animate({
            left: px
        }, 300);
    }

})();
