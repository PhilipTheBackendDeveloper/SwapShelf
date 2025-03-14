document.addEventListener("DOMContentLoaded", () => {
    // Form toggle functionality
    const toggleLinks = document.querySelectorAll(".toggle-form-link")
    const formContainers = document.querySelectorAll(".form-container")
  
    toggleLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetForm = this.getAttribute("data-form")
  
        formContainers.forEach((container) => {
          container.classList.remove("active")
        })
  
        if (targetForm === "signup") {
          document.querySelector(".signup-container").classList.add("active")
        } else if (targetForm === "signin") {
          document.querySelector(".signin-container").classList.add("active")
        }
      })
    })
  
    // User type toggle in signin form
    const userTypeToggleBtns = document.querySelectorAll(".user-type-toggle .toggle-btn")
  
    userTypeToggleBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        userTypeToggleBtns.forEach((b) => b.classList.remove("active"))
        this.classList.add("active")
  
        const userType = this.getAttribute("data-type")
        if (userType === "admin") {
          // Show admin specific fields or change form behavior
          document.getElementById("signin-form").setAttribute("data-type", "admin")
        } else {
          document.getElementById("signin-form").setAttribute("data-type", "user")
        }
      })
    })
  
    // Password visibility toggle
    const togglePasswordBtns = document.querySelectorAll(".toggle-password")
  
    togglePasswordBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const passwordInput = this.parentElement.querySelector("input")
        const eyeOpen = this.querySelector(".eye-open")
        const eyeClosed = this.querySelector(".eye-closed")
  
        if (passwordInput.type === "password") {
          passwordInput.type = "text"
          eyeOpen.style.display = "none"
          eyeClosed.style.display = "block"
        } else {
          passwordInput.type = "password"
          eyeOpen.style.display = "block"
          eyeClosed.style.display = "none"
        }
      })
    })
  
    // Admin registration link
    const adminSignupLink = document.createElement("a")
    adminSignupLink.href = "#"
    adminSignupLink.textContent = "Register as Admin"
    adminSignupLink.classList.add("admin-signup-link")
    adminSignupLink.style.display = "block"
    adminSignupLink.style.textAlign = "center"
    adminSignupLink.style.marginTop = "1rem"
    adminSignupLink.style.color = "var(--primary-color)"
  
    document.querySelector(".signup-container .form-footer").appendChild(adminSignupLink)
  
    adminSignupLink.addEventListener("click", (e) => {
      e.preventDefault()
      formContainers.forEach((container) => {
        container.classList.remove("active")
      })
      document.querySelector(".admin-signup-container").classList.add("active")
    })
  
    // Form validation
    const forms = document.querySelectorAll("form")
  
    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault()
  
        let isValid = true
        const inputs = this.querySelectorAll("input[required]")
  
        inputs.forEach((input) => {
          if (!input.value.trim()) {
            isValid = false
            showError(input, "This field is required")
          } else {
            clearError(input)
  
            // Email validation
            if (input.type === "email") {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              if (!emailRegex.test(input.value)) {
                isValid = false
                showError(input, "Please enter a valid email address")
              }
            }
  
            // Password validation
            if (input.type === "password" && input.id.includes("password") && !input.id.includes("confirm")) {
              if (input.value.length < 8) {
                isValid = false
                showError(input, "Password must be at least 8 characters long")
              }
            }
  
            // Confirm password validation
            if (input.id.includes("confirm-password")) {
              const passwordInput = document.getElementById(input.id.replace("confirm-", ""))
              if (input.value !== passwordInput.value) {
                isValid = false
                showError(input, "Passwords do not match")
              }
            }
          }
        })
  
        if (isValid) {
          // Simulate form submission
          const formType = this.id
          const submitBtn = this.querySelector('button[type="submit"]')
          const originalText = submitBtn.textContent
  
          submitBtn.disabled = true
          submitBtn.textContent = "Processing..."
  
          setTimeout(() => {
            submitBtn.textContent = "Success!"
            submitBtn.style.backgroundColor = "var(--success-color)"
  
            // Show success message
            const successMessage = document.createElement("div")
            successMessage.className = "success-message"
            successMessage.textContent = formType.includes("signin")
              ? "Login successful! Redirecting..."
              : "Registration successful! Please check your email to verify your account."
            successMessage.style.color = "var(--success-color)"
            successMessage.style.textAlign = "center"
            successMessage.style.marginTop = "1rem"
            successMessage.style.fontWeight = "500"
  
            this.appendChild(successMessage)
  
            // Redirect after successful login
            if (formType.includes("signin")) {
              setTimeout(() => {
                window.location.href = "/dashboard.html"
              }, 2000)
            } else {
              // Reset form after successful registration
              setTimeout(() => {
                this.reset()
                submitBtn.disabled = false
                submitBtn.textContent = originalText
                submitBtn.style.backgroundColor = ""
                successMessage.remove()
  
                // Switch to signin form
                formContainers.forEach((container) => {
                  container.classList.remove("active")
                })
                document.querySelector(".signin-container").classList.add("active")
              }, 3000)
            }
          }, 1500)
        }
      })
    })
  
    // Helper functions for form validation
    function showError(input, message) {
      clearError(input)
  
      const errorElement = document.createElement("div")
      errorElement.className = "error-message"
      errorElement.textContent = message
      errorElement.style.color = "var(--error-color)"
      errorElement.style.fontSize = "0.75rem"
      errorElement.style.marginTop = "0.25rem"
  
      input.style.borderColor = "var(--error-color)"
      input.parentElement.appendChild(errorElement)
    }
  
    function clearError(input) {
      const errorElement = input.parentElement.querySelector(".error-message")
      if (errorElement) {
        errorElement.remove()
      }
      input.style.borderColor = ""
    }
  
    // Add floating animation to book
    const book = document.querySelector(".book")
    if (book) {
      document.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX / window.innerWidth
        const mouseY = e.clientY / window.innerHeight
  
        const rotateY = (mouseX - 0.5) * 20
        const rotateX = (mouseY - 0.5) * -20
  
        book.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(${Math.sin(Date.now() / 2000) * 10}px)`
      })
    }
  })
  
  