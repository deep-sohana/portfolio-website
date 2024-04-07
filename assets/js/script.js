'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

//download cv
const downloadButton = document.getElementById('downloadButton');

downloadButton.addEventListener('click', function() {
  const pdfUrl = 'https://1drv.ms/b/s!Aodz9PwDjJ-fhkBeckRjZN75O1KA?e=ebrbvP';

  // Create a download link and simulate a click event to trigger the download
  const downloadLink = document.createElement('a');
  downloadLink.href = pdfUrl;
  downloadLink.target = '_blank'; // Open in a new tab/window
  downloadLink.click();
});

//send message
const submitButton = document.querySelector(".form-btn");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwszMjHIuuGcNrFbKyfGMBjK6wToRpt47qlFrU0z0-rfJ7h_Bi1_PqUx_t0cSi8ZTXmQw/exec", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            // Form submitted successfully
            console.log("Form submitted successfully");
            form.reset();
        } else {
            console.error("Error submitting form");
        }
    } catch (error) {
        console.error("An error occurred while submitting the form", error);
    } 
});


document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll(".project-item");
  let enlargedImageContainer;

  listItems.forEach(listItem => {
    listItem.addEventListener("click", function (event) {
      event.preventDefault();

      const originalImage = listItem.querySelector("img");
      
      if (!enlargedImageContainer) {
        enlargedImageContainer = document.createElement("div");
        enlargedImageContainer.className = "enlarged-image";

        const clonedImage = originalImage.cloneNode();
        enlargedImageContainer.appendChild(clonedImage);
        document.body.appendChild(enlargedImageContainer);

        enlargedImageContainer.addEventListener("click", function () {
          enlargedImageContainer.style.display = "none";
        });
      } else {
        const existingImage = enlargedImageContainer.querySelector("img");
        existingImage.src = originalImage.src;
      }

      enlargedImageContainer.style.display = "flex";
    });
  });

  window.addEventListener("resize", function () {
    if (enlargedImageContainer) {
      enlargedImageContainer.style.display = "none";
    }
  });

  // Add navigation event listener to handle clearing the container on page change
  window.addEventListener("beforeunload", function () {
    if (enlargedImageContainer) {
      enlargedImageContainer.remove();
    }
  });
});





