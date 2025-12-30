    document.addEventListener("DOMContentLoaded", function () {
        const careerButton = document.getElementById("career-button");
        const contentPane = document.getElementById("content-pane");

        careerButton.addEventListener("click", function (event) {
            event.preventDefault(); 


            fetch("career.html")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to load career.html");
                    }
                    return response.text();
                })
                .then(html => {
                    
                    contentPane.innerHTML = html;
                })
                .catch(error => console.error("Error loading content:", error));
        });
    });