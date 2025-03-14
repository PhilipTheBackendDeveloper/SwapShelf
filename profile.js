document.addEventListener("DOMContentLoaded", () => {
    // Profile Navigation
    const navItems = document.querySelectorAll(".profile-nav-item")
    const sections = document.querySelectorAll(".profile-section")
  
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const targetSection = this.getAttribute("data-section")
  
        // Update active nav item
        navItems.forEach((nav) => nav.classList.remove("active"))
        this.classList.add("active")
  
        // Show target section
        sections.forEach((section) => section.classList.remove("active"))
        document.getElementById(targetSection).classList.add("active")
      })
    })
  
    // Profile Picture Upload
    const profilePicture = document.getElementById("profile-picture")
    const profileImage = document.getElementById("profile-image")
    const profilePictureInput = document.getElementById("profile-picture-input")
    const uploadPictureBtn = document.getElementById("upload-picture-btn")
    const removePictureBtn = document.getElementById("remove-picture-btn")
  
    // Handle click on profile picture
    profilePicture.addEventListener("click", () => {
      profilePictureInput.click()
    })
  
    // Handle click on upload button
    uploadPictureBtn.addEventListener("click", () => {
      profilePictureInput.click()
    })
  
    // Handle file selection
    profilePictureInput.addEventListener("change", function () {
      const file = this.files[0]
  
      if (file) {
        // Validate file type
        const validTypes = ["image/jpeg", "image/png", "image/gif"]
        if (!validTypes.includes(file.type)) {
          showNotification("Please select a valid image file (JPG, PNG, or GIF)", "error")
          return
        }
  
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          showNotification("Image size should be less than 5MB", "error")
          return
        }
  
        // Preview the image
        const reader = new FileReader()
        reader.onload = (e) => {
          profileImage.src = e.target.result
          showNotification("Profile picture updated successfully!", "success")
  
          // In a real application, you would upload the image to the server here
          simulateUpload(file)
        }
        reader.readAsDataURL(file)
      }
    })
  
    // Handle remove picture
    removePictureBtn.addEventListener("click", () => {
      profileImage.src = "https://via.placeholder.com/150"
      profilePictureInput.value = ""
      showNotification("Profile picture removed", "success")
    })
  
    // Drag and drop functionality for profile picture
    ;["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      profilePicture.addEventListener(eventName, preventDefaults, false)
    })
  
    function preventDefaults(e) {
      e.preventDefault()
      e.stopPropagation()
    }
    ;["dragenter", "dragover"].forEach((eventName) => {
      profilePicture.addEventListener(eventName, highlight, false)
    })
    ;["dragleave", "drop"].forEach((eventName) => {
      profilePicture.addEventListener(eventName, unhighlight, false)
    })
  
    function highlight() {
      profilePicture.classList.add("highlight")
    }
  
    function unhighlight() {
      profilePicture.classList.remove("highlight")
    }
  
    profilePicture.addEventListener("drop", handleDrop, false)
  
    function handleDrop(e) {
      const dt = e.dataTransfer
      const file = dt.files[0]
  
      if (file) {
        // Validate file type
        const validTypes = ["image/jpeg", "image/png", "image/gif"]
        if (!validTypes.includes(file.type)) {
          showNotification("Please select a valid image file (JPG, PNG, or GIF)", "error")
          return
        }
  
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          showNotification("Image size should be less than 5MB", "error")
          return
        }
  
        // Preview the image
        const reader = new FileReader()
        reader.onload = (e) => {
          profileImage.src = e.target.result
          showNotification("Profile picture updated successfully!", "success")
  
          // In a real application, you would upload the image to the server here
          simulateUpload(file)
        }
        reader.readAsDataURL(file)
      }
    }
  
    // Range slider for exchange radius
    const radiusSlider = document.getElementById("exchange-radius")
    const radiusValue = document.getElementById("radius-value")
  
    if (radiusSlider && radiusValue) {
      radiusValue.textContent = radiusSlider.value
  
      radiusSlider.addEventListener("input", function () {
        radiusValue.textContent = this.value
      })
    }
  
    // Form submission handlers
    const personalInfoForm = document.getElementById("personal-info-form")
    const changePasswordForm = document.getElementById("change-password-form")
  
    if (personalInfoForm) {
      personalInfoForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent
  
        submitBtn.disabled = true
        submitBtn.textContent = "Saving..."
  
        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.disabled = false
          showNotification("Personal information updated successfully!", "success")
        }, 1500)
      })
    }
  
    if (changePasswordForm) {
      changePasswordForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        const currentPassword = document.getElementById("current-password").value
        const newPassword = document.getElementById("new-password").value
        const confirmPassword = document.getElementById("confirm-password").value
  
        // Basic validation
        if (!currentPassword || !newPassword || !confirmPassword) {
          showNotification("Please fill in all password fields", "error")
          return
        }
  
        if (newPassword !== confirmPassword) {
          showNotification("New passwords do not match", "error")
          return
        }
  
        if (newPassword.length < 8) {
          showNotification("Password must be at least 8 characters long", "error")
          return
        }
  
        // Simulate password change
        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent
  
        submitBtn.disabled = true
        submitBtn.textContent = "Updating..."
  
        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.disabled = false
          showNotification("Password updated successfully!", "success")
          this.reset()
        }, 1500)
      })
    }
  
    // Delete account confirmation
    const deleteAccountBtn = document.querySelector(".btn-danger")
  
    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
          showNotification("Account deletion request submitted. You will receive a confirmation email.", "success")
        }
      })
    }
  
    // Notification system
    function showNotification(message, type = "info") {
      // Create notification element
      const notification = document.createElement("div")
      notification.className = `notification ${type}`
  
      // Create icon based on type
      const icon = document.createElement("div")
      icon.className = "notification-icon"
  
      if (type === "success") {
        icon.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
      } else if (type === "error") {
        icon.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
      } else {
        icon.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
      }
  
      // Create message element
      const messageElement = document.createElement("div")
      messageElement.className = "notification-message"
      messageElement.textContent = message
  
      // Create close button
      const closeBtn = document.createElement("button")
      closeBtn.className = "notification-close"
      closeBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
  
      // Append elements to notification
      notification.appendChild(icon)
      notification.appendChild(messageElement)
      notification.appendChild(closeBtn)
  
      // Add notification to the DOM
      if (!document.querySelector(".notifications-container")) {
        const container = document.createElement("div")
        container.className = "notifications-container"
        document.body.appendChild(container)
      }
  
      document.querySelector(".notifications-container").appendChild(notification)
  
      // Add styles for notifications if they don't exist
      if (!document.getElementById("notification-styles")) {
        const style = document.createElement("style")
        style.id = "notification-styles"
        style.textContent = `
          .notifications-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          
          .notification {
            display: flex;
            align-items: center;
            gap: 12px;
            background-color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            min-width: 300px;
            max-width: 450px;
            animation: slideIn 0.3s ease forwards;
          }
          
          .notification.success {
            border-left: 4px solid #10b981;
          }
          
          .notification.error {
            border-left: 4px solid #ef4444;
          }
          
          .notification.info {
            border-left: 4px solid #3b82f6;
          }
          
          .notification-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
          }
          
          .notification.success .notification-icon {
            color: #10b981;
          }
          
          .notification.error .notification-icon {
            color: #ef4444;
          }
          
          .notification.info .notification-icon {
            color: #3b82f6;
          }
          
          .notification-icon svg {
            width: 100%;
            height: 100%;
          }
          
          .notification-message {
            flex: 1;
            font-size: 0.95rem;
          }
          
          .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: #9ca3af;
            transition: color 0.2s ease;
          }
          
          .notification-close:hover {
            color: #4b5563;
          }
          
          .notification-close svg {
            width: 100%;
            height: 100%;
          }
          
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes slideOut {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }
        `
        document.head.appendChild(style)
      }
  
      // Handle close button click
      closeBtn.addEventListener("click", () => {
        closeNotification(notification)
      })
  
      // Auto close after 5 seconds
      setTimeout(() => {
        closeNotification(notification)
      }, 5000)
    }
  
    function closeNotification(notification) {
      notification.style.animation = "slideOut 0.3s ease forwards"
      setTimeout(() => {
        notification.remove()
  
        // Remove container if empty
        const container = document.querySelector(".notifications-container")
        if (container && container.children.length === 0) {
          container.remove()
        }
      }, 300)
    }
  
    // Simulate file upload to server
    function simulateUpload(file) {
      console.log(`Simulating upload of file: ${file.name} (${Math.round(file.size / 1024)} KB)`)
      // In a real application, you would use fetch or XMLHttpRequest to upload the file
    }
  
    // Add highlight class for profile picture
    document.head.insertAdjacentHTML(
      "beforeend",
      `
      <style>
        .profile-picture.highlight {
          box-shadow: 0 0 0 3px var(--primary-color);
        }
      </style>
    `,
    )
  })
  
  