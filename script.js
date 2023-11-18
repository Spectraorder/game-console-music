document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const gameSections = document.querySelectorAll(".console-section");
    let currentIndex = -1; // Start with an invalid index

    volumeRange.addEventListener("input", function() {
        bgm.volume = volumeRange.value;
    });

    window.addEventListener("scroll", function() {
        const currentPosition = window.scrollY;

        let foundIndex = -1;

        gameSections.forEach(function(section, index) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            const opacity = calculateOpacity(currentPosition, sectionTop, sectionBottom);
            section.style.opacity = opacity;

            if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
                foundIndex = index;
            }
        });

        if (foundIndex !== -1 && foundIndex !== currentIndex) {
            // If a section is fully visible and it's different from the current index
            currentIndex = foundIndex;

            // Pause the currently playing BGM
            bgm.pause();
            bgm.classList.add("hide-controls");

            // Play the new BGM
            bgm.src = `bgm/game${formatNumber(currentIndex + 1)}.mp3`;
            bgm.play();
            bgm.classList.remove("hide-controls");
        } else if (foundIndex === -1 && currentIndex !== -1) {
            // If no section is fully visible, pause the BGM
            currentIndex = -1;
            bgm.pause();
            bgm.classList.add("hide-controls");
        }
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

    function formatNumber(number) {
        return number.toString().padStart(2, '0');
    }
});
