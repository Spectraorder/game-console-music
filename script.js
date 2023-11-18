document.addEventListener("DOMContentLoaded", function() {
    const bgm = document.getElementById("bgm");
    const consoleSections = document.querySelectorAll(".console-section");

    window.addEventListener("scroll", function() {
        const currentPosition = window.scrollY;

        consoleSections.forEach(function(section, index) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (currentPosition >= sectionTop && currentPosition <= sectionBottom) {
                // Show corresponding console content
                section.style.opacity = 1;
                section.style.transform = "translateY(0)";
                
                // Play corresponding BGM
                bgm.src = `bgm/console${index + 1}.mp3`;
                bgm.play();
            }
        });
    });
});
