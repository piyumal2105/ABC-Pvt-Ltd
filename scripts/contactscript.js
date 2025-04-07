document.addEventListener("DOMContentLoaded", function () {
  // Contact form validation
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll("[required]");

      // Reset previous error states
      const errorMessages = contactForm.querySelectorAll(".error-message");
      errorMessages.forEach((error) => error.remove());

      requiredFields.forEach((field) => {
        field.classList.remove("error");

        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("error");

          // Add error message
          const errorDiv = document.createElement("div");
          errorDiv.className = "error-message";
          errorDiv.textContent = "This field is required";
          field.parentNode.appendChild(errorDiv);
        }

        // Email validation
        if (field.type === "email" && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value)) {
            isValid = false;
            field.classList.add("error");

            // Add error message
            const errorDiv = document.createElement("div");
            errorDiv.className = "error-message";
            errorDiv.textContent = "Please enter a valid email address";
            field.parentNode.appendChild(errorDiv);
          }
        }
      });

      if (isValid) {
        // Form is valid - normally you would submit to server here

        // Simulate form submission
        const submitBtn = contactForm.querySelector(".submit-btn");
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        setTimeout(function () {
          // Show success message
          contactForm.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Message Sent Successfully!</h3>
                            <p>Thank you for contacting ABC (Pvt) Ltd. We will get back to you shortly.</p>
                        </div>
                    `;

          // Add success message styling
          const style = document.createElement("style");
          style.textContent = `
                        .success-message {
                            text-align: center;
                            padding: 40px 20px;
                        }
                        
                        .success-message i {
                            color: #4CAF50;
                            font-size: 4rem;
                            margin-bottom: 20px;
                        }
                        
                        .success-message h3 {
                            color: var(--navy-blue);
                            font-size: 1.8rem;
                            margin-bottom: 15px;
                        }
                        
                        .success-message p {
                            font-size: 1.1rem;
                            line-height: 1.6;
                        }
                    `;
          document.head.appendChild(style);
        }, 1500);
      }
    });

    // Add error styling
    const style = document.createElement("style");
    style.textContent = `
            .error {
                border-color: #ff3b30 !important;
            }
            
            .error-message {
                color: #ff3b30;
                font-size: 0.85rem;
                margin-top: 5px;
                font-family: 'Montserrat', sans-serif;
            }
        `;
    document.head.appendChild(style);
  }

  // Update header links to highlight current page
  const currentPage = window.location.pathname.split("/").pop();

  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (currentPage === linkPage) {
      link.classList.add("active");
    }
  });
});
