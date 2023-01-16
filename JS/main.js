let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  // Remove Active Class List Item
  document.querySelectorAll(".settings-box .option-box ul li").forEach((e) => {
    e.classList.remove("active");
    // Add Active Class On Element With Data-color === Local Storage Item
    if (e.dataset.color === mainColors) {
      // Add Active Class
      e.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background-option");

// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundLocalItem = false;
  }
  // Remove Active Class From All Spans
  document.querySelectorAll(".random-background span").forEach((e) => {
    e.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

document.querySelector(".toggle-settings .our-gear").onclick = function () {
  // Toggle Spin Class On Icon
  this.classList.toggle("fa-spin");
  // Toggle Open Class On Setting Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".settings-box .option-box ul li");

// Loop On All List Items
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);

    // Remove Active Class From All Children
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    // Add Active Classs On Self
    e.target.classList.add("active");
  });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-background span");

// Loop On All Spans
randomBackEl.forEach((span) => {
  // Click On Every List Items
  span.addEventListener("click", (e) => {
    // Remove Active Class From All Children
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    // Add Active Classs On Self
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.png",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
];
// Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    // Changeing Background Every 10 Seconds
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image Url
      landingPage.style.backgroundImage = `url("../Media/${imgsArray[randomNumber]}")`;
    }, 10000);
  }
}

randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // The Height Of All Above Skills Section
  let skillsOffsetTop = ourSkills.offsetTop;
  // The Height Of Skills Section
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window ScrollTop Changes Depends On Your Position Of The Screen
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((e) => {
  e.addEventListener("click", (img) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // Add Class To Overlay
    overlay.className = "popup-overlay";
    // Append Overlay To The Body
    document.body.appendChild(overlay);
    // Create The Popup Box
    let popupBox = document.createElement("div");
    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // Create Text For Heading
      let imgText = document.createTextNode(e.alt);
      // Append The Text To The Heading
      imgHeading.appendChild(imgText);
      // Append The Heading To The PopupBox
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = img.target.src;
    // Add Image To Popup Box
    popupBox.appendChild(popupImage);
    // Append The Popup Box To Body
    document.body.appendChild(popupBox);
    // Create The Close Span
    let closeButton = document.createElement("span");
    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");
    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);
    // Add Class To Close Button
    closeButton.className = "close-button";
    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});
// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach((b) => {
  b.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Select All Bullets
const allLinks = document.querySelectorAll("header ul li a");

allLinks.forEach((l) => {
  l.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

// Reset Button

document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear(); // Remove All
  localStorage.removeItem("color-option");
  localStorage.removeItem("bullets-option");
  localStorage.removeItem("background-option");

  // Reload Window
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector("header ul");

toggleBtn.onclick = function () {
  tlinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      tlinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tlinks.onclick = function (e) {
  e.stopPropagation();
};
