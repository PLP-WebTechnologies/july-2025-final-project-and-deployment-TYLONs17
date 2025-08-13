/*
 * script.js - The Atomic Activation Sequence (Multipage Edition)
 * This script provides interactivity for the entire "I AM ATOMIC" themed website.
 * It demonstrates:
 * - Event handling for navigation, buttons, and form submission.
 * - Custom interactive features (Navigation Toggle, Home Page Insight, Philosophy Page Toggle, Arsenal Hover, Chronicles Load More, Contact Form Validation).
 * - CSS3 Transitions triggered by JavaScript.
 * - JavaScript Functions: Scope, Parameters & Return Values.
 * - Dynamic content loading and DOM manipulation.
 * Each part is clearly commented and organized.
 */

// Global Scope Variables (Part 2: Scope)
// These flags control the state of interactive elements across different functions and pages.
let intelPanelVisible = false; // For the philosophy page
let currentChroniclePageIndex = 0; // For Chronicles page pagination

// Part 1: Common DOM References
// -----------------------------------------------------------------------------
const navToggleBtn = document.querySelector(".nav-toggle");
const navList = document.querySelector(".main-nav .nav-list");
const navLinks = document.querySelectorAll(".main-nav .nav-link");

// Part 2 & 3: JavaScript Functions — Scope, Parameters & Return Values & Combining CSS with JS
// -----------------------------------------------------------------------------

/**
 * @function toggleNavMenu
 * @description Toggles the visibility of the mobile navigation menu using a CSS class.
 * (Interactive Feature: Navigation Toggle)
 * (Part 3: Combining CSS with JS - Triggering a CSS Transition)
 */
function toggleNavMenu() {
  if (navList) {
    navList.classList.toggle("active"); // Toggles the 'active' class
    // Adjust height for smooth transition based on active state
    if (navList.classList.contains("active")) {
      navList.style.height = navList.scrollHeight + "px"; // Set height to content height
    } else {
      navList.style.height = "0"; // Collapse
    }
  }
}

/**
 * @function highlightCurrentNav
 * @description Highlights the current page in the navigation bar.
 * (Part 2: Custom Function)
 */
function highlightCurrentNav() {
  const currentPagePath = window.location.pathname.split("/").pop(); // e.g., "index.html"
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPagePath) {
      link.classList.add("current-page");
    } else {
      link.classList.remove("current-page");
    }
  });
}

// -----------------------------------------------------------------------------
// Home Page Specific Functions (index.html)
// -----------------------------------------------------------------------------
const insights = [
  "The true power lies in being unnoticed.",
  "Perfection is achieved through countless, unseen efforts.",
  "A minor character today, a hidden mastermind tomorrow.",
  "I am just a mob. I am Atomic.",
];
let currentInsightIndex = 0;

/**
 * @function displayNewInsight
 * @description Updates the 'Daily Atomic Insight' on the Home page.
 * (Interactive Feature: Dynamic Content Update)
 * (Part 2: Custom Function)
 */
function displayNewInsight() {
  const insightDisplay = document.getElementById("insight-display");
  if (insightDisplay) {
    currentInsightIndex = (currentInsightIndex + 1) % insights.length;
    insightDisplay.textContent = insights[currentInsightIndex];
  }
}

/**
 * @function navigateToPhilosophy
 * @description Redirects to the Philosophy page.
 * (Part 2: Custom Function)
 */
function navigateToPhilosophy() {
  window.location.href = "philosophy.html";
}

// -----------------------------------------------------------------------------
// Philosophy Page Specific Functions (philosophy.html)
// -----------------------------------------------------------------------------
/**
 * @function toggleHiddenPhilosophy
 * @description Toggles the visibility of a hidden philosophy block using CSS transitions.
 * (Interactive Feature: Toggle Content Visibility)
 * (Part 3: Combining CSS with JS - Triggering a CSS Transition)
 * (Part 2: Scope - `intelPanelVisible` is global, but its state is manipulated here)
 */
function toggleHiddenPhilosophy() {
  const hiddenBlock = document.getElementById("hiddenPhilosophyBlock");
  const toggleButton = document.getElementById("toggleHiddenPhilosophy");

  if (hiddenBlock && toggleButton) {
    intelPanelVisible = !intelPanelVisible; // Reusing global flag for similar logic

    if (intelPanelVisible) {
      hiddenBlock.classList.remove("collapsed"); // Remove collapsed class
      hiddenBlock.style.maxHeight = hiddenBlock.scrollHeight + "px"; // Set height to content height for transition
      hiddenBlock.style.opacity = "1";
      toggleButton.textContent = "Conceal Hidden Wisdom";
    } else {
      hiddenBlock.style.maxHeight = "0"; // Collapse
      hiddenBlock.style.opacity = "0";
      toggleButton.textContent = "Reveal Hidden Wisdom";
      // Optional: Remove class after transition to ensure it resets fully
      setTimeout(() => {
        hiddenBlock.classList.add("collapsed");
      }, 700); // Matches CSS transition duration
    }
  }
}

