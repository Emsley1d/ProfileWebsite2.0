console.error("Script loaded");

document.addEventListener("DOMContentLoaded", function () {
    const contentPane = document.getElementById("content-pane");
    const buttons = document.querySelectorAll(".content-loader");
    console.error("hit");

    if (!contentPane || buttons.length === 0) {
        console.error("Missing #content-pane or .content-loader elements in the DOM.");
        return;
    }

    let isLoading = false; // Throttle overlapping fetch requests

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            if (isLoading) return; // Skip if a request is already in progress

            const file = this.dataset.file;
            if (!file) {
                console.error("No file specified for this button.");
                return;
            }

            isLoading = true;

            fetch(file)
                .then(response => {
                    isLoading = false;
                    if (!response.ok) throw new Error(`Failed to load ${file}`);
                    return response.text();
                })
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    contentPane.innerHTML = doc.body.innerHTML;

                    // Ensure the content pane is visible and scroll to it
                    contentPane.style.display = "block";
                    window.scrollTo({ top: contentPane.offsetTop, behavior: "smooth" });
                })
                .catch(error => {
                    isLoading = false;
                    console.error("Error loading content:", error);
                });
        });
    });
});
