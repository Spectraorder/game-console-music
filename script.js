document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const gameSections = document.querySelectorAll(".console-section");

    window.addEventListener("scroll", function() {
        const currentPosition = window.scrollY;

        gameSections.forEach(function(section, index) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            // Calculate the opacity based on the scroll position
            const opacity = calculateOpacity(currentPosition, sectionTop, sectionBottom);

            // Update the opacity of the section
            section.style.opacity = opacity;

            if (opacity === 1) {
                // If the section is fully visible, update the transform
                section.style.transform = "translateY(0)";

                // Play BGM only if it's not already playing
                if (bgm.paused) {
                    bgm.src = `bgm/console${index + 1}.mp3`;
                    bgm.play();
                }
            } else {
                // If the section is not fully visible, pause the BGM
                bgm.pause();
            }
        });
    });

    // Function to calculate the opacity based on the scroll position
    function calculateOpacity(scrollPosition, sectionTop, sectionBottom) {
        const sectionHeight = sectionBottom - sectionTop;
        const scrollPercentage = (scrollPosition - sectionTop) / sectionHeight;

        // Adjust the fade-out range as needed
        const fadeOutStart = 0.7;
        const fadeOutEnd = 0.9;

        if (scrollPercentage < fadeOutStart) {
            return 1; // Section is fully visible
        } else if (scrollPercentage > fadeOutEnd) {
            return 0; // Section is fully invisible
        } else {
            // Gradually fade out the section
            return 1 - ((scrollPercentage - fadeOutStart) / (fadeOutEnd - fadeOutStart));
        }
    }
});
