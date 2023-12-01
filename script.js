document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const gameSections = document.querySelectorAll(".console-section");

    const volumeRange = document.getElementById("volumeRange");

    const marioGifContainer = document.getElementById("marioGifContainer");
    const marioPipe = document.getElementById("marioPipe");

    const firstGameImage = document.getElementById("Game01Image");
    const LastGameImage = document.getElementById("Game09Image");

    // const marioPipe = document.createElement("img");
    // marioPipe.src = "imgs/mario_pipe.png";
    // marioPipe.id = "marioPipe";
    // document.body.appendChild(marioPipe);

    let currentIndex = -1;
    let animationInProgress = false;

    // volumn bar control
    volumeRange.addEventListener("input", function() {
        bgm.volume = volumeRange.value;
    });

    // music player and scroll effects
    window.addEventListener("scroll", function() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        gameSections.forEach((section, index) => {
            fadeInEffect(section);
            slideInEffect(section, index);
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

    // image highlighter
    gameSections.forEach((section, index) => {
        const img = section.querySelector("img");

        img.addEventListener("mouseover", function() {
            highlightImage(img);
        });

        img.addEventListener("mouseout", function() {
            removeHighlight(img);
        });
    });

    // mario gif run animation
    firstGameImage.addEventListener("click", function() {
        if (!animationInProgress) {
            showMarioGif();
        }
    });

    LastGameImage.addEventListener("click", function() {
        if (!animationInProgress) {
            showMarioPipe();
        }
    });

    function formatNumber(number) {
        return number.toString().padStart(2, '0');
    }

    function fadeInEffect(section) {
        const h3 = section.querySelector("h3");
        const h4 = section.querySelector("h4");
        const img = section.querySelector("img");

        window.addEventListener("scroll", function() {
            const opacity = (window.scrollY - section.offsetTop + window.innerHeight) / window.innerHeight;
            img.style.opacity = opacity > 1 ? 1 : opacity.toFixed(2);
            h3.style.opacity = opacity > 1 ? 1 : opacity.toFixed(2);
            h4.style.opacity = opacity > 1 ? 1 : opacity.toFixed(2);
        });
    }

    function slideInEffect(section, index) {
        const img = section.querySelector("img");
        const h4 = section.querySelector("h4");

        const slideInAmount = (window.scrollY - section.offsetTop + window.innerHeight) / window.innerHeight;
        let translateX;

        if (index % 2 === 0) {
            // For even-indexed sections (2, 4, 6, ...)
            translateX = Math.min(slideInAmount * 60, 40);
        } else {
            // For odd-indexed sections (1, 3, 5, ...)
            translateX = Math.max(-(slideInAmount * 60), -40);
        }

        img.style.transform = `translateX(${translateX}%)`;

        const borderWidth = Math.min(slideInAmount * 10, 3);
        img.style.border = `${borderWidth}px solid #ddd`;
    }

    function highlightImage(img) {
        img.style.transition = "filter 0.5s"; // Add transition for gradual change
        img.style.filter = "brightness(0.5)"; // Change border color to highlight
    }

    function removeHighlight(img) {
        img.style.transition = "filter 0.5s"; // Add transition for gradual change
        img.style.filter = ""; // Remove filter to remove highlight
    }

    function showMarioGif() {
        animationInProgress = true;
        marioGifContainer.style.display = "block";
        marioGifContainer.style.animation = "none";
        void marioGifContainer.offsetWidth;
        marioGifContainer.style.animation = "slideIn 3s linear";
        setTimeout(function() {
            animationInProgress = false;
        }, 3000);
    }

    function showMarioPipe() {
        marioPipe.style.right = "20px"
    }
});
