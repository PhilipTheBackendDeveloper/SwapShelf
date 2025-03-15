document.addEventListener("DOMContentLoaded", () => {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById("sidebar-toggle")
    const sidebar = document.querySelector(".sidebar")
  
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active")
      })
    }
  
    // Select All Checkbox
    const selectAll = document.getElementById("select-all")
    const userCheckboxes = document.querySelectorAll(".user-select")
  
    if (selectAll) {
      selectAll.addEventListener("change", () => {
        userCheckboxes.forEach((checkbox) => {
          checkbox.checked = selectAll.checked
        })
        updateApproveAllButton()
      })
    }
  
    // Individual Checkboxes
    userCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateSelectAllCheckbox()
        updateApproveAllButton()
      })
    })
  
    function updateSelectAllCheckbox() {
      const allChecked = Array.from(userCheckboxes).every((checkbox) => checkbox.checked)
      const someChecked = Array.from(userCheckboxes).some((checkbox) => checkbox.checked)
  
      if (selectAll) {
        selectAll.checked = allChecked
        selectAll.indeterminate = someChecked && !allChecked
      }
    }
  
    function updateApproveAllButton() {
      const approveAllBtn = document.getElementById("approve-all")
      const anyChecked = Array.from(userCheckboxes).some((checkbox) => checkbox.checked)
  
      if (approveAllBtn) {
        approveAllBtn.disabled = !anyChecked
        approveAllBtn.style.opacity = anyChecked ? "1" : "0.5"
      }
    }
  
    // View User Details
    const viewButtons = document.querySelectorAll(".view")
    const userDetailsModal = document.getElementById("user-details-modal")
  
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const userId = this.getAttribute("data-id")
        openUserDetailsModal(userId)
      })
    })
  
    function openUserDetailsModal(userId) {
      // In a real application, you would fetch user details from the server
      // For this demo, we'll use hardcoded data
      const userData = {
        "001": {
          name: "John Doe",
          email: "johndoe@example.com",
          location: "New York, USA",
          phone: "+1 (555) 123-4567",
          ip: "192.168.1.1",
          regDate: "Mar 15, 2025",
          bio: "I'm an avid reader with a passion for science fiction and fantasy novels. I'm excited to join BookConnect to exchange books with fellow enthusiasts and discover new authors.",
          interests: ["Science Fiction", "Fantasy", "Mystery", "Biography"],
          img: "images/user1.jpg",
        },
        "002": {
          name: "Jane Smith",
          email: "janesmith@example.com",
          location: "London, UK",
          phone: "+44 20 1234 5678",
          ip: "192.168.1.2",
          regDate: "Mar 14, 2025",
          bio: "Book lover and literature student. I enjoy classic literature and poetry. Looking forward to sharing my collection and discovering new titles.",
          interests: ["Classics", "Poetry", "Romance", "Historical Fiction"],
          img: "images/user2.jpg",
        },
        "003": {
          name: "Mike Johnson",
          email: "mikejohnson@example.com",
          location: "Toronto, Canada",
          phone: "+1 (416) 123-4567",
          ip: "192.168.1.3",
          regDate: "Mar 13, 2025",
          bio: "Tech professional and non-fiction enthusiast. I collect books on technology, business, and personal development.",
          interests: ["Non-fiction", "Technology", "Business", "Self-help"],
          img: "images/user3.jpg",
        },
        "004": {
          name: "Sarah Williams",
          email: "sarahw@example.com",
          location: "Sydney, Australia",
          phone: "+61 2 1234 5678",
          ip: "192.168.1.4",
          regDate: "Mar 12, 2025",
          bio: "Passionate about children's literature and young adult fiction. I work as a school librarian and love to share reading recommendations.",
          interests: ["Children's Books", "Young Adult", "Educational", "Adventure"],
          img: "images/user4.jpg",
        },
        "005": {
          name: "David Lee",
          email: "davidlee@example.com",
          location: "Tokyo, Japan",
          phone: "+81 3 1234 5678",
          ip: "192.168.1.5",
          regDate: "Mar 11, 2025",
          bio: "Multilingual reader interested in international literature and translated works. I collect books in English, Japanese, and Korean.",
          interests: ["International", "Translated Works", "Cultural", "Literary Fiction"],
          img: "images/user5.jpg",
        },
      }
  
      const user = userData[userId]
  
      if (user) {
        document.getElementById("modal-user-name").textContent = user.name
        document.getElementById("modal-user-email").textContent = user.email
        document.getElementById("modal-user-location").innerHTML =
          `<i class="fas fa-map-marker-alt"></i> ${user.location}`
        document.getElementById("modal-user-id").textContent = userId
        document.getElementById("modal-reg-date").textContent = user.regDate
        document.getElementById("modal-user-phone").textContent = user.phone
        document.getElementById("modal-user-ip").textContent = user.ip
        document.getElementById("modal-user-bio").textContent = user.bio
        document.getElementById("modal-user-img").src = user.img
  
        const interestsContainer = document.getElementById("modal-user-interests")
        interestsContainer.innerHTML = ""
        user.interests.forEach((interest) => {
          const tag = document.createElement("span")
          tag.className = "interest-tag"
          tag.textContent = interest
          interestsContainer.appendChild(tag)
        })
  
        // Set up modal action buttons
        document.getElementById("modal-approve-btn").setAttribute("data-id", userId)
        document.getElementById("modal-reject-btn").setAttribute("data-id", userId)
  
        // Show the modal
        userDetailsModal.classList.add("active")
      }
    }
  
    // Approve User
    const approveButtons = document.querySelectorAll(".approve")
    const approveModal = document.getElementById("approve-modal")
  
    approveButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const userId = this.getAttribute("data-id")
        const userName = getUserNameById(userId)
        openApproveModal(userId, userName)
      })
    })
  
    document.getElementById("modal-approve-btn").addEventListener("click", function () {
      const userId = this.getAttribute("data-id")
      const userName = getUserNameById(userId)
      closeModal(userDetailsModal)
      openApproveModal(userId, userName)
    })
  
    function openApproveModal(userId, userName) {
      document.getElementById("approve-user-name").textContent = userName
      document.getElementById("approve-confirm-btn").setAttribute("data-id", userId)
      approveModal.classList.add("active")
    }
  
    document.getElementById("approve-confirm-btn").addEventListener("click", function () {
      const userId = this.getAttribute("data-id")
      const sendNotification = document.getElementById("approve-notify").checked
  
      // In a real application, you would send this data to the server
      approveUser(userId, sendNotification)
      closeModal(approveModal)
    })
  
    document.getElementById("approve-cancel-btn").addEventListener("click", () => {
      closeModal(approveModal)
    })
  
    function approveUser(userId, sendNotification) {
      const userName = getUserNameById(userId)
  
      // Update UI to reflect the approval
      const userRow = document.querySelector(`[data-id="${userId}"]`).closest("tr")
      if (userRow) {
        const statusCell = userRow.querySelector("td:nth-child(5)")
        if (statusCell) {
          statusCell.innerHTML = '<span class="badge approved">Approved</span>'
        }
  
        // Disable action buttons
        const actionButtons = userRow.querySelectorAll(".actions button")
        actionButtons.forEach((button) => {
          button.disabled = true
          button.style.opacity = "0.5"
        })
      }
  
      // Show success toast
      showToast(
        "success",
        "User Approved",
        `${userName} has been approved successfully${sendNotification ? " and notified via email" : ""}.`,
      )
  
      // Update stats
      updateStats("approve")
    }
  
    // Reject User
    const rejectButtons = document.querySelectorAll(".reject")
    const rejectModal = document.getElementById("reject-modal")
  
    rejectButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const userId = this.getAttribute("data-id")
        const userName = getUserNameById(userId)
        openRejectModal(userId, userName)
      })
    })
  
    document.getElementById("modal-reject-btn").addEventListener("click", function () {
      const userId = this.getAttribute("data-id")
      const userName = getUserNameById(userId)
      closeModal(userDetailsModal)
      openRejectModal(userId, userName)
    })
  
    function openRejectModal(userId, userName) {
      document.getElementById("reject-user-name").textContent = userName
      document.getElementById("reject-confirm-btn").setAttribute("data-id", userId)
      rejectModal.classList.add("active")
    }
  
    document.getElementById("reject-confirm-btn").addEventListener("click", function () {
      const userId = this.getAttribute("data-id")
      const reason = document.getElementById("rejection-reason").value
      const notes = document.getElementById("rejection-notes").value
      const sendNotification = document.getElementById("reject-notify").checked
  
      // In a real application, you would send this data to the server
      rejectUser(userId, reason, notes, sendNotification)
      closeModal(rejectModal)
    })
  
    document.getElementById("reject-cancel-btn").addEventListener("click", () => {
      closeModal(rejectModal)
    })
  
    function rejectUser(userId, reason, notes, sendNotification) {
      const userName = getUserNameById(userId)
  
      // Update UI to reflect the rejection
      const userRow = document.querySelector(`[data-id="${userId}"]`).closest("tr")
      if (userRow) {
        const statusCell = userRow.querySelector("td:nth-child(5)")
        if (statusCell) {
          statusCell.innerHTML = '<span class="badge rejected">Rejected</span>'
        }
  
        // Disable action buttons
        const actionButtons = userRow.querySelectorAll(".actions button")
        actionButtons.forEach((button) => {
          button.disabled = true
          button.style.opacity = "0.5"
        })
      }
  
      // Show success toast
      showToast(
        "error",
        "User Rejected",
        `${userName} has been rejected${sendNotification ? " and notified via email" : ""}.`,
      )
  
      // Update stats
      updateStats("reject")
    }
  
    // Approve All
    document.getElementById("approve-all").addEventListener("click", () => {
      const checkedUsers = Array.from(userCheckboxes).filter((checkbox) => checkbox.checked)
  
      if (checkedUsers.length > 0) {
        const userCount = checkedUsers.length
        showToast("info", "Batch Approval", `Processing approval for ${userCount} users...`)
  
        // Process each checked user
        checkedUsers.forEach((checkbox) => {
          const userRow = checkbox.closest("tr")
          const userId = userRow.querySelector(".actions button").getAttribute("data-id")
  
          // Simulate a delay for visual feedback
          setTimeout(() => {
            approveUser(userId, true)
          }, 500)
        })
  
        // Reset checkboxes
        selectAll.checked = false
        userCheckboxes.forEach((checkbox) => {
          checkbox.checked = false
        })
        updateApproveAllButton()
      }
    })
  
    // Close Modals
    const closeButtons = document.querySelectorAll(".close-modal")
    closeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const modal = this.closest(".modal")
        closeModal(modal)
      })
    })
  
    document.getElementById("modal-close-btn").addEventListener("click", () => {
      closeModal(userDetailsModal)
    })
  
    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal")) {
        closeModal(event.target)
      }
    })
  
    function closeModal(modal) {
      modal.classList.remove("active")
    }
  
    // Helper Functions
    function getUserNameById(userId) {
      const userRow = document.querySelector(`[data-id="${userId}"]`).closest("tr")
      if (userRow) {
        return userRow.querySelector(".user-name").textContent
      }
      return "User"
    }
  
    function showToast(type, title, message) {
      const toastContainer = document.getElementById("toast-container")
      const toast = document.createElement("div")
      toast.className = `toast ${type}`
  
      let iconClass = ""
      switch (type) {
        case "success":
          iconClass = "fa-check"
          break
        case "error":
          iconClass = "fa-times"
          break
        case "info":
          iconClass = "fa-info"
          break
      }
  
      toast.innerHTML = `
              <div class="toast-icon">
                  <i class="fas ${iconClass}"></i>
              </div>
              <div class="toast-content">
                  <div class="toast-title">${title}</div>
                  <div class="toast-message">${message}</div>
              </div>
              <button class="toast-close">
                  <i class="fas fa-times"></i>
              </button>
          `
  
      toastContainer.appendChild(toast)
  
      // Auto remove toast after 5 seconds
      setTimeout(() => {
        toast.style.opacity = "0"
        toast.style.transform = "translateX(100%)"
        setTimeout(() => {
          toast.remove()
        }, 300)
      }, 5000)
  
      // Close button
      toast.querySelector(".toast-close").addEventListener("click", () => {
        toast.style.opacity = "0"
        toast.style.transform = "translateX(100%)"
        setTimeout(() => {
          toast.remove()
        }, 300)
      })
    }
  
    function updateStats(action) {
      // Update the stats in the UI
      const cards = document.querySelectorAll(".summary-card")
  
      if (action === "approve") {
        const approvedCard = cards[1]
        if (approvedCard) {
          const valueElement = approvedCard.querySelector(".card-value")
          valueElement.textContent = Number.parseInt(valueElement.textContent) + 1
        }
      } else if (action === "reject") {
        const rejectedCard = cards[2]
        if (rejectedCard) {
          const valueElement = rejectedCard.querySelector(".card-value")
          valueElement.textContent = Number.parseInt(valueElement.textContent) + 1
        }
      }
  
      // Update pending count
      const pendingCard = cards[0]
      if (pendingCard) {
        const valueElement = pendingCard.querySelector(".card-value")
        valueElement.textContent = Number.parseInt(valueElement.textContent) - 1
      }
    }
  
    // Search Functionality
    const searchInput = document.getElementById("search-input")
    const searchButton = document.getElementById("search-button")
  
    if (searchInput && searchButton) {
      searchButton.addEventListener("click", () => {
        performSearch(searchInput.value)
      })
  
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          performSearch(searchInput.value)
        }
      })
    }
  
    function performSearch(query) {
      if (!query.trim()) return
  
      query = query.toLowerCase()
      const rows = document.querySelectorAll(".data-table tbody tr")
      let found = false
  
      rows.forEach((row) => {
        const name = row.querySelector(".user-name").textContent.toLowerCase()
        const email = row.querySelector("td:nth-child(3)").textContent.toLowerCase()
        const userId = row.querySelector(".user-id").textContent.toLowerCase()
  
        if (name.includes(query) || email.includes(query) || userId.includes(query)) {
          row.style.backgroundColor = "#fff7ed"
          found = true
  
          // Scroll to the row
          row.scrollIntoView({ behavior: "smooth", block: "center" })
  
          // Reset the highlight after 3 seconds
          setTimeout(() => {
            row.style.backgroundColor = ""
          }, 3000)
        }
      })
  
      if (!found) {
        showToast("info", "Search Results", "No users found matching your search criteria.")
      }
    }
  
    // Pagination
    const paginationButtons = document.querySelectorAll(".pagination-btn")
  
    paginationButtons.forEach((button) => {
      if (!button.classList.contains("active") && !button.disabled) {
        button.addEventListener("click", function () {
          // In a real application, you would fetch data for the selected page
          showToast("info", "Pagination", "This would navigate to a different page of results.")
  
          // Update active state
          document.querySelector(".pagination-btn.active").classList.remove("active")
          this.classList.add("active")
        })
      }
    })
  
    // Initialize
    updateApproveAllButton()
  })
  
  