document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const gameSections = document.querySelectorAll(".console-section");
    const consoleSectionImages = document.querySelectorAll(".console-section img");

    const volumeRange = document.getElementById("volumeRange");

    const firstGameImage = document.getElementById("Game01Image");
    const marioRacRun = document.getElementById("Game02Image");
    const cursorTrigger = document.getElementById("Game06Image");
    const cappyTrigger = document.getElementById("Game07Image");
    const fireworksTrigger = document.getElementById("Game08Image");
    const LastGameImage = document.getElementById("Game09Image");

    let currentIndex = -1;
    let animationInProgress = false;
    let isMarioCursor = false;

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

    // mario racoon gif run animation
    marioRacRun.addEventListener("click", function() {
        if (!animationInProgress) {
            showMarioRacGif();
        }
    });

    // mario cursor change
    cursorTrigger.addEventListener("click", function() {
        if (!isMarioCursor) {
            console.log("Changed to mario cursor");
            document.body.style.cursor = `url("imgs/cursor_normal.png"), auto`;
            updateConsoleSectionCursor(`url("imgs/cursor_click.png"), pointer`);
            isMarioCursor = true;
        } else {
            console.log("Changed to normal");
            document.body.style.cursor = "auto";
            updateConsoleSectionCursor("pointer");
            isMarioCursor = false;
        }
    });

    // pop up random cappy
    cappyTrigger.addEventListener("click", function () {
        if (!animationInProgress) {
            popUpCappy();
        }
    });

    // fireworks player
    fireworksTrigger.addEventListener("click", function () {
        if (!animationInProgress) {
            showFireworks();
        }
    });

    // moving pipes
    LastGameImage.addEventListener("click", function() {
        if (!animationInProgress) {
            popUpMarioPipes();
        }
    });

    function formatNumber(number) {
        return number.toString().padStart(2, '0');
    }

    function updateConsoleSectionCursor(cursorStyle) {
        consoleSectionImages.forEach(img => {
            img.style.cursor = cursorStyle;
        });
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

        const slideInAmount = (window.scrollY - section.offsetTop + window.innerHeight) / window.innerHeight;
        let translateX;

        if (index % 2 === 0) {
            translateX = Math.min(slideInAmount * 60, 40);
        } else {
            translateX = Math.max(-(slideInAmount * 60), -40);
        }

        img.style.transform = `translateX(${translateX}%)`;

        const borderWidth = Math.min(slideInAmount * 10, 3);
        img.style.border = `${borderWidth}px solid #ddd`;
    }

    function highlightImage(img) {
        img.style.transition = "filter 0.5s";
        img.style.filter = "brightness(0.5)";
    }

    function removeHighlight(img) {
        img.style.transition = "filter 0.5s";
        img.style.filter = "";
    }

    function showMarioGif() {
        const marioGifContainer = document.getElementById("marioGifContainer");
        animationInProgress = true;
        marioGifContainer.style.display = "block";
        marioGifContainer.style.animation = "none";
        void marioGifContainer.offsetWidth;
        marioGifContainer.style.animation = "slideIn 3s linear";
        setTimeout(function() {
            animationInProgress = false;
            marioGifContainer.style.display = "none";
        }, 3000);
    }

    function showMarioRacGif() {
        const marioRacContainer = document.getElementById("marioRacContainer");
        animationInProgress = true;
        marioRacContainer.style.display = "block";
        marioRacContainer.style.animation = "none";
        void marioRacContainer.offsetWidth;
        marioRacContainer.style.animation = "slideInInv 3s linear";
        console.log("sliininv");
        setTimeout(function() {
            animationInProgress = false;
            marioRacContainer.style.display = "none";
        }, 3000);
    }

    function popUpCappy() {
        const cappyContainer = document.getElementById('cappyContainer');
        animationInProgress = true;

        let randomX = Math.floor(Math.random() * 211);

        let randomY;
        if (randomX >= 70) {
            // If X is in range [140, 280], pick random Y from [-60, 80]
            randomX += 70;
            randomY = Math.floor(Math.random() * 141) - 60;
        } else {
            // If X is smaller than 140, set X to 0 and pick Y from [-60, -40]
            randomX = 0;
            randomY = Math.floor(Math.random() * 21) - 60;
        }

        console.log('Random X:', randomX);
        console.log('Random Y:', randomY);

        const keyframes = `@keyframes popUpCappy {
            0% {
                transform: translate(0%, 0%);
            }
            50% {
                transform: translate(${randomX}%, ${randomY}%);
            }
            100% {
                transform: translate(0%, 0%);
            }
        }`;

        const style = document.createElement('style');
        style.innerHTML = keyframes;
        document.head.appendChild(style);
        
        cappyContainer.style.display = "block";
        cappyContainer.style.animation = "none";
        void cappyContainer.offsetWidth;
        cappyContainer.style.animation = `popUpCappy 3s ease-in-out`;
        setTimeout(function() {
            document.head.removeChild(style);
            cappyContainer.style.display = "none";
            animationInProgress = false;
        }, 3000);
    
    }

    function showFireworks() {
        fireworksContainer.style.display = "block";
        animationInProgress = true;

        setTimeout(function () {
            animationInProgress = false;
            fireworksContainer.style.display = "none";
        }, 2000);
    }

    function popUpMarioPipes() {
        var pipes = document.querySelectorAll('.marioPipe');
        animationInProgress = true;

        pipes.forEach((pipe, index) => {
            pipe.style.animation = "none";
            void pipe.offsetWidth;
            pipe.style.animation = `popUpPipe 2s ease-in-out ${index * 0.2}s`;
        });
        setTimeout(function() {
            animationInProgress = false;
        }, 3000);
    
    }
});
