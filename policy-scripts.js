document.addEventListener("DOMContentLoaded", () => {
    // Sidebar Toggle
    const sidebarToggle = document.querySelector(".sidebar-toggle")
    const adminSidebar = document.querySelector(".admin-sidebar")
  
    if (sidebarToggle && adminSidebar) {
      sidebarToggle.addEventListener("click", () => {
        adminSidebar.classList.toggle("active")
      })
    }
  
    // Filter Reset
    const filterReset = document.querySelector(".filter-reset")
    const filterSelects = document.querySelectorAll(".content-filters select")
  
    if (filterReset && filterSelects.length) {
      filterReset.addEventListener("click", () => {
        filterSelects.forEach((select) => {
          select.selectedIndex = 0
        })
      })
    }
  
    // Policy Card Actions
    const viewButtons = document.querySelectorAll(".view-btn")
    const deleteButtons = document.querySelectorAll(".delete-btn")
  
    if (viewButtons.length) {
      viewButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const policyCard = this.closest(".policy-card")
          const policyTitle = policyCard.querySelector("h3").textContent
          const policyContent = policyCard.querySelector(".policy-card-body p").textContent
  
          alert(`Viewing policy: ${policyTitle}\n\n${policyContent}`)
        })
      })
    }
  
    if (deleteButtons.length) {
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const policyCard = this.closest(".policy-card")
          const policyTitle = policyCard.querySelector("h3").textContent
  
          if (confirm(`Are you sure you want to delete the policy "${policyTitle}"? This action cannot be undone.`)) {
            policyCard.remove()
            showNotification(`Policy "${policyTitle}" has been deleted.`, "success")
          }
        })
      })
    }
  
    // Pagination
    const paginationPages = document.querySelectorAll(".pagination-page")
  
    if (paginationPages.length) {
      paginationPages.forEach((page) => {
        page.addEventListener("click", function () {
          paginationPages.forEach((p) => p.classList.remove("active"))
          this.classList.add("active")
        })
      })
    }
  
    // Initialize Quill Editor if on editor page
    if (document.getElementById("editor")) {
      const quill = new Quill("#editor", {
        theme: "snow",
        modules: {
          toolbar: false, // We're using our custom toolbar
        },
      })
  
      // Connect custom toolbar to Quill
      const toolbarButtons = document.querySelectorAll(".toolbar-btn")
  
      toolbarButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const format = this.getAttribute("title")
  
          if (format === "Bold") {
            quill.format("bold", !quill.getFormat().bold)
          } else if (format === "Italic") {
            quill.format("italic", !quill.getFormat().italic)
          } else if (format === "Underline") {
            quill.format("underline", !quill.getFormat().underline)
          } else if (format === "Heading 1") {
            quill.format("header", 1)
          } else if (format === "Heading 2") {
            quill.format("header", 2)
          } else if (format === "Heading 3") {
            quill.format("header", 3)
          } else if (format === "Bulleted List") {
            quill.format("list", "bullet")
          } else if (format === "Numbered List") {
            quill.format("list", "ordered")
          } else if (format === "Insert Link") {
            const url = prompt("Enter link URL:")
            if (url) {
              const range = quill.getSelection()
              if (range) {
                quill.format("link", url)
              }
            }
          } else if (format === "Insert Image") {
            const url = prompt("Enter image URL:")
            if (url) {
              const range = quill.getSelection()
              if (range) {
                quill.insertEmbed(range.index, "image", url)
              }
            }
          } else if (format === "Insert Table") {
            alert("Table insertion is not implemented in this demo.")
          }
        })
      })
  
      // Preview Button
      const previewBtn = document.getElementById("preview-btn")
      const previewModal = document.getElementById("preview-modal")
      const previewTitle = document.getElementById("preview-title")
      const previewDate = document.getElementById("preview-date")
      const previewContent = document.getElementById("preview-content")
  
      if (previewBtn && previewModal) {
        previewBtn.addEventListener("click", () => {
          const policyTitle = document.getElementById("policy-title").value
          const effectiveDate = document.getElementById("effective-date").value
          const formattedDate = new Date(effectiveDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
  
          previewTitle.textContent = policyTitle
          previewDate.textContent = formattedDate
          previewContent.innerHTML = quill.root.innerHTML
  
          previewModal.classList.add("active")
        })
      }
  
      // Save Draft Button
      const saveDraftBtn = document.getElementById("save-draft-btn")
  
      if (saveDraftBtn) {
        saveDraftBtn.addEventListener("click", function () {
          const policyTitle = document.getElementById("policy-title").value
  
          // Simulate saving
          this.disabled = true
          this.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path></svg> Saving...'
  
          setTimeout(() => {
            this.disabled = false
            this.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save Draft'
  
            document.getElementById("policy-status").value = "draft"
            showNotification(`Policy "${policyTitle}" has been saved as a draft.`, "success")
          }, 1500)
        })
      }
  
      // Publish Button
      const publishBtn = document.getElementById("publish-btn")
      const publishModal = document.getElementById("publish-modal")
  
      if (publishBtn && publishModal) {
        publishBtn.addEventListener("click", () => {
          publishModal.classList.add("active")
        })
      }
  
      // Confirm Publish Button
      const confirmPublishBtn = document.getElementById("confirm-publish")
  
      if (confirmPublishBtn) {
        confirmPublishBtn.addEventListener("click", function () {
          const policyTitle = document.getElementById("policy-title").value
  
          // Simulate publishing
          this.disabled = true
          this.textContent = "Publishing..."
  
          setTimeout(() => {
            this.disabled = false
            this.textContent = "Publish"
  
            document.getElementById("policy-status").value = "published"
            publishModal.classList.remove("active")
  
            showNotification(`Policy "${policyTitle}" has been published successfully.`, "success")
          }, 1500)
        })
      }
  
      // Publish from Preview Button
      const publishFromPreviewBtn = document.getElementById("publish-from-preview")
  
      if (publishFromPreviewBtn) {
        publishFromPreviewBtn.addEventListener("click", () => {
          previewModal.classList.remove("active")
          publishModal.classList.add("active")
        })
      }
  
      // Close Modals
      const modalCloseButtons = document.querySelectorAll(".modal-close")
      const modals = document.querySelectorAll(".modal")
  
      if (modalCloseButtons.length && modals.length) {
        modalCloseButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const modal = this.closest(".modal")
            modal.classList.remove("active")
          })
        })
  
        modals.forEach((modal) => {
          modal.addEventListener("click", function (e) {
            if (e.target === this) {
              this.classList.remove("active")
            }
          })
        })
      }
  
      // Version History
      const versionItems = document.querySelectorAll(".version-item")
  
      if (versionItems.length) {
        versionItems.forEach((item) => {
          item.addEventListener("click", function () {
            versionItems.forEach((v) => v.classList.remove("active"))
            this.classList.add("active")
  
            const versionNumber = this.querySelector(".version-number").textContent
            showNotification(`Loaded version ${versionNumber} for editing.`, "info")
          })
        })
      }
    }
  
    // Notification System
    window.showNotification = (message, type = "info") => {
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
  })
  
  