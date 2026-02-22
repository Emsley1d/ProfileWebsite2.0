function initializeCollapsibles() {
  console.log("Initializing collapsibles");
  const containers = Array.from(document.querySelectorAll(".collapsible"));
  console.log("Found containers:", containers.length);

  function closeContainer(container) {
    const content = container.querySelector(".collapsible-content");
    const icon = container.querySelector(".toggle-icon");
    if (!content) return;

    content.style.maxHeight = "0px";
    container.classList.remove("open");
    icon?.classList.remove("open");
  }

  function openContainer(container, { scroll = true } = {}) {
    const header = container.querySelector(".collapsible-header");
    const content = container.querySelector(".collapsible-content");
    const icon = container.querySelector(".toggle-icon");
    if (!content) return;

    // Close all others first
    containers.forEach(c => {
      if (c !== container) closeContainer(c);
    });

    // Open this one
    container.classList.add("open");
    icon?.classList.add("open");

    requestAnimationFrame(() => {
      content.style.maxHeight = content.scrollHeight + "px";
    });

    if (scroll) {
      // scroll to the header for nicer positioning
      (header || container).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Start collapsed + click binding
  containers.forEach(container => {
    const header = container.querySelector(".collapsible-header");
    const content = container.querySelector(".collapsible-content");
    const icon = container.querySelector(".toggle-icon");
    if (!header || !content) return;

    closeContainer(container);

    header.addEventListener("click", () => {
      const isOpen = container.classList.contains("open");

      if (isOpen) {
        closeContainer(container)
        // history.replaceState(null, "", window.location.pathname + window.location.search);
      } else {
        openContainer(container);
        // Update the URL so it becomes a shareable link
        if (container.id) {
          history.replaceState(null, "", `#${container.id}`);
        }
      }
    });
  });

  // Open section from hash on load
  function openFromHash({ scroll = true } = {}) {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target || !target.classList.contains("collapsible")) return;

    openContainer(target, { scroll });
  }

 
  // small timeout helps if fonts/layout change heights
  setTimeout(() => openFromHash({ scroll: false }), 0);

  // back/forward buttons update hash => open that section
  window.addEventListener("hashchange", () => openFromHash({ scroll: true }));
}

document.addEventListener("DOMContentLoaded", initializeCollapsibles);