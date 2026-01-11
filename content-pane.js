document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".content-loader");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const file = this.dataset.file;
            const targetId = this.dataset.target; // Get the data-target attribute
            const targetPane = document.getElementById(targetId); // Fetch the corresponding target element

            if (!file) {
                console.error("No file specified for this button/link.");
                return;
            }

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
                    // Extract the content from the loaded HTML
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, "text/html");
                    targetPane.innerHTML = doc.body.innerHTML;

                    // Make sure the target pane is visible
                    targetPane.style.display = "block";

                    // Optional: Scroll to the target pane
                    window.scrollTo({ top: targetPane.offsetTop, behavior: "smooth" });
                })
                .catch(error => console.error(`Error loading content for target ID ${targetId}:`, error));
        });
    });
});