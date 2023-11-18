document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const gameSections = document.querySelectorAll(".console-section");
    let currentIndex = -1; // Start with an invalid index

    const volumeRange = document.getElementById("volumeRange");

    volumeRange.addEventListener("input", function() {
        bgm.volume = volumeRange.value;
    });

    window.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY + window.innerHeight;

        gameSections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Update currentIndex only if it's different from the current index
                if (currentIndex !== index) {
                    currentIndex = index;
                    console.log(`You are in game ${formatNumber(index + 1)}`);

                    // Play the corresponding BGM
                    const bgm = document.getElementById("bgm");
                    bgm.src = `bgm/game${formatNumber(index + 1)}.mp3`;
                    bgm.load();
                    bgm.play();
                }
            }
        });
    });

    function formatNumber(number) {
        return number.toString().padStart(2, '0');
    }
});