// -----------------------------------------------------------------------------
// Chronicles Page Specific Functions (chronicles.html)
// -----------------------------------------------------------------------------
const allChronicleEntries = [
  {
    date: "2024-01-05",
    title: "The Sanctuary Incident",
    excerpt:
      "Details emerge of a mystical sanctuary's collapse, seemingly due to an unseen force. Witnesses report a blinding light and a single, echoing declaration.",
  },
  {
    date: "2024-02-18",
    title: "Bandit Kingdom Purge",
    excerpt:
      "A widespread criminal organization is mysteriously dismantled overnight. Intel suggests a 'Shadow' figure was involved, leaving no trace.",
  },
  {
    date: "2024-03-22",
    title: "The Cult of Diabolos Uncovered",
    excerpt:
      "A shadowy cult's operations are suddenly exposed to the public. The method of exposure remains unknown, but leads point to a carefully orchestrated reveal.",
  },
  {
    date: "2024-04-10",
    title: "Academy Arc Climax",
    excerpt:
      "A major incident within the prestigious Midgar Academy is resolved with surprising efficiency. Unconfirmed reports speak of impossible feats and a sudden, overwhelming conclusion.",
  },
  {
    date: "2024-05-01",
    title: "The Goddess's Trial Revelation",
    excerpt:
      "Ancient secrets are unveiled during a sacred trial, aligning perfectly with obscure prophecies. The convenience of these revelations is uncanny.",
  },
  {
    date: "2024-06-15",
    title: "Financial Underworld Collapse",
    excerpt:
      "A vast network of corrupt financial institutions crumbles from within, disrupting illicit trade routes. It appears to be a systemic, atomic-level implosion.",
  },
];
const entriesPerPage = 2;

/**
 * @function loadChronicleEntries
 * @description Dynamically loads chronicle entries onto the page.
 * (Interactive Feature: Load More Content)
 * (Part 2: Custom Function, Parameters & Scope)
 */
function loadChronicleEntries(startIndex, count) {
  const chroniclesContainer = document.getElementById("chronicles-container");
  if (!chroniclesContainer) return;

  // Local Scope: `endIndex`, `fragment`, `entryData` are local.
  const endIndex = Math.min(startIndex + count, allChronicleEntries.length);
  const fragment = document.createDocumentFragment();

  // Loop through entries and create DOM elements (Reused JS logic)
  for (let i = startIndex; i < endIndex; i++) {
    const entryData = allChronicleEntries[i];
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("chronicle-entry");
    entryDiv.innerHTML = `
            <h3>${entryData.title}</h3>
            <span class="date">Date: ${entryData.date}</span>
            <p>${entryData.excerpt}</p>
        `;
    fragment.appendChild(entryDiv);
  }
  chroniclesContainer.appendChild(fragment);

  // Hide load more button if all entries are loaded
  const loadMoreBtn = document.getElementById("loadMoreChroniclesBtn");
  if (loadMoreBtn && endIndex === allChronicleEntries.length) {
    loadMoreBtn.style.display = "none";
  }
  currentChroniclePageIndex = endIndex; // Update global page index
}

// -----------------------------------------------------------------------------
// Contact Page Specific Functions (contact.html)
// -----------------------------------------------------------------------------
/**
 * @function validateApplicationForm
 * @description Performs custom JavaScript validation for the application form.
 * (Interactive Feature: Custom Form Validation)
 * (Part 2: Custom Function)
 * @param {Event} event - The form submission event.
 * @returns {boolean} - Returns true if the form is valid, false otherwise.
 */
function validateApplicationForm(event) {
  event.preventDefault(); // Prevent default HTML form submission

  let isValid = true; // Local Scope: `isValid` is local to this function.

  // Reset all error messages
  nameError.textContent = "";
  emailError.textContent = "";
  codeError.textContent = "";
  motivationError.textContent = "";

  // Validate Codename (applicantName)
  if (applicantNameInput.value.trim() === "") {
    nameError.textContent = "Codename is required for vital intelligence.";
    isValid = false;
  } else if (applicantNameInput.value.trim().length < 3) {
    nameError.textContent = "Codename must be at least 3 characters.";
    isValid = false;
  }

  // Validate Encrypted Email (applicantEmail)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (applicantEmailInput.value.trim() === "") {
    emailError.textContent = "Encrypted email is crucial for secure comms.";
    isValid = false;
  } else if (!emailPattern.test(applicantEmailInput.value.trim())) {
    emailError.textContent = "Please enter a valid encrypted email format.";
    isValid = false;
  }

  // Validate Secret Activation Code (secretCode)
  if (secretCodeInput.value === "") {
    codeError.textContent = "Secret activation code is absolutely essential.";
    isValid = false;
  } else if (secretCodeInput.value.length < 8) {
    codeError.textContent =
      "Code must be at least 8 characters for atomic security.";
    isValid = false;
  } else if (
    !/[A-Z]/.test(secretCodeInput.value) ||
    !/[0-9]/.test(secretCodeInput.value)
  ) {
    codeError.textContent =
      "Code needs at least one uppercase letter and one number.";
    isValid = false;
  }

  // Validate Motivation (motivation)
  if (motivationTextarea.value.trim() === "") {
    motivationError.textContent = "Your atomic motivation must be declared.";
    isValid = false;
  } else if (motivationTextarea.value.trim().length < 50) {
    motivationError.textContent =
      "Please elaborate more on your atomic ambitions (min 50 chars).";
    isValid = false;
  }

  // If all fields are valid, proceed with form submission (conceptual)
  if (isValid) {
    alert(
      "Application submitted! Your atomic potential has been recognized. Standby for further instructions."
    );
    applicationForm.reset(); // Clear the form
  } else {
    alert("Application validation failed. Review your intel and try again.");
  }
  return isValid; // Returns a boolean value
}

