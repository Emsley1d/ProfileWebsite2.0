function initializeCollapsibles() {
  console.log("Initializing collapsibles");
  const containers = document.querySelectorAll(".collapsible");
  console.log("Found containers:", containers.length);
  
  containers.forEach(container => {
    const header = container.querySelector(".collapsible-header");
    const content = container.querySelector(".collapsible-content");
    const icon = container.querySelector(".toggle-icon");
    if (!header || !content) return;
    
    // Start collapsed
    content.style.maxHeight = "0px";
    container.classList.remove("open");
    icon?.classList.remove("open");
    
    header.addEventListener("click", () => {
      console.log("header clicked");
      const isOpen = container.classList.contains("open");

      // collapse all other sections first
      containers.forEach(otherContainer => {
        if (otherContainer !== container) {
          const otherContent = otherContainer.querySelector(".collapsible-content");
          const otherIcon = otherContainer.querySelector(".toggle-icon");
          otherContent.style.maxHeight = "0px";
          otherContainer.classList.remove("open");
          otherIcon?.classList.remove("open");
        }
      });

      if (isOpen) {
        // CLOSE
        content.style.maxHeight = "0px";
        container.classList.remove("open");
        icon?.classList.remove("open");
      } else {
        // OPEN
        container.classList.add("open");
        icon?.classList.add("open");
        requestAnimationFrame(() => {
          content.style.maxHeight = content.scrollHeight + "px";
        });
      }
    });
  });
}

// Call on initial page load (for any collapsibles already on the page)
document.addEventListener("DOMContentLoaded", initializeCollapsibles);