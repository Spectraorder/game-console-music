document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const gameSections = document.querySelectorAll(".console-section");
    let currentIndex = -1; // Start with an invalid index

    const volumeRange = document.getElementById("volumeRange");

    volumeRange.addEventListener("input", function() {
        bgm.volume = volumeRange.value;
    });

    window.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        gameSections.forEach((section, index) => {
            fadeInEffect(section);
            slideInEffect(section);
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

    gameSections.forEach((section, index) => {
        const img = section.querySelector("img");

        img.addEventListener("mouseover", function() {
            highlightImage(img);
        });

        img.addEventListener("mouseout", function() {
            removeHighlight(img);
        });
    });

    function formatNumber(number) {
        return number.toString().padStart(2, '0');
    }

    function fadeInEffect(section) {
        const img = section.querySelector("img");

        window.addEventListener("scroll", function() {
            const opacity = (window.scrollY - section.offsetTop + window.innerHeight) / (window.innerHeight * 0.5);
            img.style.opacity = opacity > 1 ? 1 : opacity.toFixed(2);
        });
    }

    function slideInEffect(section) {
        const img = section.querySelector("img");

        const slideInAmount = (window.scrollY - section.offsetTop + window.innerHeight) / window.innerHeight;
        const translateX = Math.min(slideInAmount * 60, 40); // Adjust the factor for the desired slide-in distance

        img.style.transform = `translateX(${translateX}%)`;

        const borderWidth = Math.min(slideInAmount * 10, 3); // Adjust the factor for the desired border slide-in distance
        img.style.border = `${borderWidth}px solid #ddd`;
    }

    function highlightImage(img) {
        img.style.border = "2px solid #ff0000"; // Change border color to highlight
    }

    function removeHighlight(img) {
        img.style.border = ""; // Remove border to remove highlight
    }
});
