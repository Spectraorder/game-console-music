document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const gameSections = document.querySelectorAll(".console-section");

    window.addEventListener("scroll", function() {
        const currentPosition = window.scrollY;

        gameSections.forEach(function(section, index) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            const opacity = calculateOpacity(currentPosition, sectionTop, sectionBottom);
            section.style.opacity = opacity;

            if (opacity === 1) {
                section.style.transform = "translateY(0)";
                bgm.src = `bgm/console${index + 1}.mp3`;
                bgm.play();

                // Show audio controls when section is fully visible
                bgm.classList.remove("hide-controls");
            } else {
                bgm.pause();

                // Hide audio controls when section is not fully visible
                bgm.classList.add("hide-controls");
            }
        });
    });

    function calculateOpacity(scrollPosition, sectionTop, sectionBottom) {
        const sectionHeight = sectionBottom - sectionTop;
        const scrollPercentage = (scrollPosition - sectionTop) / sectionHeight;

        const fadeOutStart = 0.7;
        const fadeOutEnd = 0.9;

        if (scrollPercentage < fadeOutStart) {
            return 1;
        } else if (scrollPercentage > fadeOutEnd) {
            return 0;
        } else {
            return 1 - ((scrollPercentage - fadeOutStart) / (fadeOutEnd - fadeOutStart));
        }
    }
});
