document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".content-loader");
    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            // Hide policy-content-pane if visible when any button is clicked
            const policyPane = document.getElementById("policy-content-pane");
            if (policyPane && policyPane.style.display === "block") {
                policyPane.style.display = "none";
            }
            const file = this.dataset.file;
            if (!file) {
                console.error("No file specified for this button/link.");
                return;
            }
            // Default target = content-pane
            const targetId = this.dataset.target || "content-pane";
            const targetPane = document.getElementById(targetId);
            if (!targetPane) {
                console.error(`No target element found with ID: ${targetId}`);
                return;
            }
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to load ${file}`);
                    }
                    return response.text();
                })
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    targetPane.innerHTML = doc.body.innerHTML;
                    targetPane.style.display = "block";
                    window.scrollTo({
                        top: targetPane.offsetTop,
                        behavior: "smooth"
                    });
                })
                .catch(error =>
                    console.error(`Error loading content for ${targetId}:`, error)
                );
        });
    });

    // Back to top button - using event delegation on the document
    document.addEventListener("click", function(event) {
        if (event.target && event.target.id === "back-to-top") {
            console.log("Back to top clicked!"); // Debug log
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });
});

window.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('open') === 'ga-projects') {
        openGAProjectsPane();
    }
});