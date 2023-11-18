document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const gameSections = document.querySelectorAll(".console-section");
    let currentIndex = -1; // Start with an invalid index

    window.addEventListener("scroll", function() {
        const currentPosition = window.scrollY;

        gameSections.forEach(function(section, index) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            const opacity = calculateOpacity(currentPosition, sectionTop, sectionBottom);
            section.style.opacity = opacity;

            if (opacity === 1) {
                section.style.transform = "translateY(0)";
            }
            if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
                // Show corresponding console content
                console.log(`Displaying content for Console ${index + 1}`);

                // Play corresponding BGM
                bgm.src = `bgm/game${formatNumber(index + 1)}.mp3`;
                bgm.play();
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

    function formatNumber(number) {
        return number.toString().padStart(2, '0');
    }
});
