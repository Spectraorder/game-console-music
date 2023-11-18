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
                bgm.src = `bgm/game${formatNumber(index + 1)}.mp3`;
                bgm.play();
                bgm.classList.remove("hide-controls");
            } else {
                bgm.pause();
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

    // Function to format numbers with leading zeros (e.g., 1 becomes 01)
    function formatNumber(number) {
        return number.toString().padStart(2, '0');
    }
});
