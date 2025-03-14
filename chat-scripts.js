document.addEventListener("DOMContentLoaded", () => {
    // Toggle sidebar on mobile
    const backBtn = document.querySelector(".back-btn")
    const chatSidebar = document.querySelector(".chat-sidebar")
  
    if (backBtn && chatSidebar) {
      backBtn.addEventListener("click", () => {
        chatSidebar.classList.add("active")
      })
    }
  
    // Contact selection
    const contacts = document.querySelectorAll(".contact")
  
    if (contacts.length) {
      contacts.forEach((contact) => {
        contact.addEventListener("click", function () {
          // Hide sidebar on mobile after selecting a contact
          if (window.innerWidth <= 768) {
            chatSidebar.classList.remove("active")
          }
  
          // Set active contact
          contacts.forEach((c) => c.classList.remove("active"))
          this.classList.add("active")
  
          // Update chat header with contact info
          const contactName = this.querySelector("h4").textContent
          const contactAvatar = this.querySelector("img").src
          const contactStatus = this.querySelector(".status-indicator").classList.contains("online")
            ? "Online"
            : "Offline"
  
          const chatHeaderName = document.querySelector(".chat-user-info h3")
          const chatHeaderAvatar = document.querySelector(".chat-user-info img")
          const chatHeaderStatus = document.querySelector(".chat-user-info p")
  
          if (chatHeaderName && chatHeaderAvatar && chatHeaderStatus) {
            chatHeaderName.textContent = contactName
            chatHeaderAvatar.src = contactAvatar
            chatHeaderStatus.textContent =
              contactStatus === "Online" ? "Online • Last seen just now" : "Offline • Last seen 2h ago"
          }
  
          // Clear unread count
          const unreadCount = this.querySelector(".unread-count")
          if (unreadCount) {
            unreadCount.textContent = "0"
          }
        })
      })
    }
  
    // Chat tabs
    const tabBtns = document.querySelectorAll(".tab-btn")
  
    if (tabBtns.length) {
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const tabGroup = this.closest(".tabs") || this.closest(".chat-tabs")
          const tabBtnsInGroup = tabGroup.querySelectorAll(".tab-btn")
  
          tabBtnsInGroup.forEach((b) => b.classList.remove("active"))
          this.classList.add("active")
  
          // If this is in the modal, handle tab content
          if (this.closest(".modal")) {
            const tabId = this.getAttribute("data-tab")
            const tabContents = document.querySelectorAll(".tab-content")
  
            tabContents.forEach((content) => {
              content.classList.remove("active")
            })
  
            document.getElementById(`${tabId}-tab`).classList.add("active")
          }
        })
      })
    }
  
    // Send message
    const messageInput = document.querySelector(".message-input input")
    const sendBtn = document.querySelector(".send-btn")
  
    if (messageInput && sendBtn) {
      // Send on Enter key
      messageInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && this.value.trim() !== "") {
          sendMessage(this.value)
          this.value = ""
        }
      })
  
      // Send on button click
      sendBtn.addEventListener("click", () => {
        if (messageInput.value.trim() !== "") {
          sendMessage(messageInput.value)
          messageInput.value = ""
        }
      })
    }
  
    function sendMessage(text) {
      const chatMessages = document.querySelector(".chat-messages")
  
      if (chatMessages) {
        // Remove typing indicator if present
        const typingIndicator = document.querySelector(".typing-indicator")
        if (typingIndicator) {
          typingIndicator.remove()
        }
  
        // Create message element
        const messageEl = document.createElement("div")
        messageEl.className = "message sent"
  
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${hours >= 12 ? "PM" : "AM"}`
  
        messageEl.innerHTML = `
          <div class="message-content">
            <div class="message-bubble">
              <p>${text}</p>
            </div>
            <div class="message-meta">
              <span class="message-time">${formattedTime}</span>
              <span class="message-status">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
            </div>
          </div>
        `
  
        chatMessages.appendChild(messageEl)
  
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight
  
        // Simulate reply after a delay
        setTimeout(() => {
          simulateTyping()
  
          setTimeout(() => {
            sendReply()
          }, 2000)
        }, 1000)
      }
    }
  
    function simulateTyping() {
      const chatMessages = document.querySelector(".chat-messages")
  
      if (chatMessages) {
        const typingEl = document.createElement("div")
        typingEl.className = "typing-indicator"
        typingEl.innerHTML = `
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Michael is typing...</p>
        `
  
        chatMessages.appendChild(typingEl)
  
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }
  
    function sendReply() {
      const chatMessages = document.querySelector(".chat-messages")
  
      if (chatMessages) {
        // Remove typing indicator
        const typingIndicator = document.querySelector(".typing-indicator")
        if (typingIndicator) {
          typingIndicator.remove()
        }
  
        // Create reply message
        const replyEl = document.createElement("div")
        replyEl.className = "message received"
  
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${hours >= 12 ? "PM" : "AM"}`
  
        // Random replies
        const replies = [
          "That sounds great!",
          "I'm looking forward to our book swap.",
          "Thanks for the information.",
          "Perfect! I'll see you then.",
          "I have a few other books you might be interested in as well.",
          "Do you have any other books by F. Scott Fitzgerald?",
          "I've heard great things about that book!",
          "I can't wait to read it!",
        ]
  
        const randomReply = replies[Math.floor(Math.random() * replies.length)]
  
        replyEl.innerHTML = `
          <div class="message-avatar">
            <img src="https://via.placeholder.com/40" alt="Michael Chen">
          </div>
          <div class="message-content">
            <div class="message-bubble">
              <p>${randomReply}</p>
            </div>
            <div class="message-meta">
              <span class="message-time">${formattedTime}</span>
            </div>
          </div>
        `
  
        chatMessages.appendChild(replyEl)
  
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }
  
    // Book sharing modal
    const shareBookBtn = document.querySelector('.input-action-btn[title="Share Book"]')
    const bookShareModal = document.getElementById("book-share-modal")
    const closeModalBtns = document.querySelectorAll(".close-modal-btn")
    const cancelShareBtn = document.getElementById("cancel-share")
  
    if (shareBookBtn && bookShareModal) {
      shareBookBtn.addEventListener("click", () => {
        bookShareModal.classList.add("active")
      })
    }
  
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
  
    if (cancelShareBtn) {
      cancelShareBtn.addEventListener("click", () => {
        bookShareModal.classList.remove("active")
      })
    }
  
    // Book selection from grid
    const bookItems = document.querySelectorAll(".book-item")
    const shareBookModalBtn = document.getElementById("share-book")
  
    if (bookItems.length && shareBookModalBtn) {
      bookItems.forEach((book) => {
        const shareBtn = book.querySelector(".btn")
  
        if (shareBtn) {
          shareBtn.addEventListener("click", (e) => {
            e.preventDefault()
  
            // Get book details
            const bookTitle = book.querySelector("h5").textContent
            const bookAuthor = book.querySelector("p").textContent
            const bookImage = book.querySelector("img").src
  
            // Close modal
            bookShareModal.classList.remove("active")
  
            // Share book in chat
            shareBookInChat(bookTitle, bookAuthor, bookImage)
          })
        }
      })
  
      // Share button in modal
      shareBookModalBtn.addEventListener("click", () => {
        // For the upload tab
        const activeTab = document.querySelector(".tab-content.active")
  
        if (activeTab.id === "upload-book-tab") {
          const title = document.getElementById("book-title").value
          const author = document.getElementById("book-author").value
  
          if (title && author) {
            // Close modal
            bookShareModal.classList.remove("active")
  
            // Share book in chat
            shareBookInChat(title, author, "https://via.placeholder.com/200x300")
  
            // Reset form
            document.getElementById("book-title").value = ""
            document.getElementById("book-author").value = ""
          } else {
            alert("Please enter book title and author")
          }
        } else {
          // If no book is selected, use the first one
          const firstBook = bookItems[0]
          const bookTitle = firstBook.querySelector("h5").textContent
          const bookAuthor = firstBook.querySelector("p").textContent
          const bookImage = firstBook.querySelector("img").src
  
          // Close modal
          bookShareModal.classList.remove("active")
  
          // Share book in chat
          shareBookInChat(bookTitle, bookAuthor, bookImage)
        }
      })
    }
  
    function shareBookInChat(title, author, image) {
      const chatMessages = document.querySelector(".chat-messages")
  
      if (chatMessages) {
        // Create message element
        const messageEl = document.createElement("div")
        messageEl.className = "message sent"
  
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${hours >= 12 ? "PM" : "AM"}`
  
        messageEl.innerHTML = `
          <div class="message-content">
            <div class="message-bubble book-share">
              <div class="book-image">
                <img src="${image}" alt="${title}">
              </div>
              <div class="book-details">
                <h4>${title}</h4>
                <p class="book-author">${author}</p>
                <div class="book-condition">
                  <span class="condition-label">Condition:</span>
                  <span class="condition-value excellent">Excellent</span>
                </div>
                <div class="book-availability">
                  <span class="availability-indicator available"></span>
                  <span>Available for swap</span>
                </div>
              </div>
            </div>
            <div class="message-meta">
              <span class="message-time">${formattedTime}</span>
              <span class="message-status">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
            </div>
          </div>
        `
  
        chatMessages.appendChild(messageEl)
  
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }
  
    // Upload area functionality
    const uploadArea = document.querySelector(".upload-area")
    const fileInput = document.getElementById("book-image-upload")
  
    if (uploadArea && fileInput) {
      uploadArea.addEventListener("click", () => {
        fileInput.click()
      })
  
      // Handle drag and drop
      ;["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        uploadArea.addEventListener(eventName, preventDefaults, false)
      })
  
      function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
      }
      ;["dragenter", "dragover"].forEach((eventName) => {
        uploadArea.addEventListener(eventName, highlight, false)
      })
      ;["dragleave", "drop"].forEach((eventName) => {
        uploadArea.addEventListener(eventName, unhighlight, false)
      })
  
      function highlight() {
        uploadArea.classList.add("highlight")
      }
  
      function unhighlight() {
        uploadArea.classList.remove("highlight")
      }
  
      uploadArea.addEventListener("drop", handleDrop, false)
  
      function handleDrop(e) {
        const dt = e.dataTransfer
        const files = dt.files
  
        if (files.length) {
          fileInput.files = files
          handleFiles(files)
        }
      }
  
      fileInput.addEventListener("change", function () {
        handleFiles(this.files)
      })
  
      function handleFiles(files) {
        if (files.length) {
          const file = files[0]
  
          // Check if file is an image
          if (!file.type.match("image.*")) {
            alert("Please select an image file")
            return
          }
  
          // Display preview
          const reader = new FileReader()
  
          reader.onload = (e) => {
            uploadArea.innerHTML = `
              <img src="${e.target.result}" alt="Book Cover" style="max-width: 100%; max-height: 200px;">
            `
          }
  
          reader.readAsDataURL(file)
        }
      }
    }
  
    // Book sidebar toggle
    const closeSidebarBtn = document.querySelector(".close-sidebar-btn")
    const bookSidebar = document.querySelector(".book-sidebar")
  
    if (closeSidebarBtn && bookSidebar) {
      closeSidebarBtn.addEventListener("click", () => {
        bookSidebar.style.display = "none"
      })
    }
  
    // Swap action buttons
    const completeSwapBtn = document.querySelector(".swap-actions .btn-primary")
    const cancelSwapBtn = document.querySelector(".swap-actions .btn-outline")
  
    if (completeSwapBtn) {
      completeSwapBtn.addEventListener("click", function () {
        alert("Swap completed successfully!")
  
        // Update swap status
        const statusBadge = document.querySelector(".status-badge")
        if (statusBadge) {
          statusBadge.className = "status-badge completed"
          statusBadge.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>Swap Completed</span>
          `
        }
  
        const statusDescription = document.querySelector(".status-description")
        if (statusDescription) {
          statusDescription.textContent = "Books exchanged on March 17, 2025"
        }
  
        // Update timeline
        const timelineItems = document.querySelectorAll(".timeline-item")
        if (timelineItems.length) {
          timelineItems.forEach((item) => {
            const icon = item.querySelector(".timeline-icon")
            if (icon) {
              icon.className = "timeline-icon completed"
              icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
            }
  
            const content = item.querySelector(".timeline-content p")
            if (content && content.textContent === "Pending") {
              const now = new Date()
              content.textContent = `March ${now.getDate()}, 2025`
            }
          })
        }
  
        // Disable buttons
        this.disabled = true
        if (cancelSwapBtn) {
          cancelSwapBtn.disabled = true
        }
      })
    }
  
    if (cancelSwapBtn) {
      cancelSwapBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to cancel this swap?")) {
          alert("Swap cancelled")
  
          // Update swap status
          const statusBadge = document.querySelector(".status-badge")
          if (statusBadge) {
            statusBadge.className = "status-badge cancelled"
            statusBadge.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              <span>Swap Cancelled</span>
            `
          }
  
          const statusDescription = document.querySelector(".status-description")
          if (statusDescription) {
            statusDescription.textContent = "This swap has been cancelled"
          }
  
          // Disable buttons
          this.disabled = true
          if (completeSwapBtn) {
            completeSwapBtn.disabled = true
          }
        }
      })
    }
  
    // Add highlight class for upload area
    document.head.insertAdjacentHTML(
      "beforeend",
      `
      <style>
        .upload-area.highlight {
          border-color: var(--primary-color);
          background-color: rgba(234, 164, 81, 0.1);
        }
      </style>
    `,
    )
  
    // Initialize the chat interface
    function initChat() {
      // Scroll chat to bottom on load
      const chatMessages = document.querySelector(".chat-messages")
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
  
      // Set active contact
      const firstContact = document.querySelector(".contact")
      if (firstContact) {
        firstContact.classList.add("active")
      }
  
      // Show book sidebar on larger screens
      if (window.innerWidth > 1200) {
        const bookSidebar = document.querySelector(".book-sidebar")
        if (bookSidebar) {
          bookSidebar.style.display = "flex"
        }
      }
    }
  
    // Run initialization
    initChat()
  
    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        const chatSidebar = document.querySelector(".chat-sidebar")
        if (chatSidebar) {
          chatSidebar.style.display = "flex"
        }
      }
    })
  })
  
  