// -----------------------------------------------------------------------------
// Part 4: Event Handling (Connecting it all) & Initial Setup
// -----------------------------------------------------------------------------

// Event listener for navigation toggle button (common for all pages)
if (navToggleBtn) {
  navToggleBtn.addEventListener("click", toggleNavMenu);
}

// Ensure nav links close menu on click (for mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navList.classList.contains("active")) {
      toggleNavMenu(); // Close menu after clicking a link
    }
  });
});

// Logic to run when the DOM is fully loaded for specific pages
document.addEventListener("DOMContentLoaded", () => {
  highlightCurrentNav(); // Highlight current page on load

  // Home Page specific setup
  const explorePhilosophyButton = document.getElementById(
    "explorePhilosophyBtn"
  );
  if (explorePhilosophyButton) {
    explorePhilosophyButton.addEventListener("click", navigateToPhilosophy);
  }
  const newInsightBtn = document.getElementById("newInsightBtn");
  if (newInsightBtn) {
    displayNewInsight(); // Display initial insight
    newInsightBtn.addEventListener("click", displayNewInsight); // Event listener for new insight button
  }

  // Philosophy Page specific setup
  const toggleHiddenPhilosophyBtn = document.getElementById(
    "toggleHiddenPhilosophy"
  );
  if (toggleHiddenPhilosophyBtn) {
    toggleHiddenPhilosophyBtn.addEventListener("click", toggleHiddenPhilosophy);
  }

  // Chronicles Page specific setup
  const loadMoreChroniclesBtn = document.getElementById(
    "loadMoreChroniclesBtn"
  );
  if (loadMoreChroniclesBtn) {
    loadChronicleEntries(currentChroniclePageIndex, entriesPerPage); // Load initial entries
    loadMoreChroniclesBtn.addEventListener("click", () => {
      loadChronicleEntries(currentChroniclePageIndex, entriesPerPage); // Load more on click
    });
  }

  // Contact Page specific setup (Form validation listeners)
  if (applicationForm) {
    applicationForm.addEventListener("submit", validateApplicationForm);

    // Live validation feedback as user types
    applicantNameInput.addEventListener("input", () => {
      if (
        applicantNameInput.value.trim().length < 3 &&
        applicantNameInput.value.trim() !== ""
      ) {
        nameError.textContent = "Codename must be at least 3 characters.";
      } else {
        nameError.textContent = "";
      }
    });
    applicantEmailInput.addEventListener("input", () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        !emailPattern.test(applicantEmailInput.value.trim()) &&
        applicantEmailInput.value.trim() !== ""
      ) {
        emailError.textContent = "Please enter a valid encrypted email format.";
      } else {
        emailError.textContent = "";
      }
    });
    secretCodeInput.addEventListener("input", () => {
      if (secretCodeInput.value.length < 8 && secretCodeInput.value !== "") {
        codeError.textContent = "Code must be at least 8 characters.";
      } else if (
        !/[A-Z]/.test(secretCodeInput.value) ||
        !/[0-9]/.test(secretCodeInput.value)
      ) {
        codeError.textContent =
          "Code needs at least one uppercase letter and one number.";
      } else {
        codeError.textContent = "";
      }
    });
    motivationTextarea.addEventListener("input", () => {
      if (
        motivationTextarea.value.trim().length < 50 &&
        motivationTextarea.value.trim() !== ""
      ) {
        motivationError.textContent = "Please elaborate more (min 50 chars).";
      } else {
        motivationError.textContent = "";
      }
    });
  }

  // Cleanup: Remove JS-only elements if HTML pages are not loaded, avoids errors.
  // This part ensures the script adapts to which HTML file it's loaded in.
  const currentPageName = window.location.pathname.split("/").pop();
  if (
    currentPageName === "index.html" &&
    !document.getElementById("explorePhilosophyBtn")
  ) {
    // This is a placeholder for safety, generally not needed if HTML is correct
  } else if (
    currentPageName === "philosophy.html" &&
    !document.getElementById("toggleHiddenPhilosophy")
  ) {
    // This is a placeholder for safety, generally not needed if HTML is correct
  }
  // ... similar checks for other pages if they were heavily reliant on JS-only DOM elements.
});
