document.addEventListener("DOMContentLoaded", () => {
    // Sidebar Toggle
    const sidebarToggle = document.querySelector(".sidebar-toggle")
    const adminSidebar = document.querySelector(".admin-sidebar")
  
    if (sidebarToggle && adminSidebar) {
      sidebarToggle.addEventListener("click", () => {
        adminSidebar.classList.toggle("active")
      })
    }
  
    // Select All Users
    const selectAllCheckbox = document.getElementById("select-all-users")
    const userCheckboxes = document.querySelectorAll(".user-checkbox")
  
    if (selectAllCheckbox && userCheckboxes.length) {
      selectAllCheckbox.addEventListener("change", function () {
        userCheckboxes.forEach((checkbox) => {
          checkbox.checked = this.checked
        })
      })
  
      // Update "select all" checkbox when individual checkboxes change
      userCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          const allChecked = Array.from(userCheckboxes).every((cb) => cb.checked)
          const someChecked = Array.from(userCheckboxes).some((cb) => cb.checked)
  
          selectAllCheckbox.checked = allChecked
          selectAllCheckbox.indeterminate = someChecked && !allChecked
        })
      })
    }
  
    // Approve All Button
    const approveAllBtn = document.getElementById("approve-all-btn")
  
    if (approveAllBtn) {
      approveAllBtn.addEventListener("click", () => {
        showConfirmationModal("approve-all", "Are you sure you want to approve all pending users?", () => {
          const pendingRows = document.querySelectorAll("tbody tr")
  
          pendingRows.forEach((row) => {
            const statusBadge = row.querySelector(".status-badge")
            if (statusBadge && statusBadge.classList.contains("pending")) {
              statusBadge.classList.remove("pending")
              statusBadge.classList.add("approved")
              statusBadge.textContent = "Approved"
            }
          })
  
          showNotification("All pending users have been approved successfully.", "success")
        })
      })
    }
  
    // Individual Approve Buttons
    const approveButtons = document.querySelectorAll(".approve-btn")
  
    if (approveButtons.length) {
      approveButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const row = this.closest("tr")
          const userName = row.querySelector("td:nth-child(3)").textContent
  
          showConfirmationModal("approve", `Are you sure you want to approve ${userName}?`, () => {
            const statusBadge = row.querySelector(".status-badge")
            if (statusBadge) {
              statusBadge.classList.remove("pending")
              statusBadge.classList.add("approved")
              statusBadge.textContent = "Approved"
            }
  
            showNotification(`${userName} has been approved successfully.`, "success")
          })
        })
      })
    }
  
    // Individual Reject Buttons
    const rejectButtons = document.querySelectorAll(".reject-btn")
  
    if (rejectButtons.length) {
      rejectButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const row = this.closest("tr")
          const userName = row.querySelector("td:nth-child(3)").textContent
  
          showConfirmationModal("reject", `Are you sure you want to reject ${userName}?`, () => {
            const statusBadge = row.querySelector(".status-badge")
            if (statusBadge) {
              statusBadge.classList.remove("pending")
              statusBadge.classList.add("rejected")
              statusBadge.textContent = "Rejected"
            }
  
            showNotification(`${userName} has been rejected.`, "success")
          })
        })
      })
    }
  
    // Message Buttons
    const messageButtons = document.querySelectorAll(".message-btn")
    const messageModal = document.getElementById("message-modal")
    const messageUserName = document.getElementById("message-user-name")
    const messageUserEmail = document.getElementById("message-user-email")
    const messageUserAvatar = document.getElementById("message-user-avatar")
    const cancelMessageBtn = document.getElementById("cancel-message-btn")
    const sendMessageBtn = document.getElementById("send-message-btn")
  
    if (messageButtons.length && messageModal) {
      messageButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const row = this.closest("tr")
          const userName = row.querySelector("td:nth-child(3)").textContent
          const userEmail = row.querySelector("td:nth-child(4)").textContent
          const userAvatar = row.querySelector(".user-avatar img").src
  
          // Set user details in the modal
          messageUserName.textContent = userName
          messageUserEmail.textContent = userEmail
          messageUserAvatar.src = userAvatar
  
          // Clear previous message
          document.getElementById("message-subject").value = ""
          document.getElementById("message-content").value = ""
  
          // Show the modal
          messageModal.classList.add("active")
        })
      })
    }
  
    // Cancel Message Button
    if (cancelMessageBtn) {
      cancelMessageBtn.addEventListener("click", () => {
        messageModal.classList.remove("active")
      })
    }
  
    // Send Message Button
    if (sendMessageBtn) {
      sendMessageBtn.addEventListener("click", () => {
        const userName = messageUserName.textContent
        const subject = document.getElementById("message-subject").value
        const content = document.getElementById("message-content").value
  
        if (!subject || !content) {
          showNotification("Please fill in all fields.", "error")
          return
        }
  
        // In a real application, you would send the message to the server here
  
        // Close the modal
        messageModal.classList.remove("active")
  
        // Show success notification
        showNotification(`Message sent to ${userName} successfully.`, "success")
      })
    }
  
    // Confirmation Modal
    const confirmationModal = document.getElementById("confirmation-modal")
    const confirmationMessage = document.getElementById("confirmation-message")
    const cancelActionBtn = document.getElementById("cancel-action-btn")
    const confirmActionBtn = document.getElementById("confirm-action-btn")
  
    function showConfirmationModal(action, message, callback) {
      if (confirmationModal && confirmationMessage) {
        confirmationMessage.textContent = message
  
        // Store the callback for the confirm button
        confirmActionBtn.onclick = () => {
          callback()
          confirmationModal.classList.remove("active")
        }
  
        // Show the modal
        confirmationModal.classList.add("active")
      }
    }
  
    // Cancel Action Button
    if (cancelActionBtn) {
      cancelActionBtn.addEventListener("click", () => {
        confirmationModal.classList.remove("active")
      })
    }
  
    // Close Modal Buttons
    const closeModalBtns = document.querySelectorAll(".close-modal-btn")
  
    if (closeModalBtns.length) {
      closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const modal = this.closest(".modal")
          if (modal) {
            modal.classList.remove("active")
          }
        })
      })
    }
  
    // Refresh Button
    const refreshBtn = document.getElementById("refresh-btn")
  
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        // In a real application, this would fetch updated data from the server
        showNotification("User list refreshed successfully.", "success")
      })
    }
  
    // Pagination
    const paginationPages = document.querySelectorAll(".pagination-page")
    const paginationBtns = document.querySelectorAll(".pagination-btn")
  
    if (paginationPages.length) {
      paginationPages.forEach((page) => {
        page.addEventListener("click", function () {
          paginationPages.forEach((p) => p.classList.remove("active"))
          this.classList.add("active")
  
          // Enable/disable previous/next buttons
          if (this.textContent === "1") {
            paginationBtns[0].setAttribute("disabled", "disabled")
          } else {
            paginationBtns[0].removeAttribute("disabled")
          }
  
          if (this.textContent === paginationPages.length.toString()) {
            paginationBtns[1].setAttribute("disabled", "disabled")
          } else {
            paginationBtns[1].removeAttribute("disabled")
          }
  
          // In a real application, this would fetch the corresponding page of users
          showNotification(`Navigated to page ${this.textContent}`, "info")
        })
      })
    }
  
    if (paginationBtns.length === 2) {
      // Previous button
      paginationBtns[0].addEventListener("click", function () {
        if (!this.hasAttribute("disabled")) {
          const activePage = document.querySelector(".pagination-page.active")
          const prevPage = activePage.previousElementSibling
  
          if (prevPage) {
            activePage.classList.remove("active")
            prevPage.classList.add("active")
  
            // Enable next button
            paginationBtns[1].removeAttribute("disabled")
  
            // Disable prev button if on first page
            if (prevPage.textContent === "1") {
              this.setAttribute("disabled", "disabled")
            }
  
            // In a real application, this would fetch the previous page of users
            showNotification(`Navigated to page ${prevPage.textContent}`, "info")
          }
        }
      })
  
      // Next button
      paginationBtns[1].addEventListener("click", function () {
        if (!this.hasAttribute("disabled")) {
          const activePage = document.querySelector(".pagination-page.active")
          const nextPage = activePage.nextElementSibling
  
          if (nextPage) {
            activePage.classList.remove("active")
            nextPage.classList.add("active")
  
            // Enable prev button
            paginationBtns[0].removeAttribute("disabled")
  
            // Disable next button if on last page
            if (nextPage.textContent === paginationPages.length.toString()) {
              this.setAttribute("disabled", "disabled")
            }
  
            // In a real application, this would fetch the next page of users
            showNotification(`Navigated to page ${nextPage.textContent}`, "info")
          }
        }
      })
    }
  
    // Notification System
    function showNotification(message, type = "info") {
      const notification = document.createElement("div")
      notification.className = `notification ${type}`
  
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
  
      const messageElement = document.createElement("div")
      messageElement.className = "notification-message"
      messageElement.textContent = message
  
      const closeBtn = document.createElement("button")
      closeBtn.className = "notification-close"
      closeBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
  
      notification.appendChild(icon)
      notification.appendChild(messageElement)
      notification.appendChild(closeBtn)
  
      if (!document.querySelector(".notifications-container")) {
        const container = document.createElement("div")
        container.className = "notifications-container"
        document.body.appendChild(container)
      }
  
      document.querySelector(".notifications-container").appendChild(notification)
  
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
          
          @media (max-width: 576px) {
            .notifications-container {
              right: 10px;
              left: 10px;
            }
            
            .notification {
              min-width: auto;
              max-width: none;
              width: 100%;
            }
          }
        `
        document.head.appendChild(style)
      }
  
      closeBtn.addEventListener("click", () => {
        closeNotification(notification)
      })
  
      setTimeout(() => {
        closeNotification(notification)
      }, 5000)
    }
  
    function closeNotification(notification) {
      notification.style.animation = "slideOut 0.3s ease forwards"
      setTimeout(() => {
        notification.remove()
  
        const container = document.querySelector(".notifications-container")
        if (container && container.children.length === 0) {
          container.remove()
        }
      }, 300)
    }
  
    // Initialize the page
    window.showNotification = showNotification
  })
  
  