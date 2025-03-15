document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const sidebar = document.querySelector(".sidebar")
    const sidebarToggle = document.getElementById("sidebar-toggle")
    const gridViewBtn = document.getElementById("grid-view")
    const listViewBtn = document.getElementById("list-view")
    const booksGrid = document.getElementById("books-grid")
    const booksList = document.getElementById("books-list")
    const statusFilter = document.getElementById("status-filter")
    const dateFilter = document.getElementById("date-filter")
    const genreFilter = document.getElementById("genre-filter")
    const searchInput = document.getElementById("search-books")
    const selectAllCheckbox = document.getElementById("select-all")
    const selectAllListCheckbox = document.getElementById("select-all-list")
    const approveSelectedBtn = document.getElementById("approve-selected")
    const rejectSelectedBtn = document.getElementById("reject-selected")
    const bookDetailsModal = document.getElementById("book-details-modal")
    const confirmationModal = document.getElementById("confirmation-modal")
    const closeModalBtns = document.querySelectorAll(".close-modal")
    const confirmCancelBtn = document.getElementById("confirm-cancel")
    const confirmActionBtn = document.getElementById("confirm-action")
  
    // Sample book data (in a real application, this would come from a database)
    const books = [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        cover: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
        status: "pending",
        submittedDate: "2025-03-12",
        isbn: "9780743273565",
        publisher: "Scribner",
        publicationDate: "1925-04-10",
        pages: 180,
        submitter: "user123@example.com",
        description:
          "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        cover: "https://covers.openlibrary.org/b/id/12749873-L.jpg",
        status: "approved",
        submittedDate: "2025-03-10",
        approvedDate: "2025-03-10",
        isbn: "9780061120084",
        publisher: "HarperCollins",
        publicationDate: "1960-07-11",
        pages: 281,
        submitter: "user456@example.com",
        description:
          "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on Lee's observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was 10 years old.",
      },
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction",
        cover: "https://covers.openlibrary.org/b/id/12547191-L.jpg",
        status: "rejected",
        submittedDate: "2025-03-08",
        rejectedDate: "2025-03-08",
        isbn: "9780451524935",
        publisher: "Signet Classics",
        publicationDate: "1949-06-08",
        pages: 328,
        submitter: "user789@example.com",
        description:
          "1984 is a dystopian novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime. Thematically, 1984 centres on the consequences of totalitarianism, mass surveillance, and repressive regimentation of persons and behaviours within society.",
      },
    ]
  
    // Initialize counters
    updateCounters()
  
    // Sidebar Toggle
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed")
    })
  
    // View Toggle
    gridViewBtn.addEventListener("click", () => {
      gridViewBtn.classList.add("active")
      listViewBtn.classList.remove("active")
      booksGrid.style.display = "grid"
      booksList.style.display = "none"
    })
  
    listViewBtn.addEventListener("click", () => {
      listViewBtn.classList.add("active")
      gridViewBtn.classList.remove("active")
      booksList.style.display = "block"
      booksGrid.style.display = "none"
    })
  
    // Filters
    statusFilter.addEventListener("change", filterBooks)
    dateFilter.addEventListener("change", filterBooks)
    genreFilter.addEventListener("change", filterBooks)
    searchInput.addEventListener("input", filterBooks)
  
    // Select All Checkboxes
    selectAllCheckbox.addEventListener("change", () => {
      const checkboxes = document.querySelectorAll("#books-grid .book-checkbox")
      checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked
      })
      updateSelectedCount()
      updateBatchActionButtons()
    })
  
    selectAllListCheckbox.addEventListener("change", () => {
      const checkboxes = document.querySelectorAll("#books-list .book-checkbox")
      checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllListCheckbox.checked
      })
      updateSelectedCount()
      updateBatchActionButtons()
    })
  
    // Book Checkboxes
    document.addEventListener("change", (e) => {
      if (e.target.classList.contains("book-checkbox")) {
        updateSelectedCount()
        updateBatchActionButtons()
      }
    })
  
    // Book Action Buttons
    document.addEventListener("click", (e) => {
      // View Book Details
      if (e.target.closest(".btn-view")) {
        const bookId = e.target.closest(".btn-view").dataset.id
        openBookDetailsModal(bookId)
      }
  
      // Approve Book
      if (e.target.closest(".btn-approve")) {
        const bookId = e.target.closest(".btn-approve").dataset.id
        openConfirmationModal("Approve Book", "Are you sure you want to approve this book?", () => {
          approveBook(bookId)
        })
      }
  
      // Reject Book
      if (e.target.closest(".btn-reject")) {
        const bookId = e.target.closest(".btn-reject").dataset.id
        openConfirmationModal("Reject Book", "Are you sure you want to reject this book?", () => {
          rejectBook(bookId)
        })
      }
    })
  
    // Batch Action Buttons
    approveSelectedBtn.addEventListener("click", () => {
      const selectedBooks = getSelectedBooks()
      if (selectedBooks.length > 0) {
        openConfirmationModal(
          "Approve Selected Books",
          `Are you sure you want to approve ${selectedBooks.length} books?`,
          () => {
            approveSelectedBooks()
          },
        )
      }
    })
  
    rejectSelectedBtn.addEventListener("click", () => {
      const selectedBooks = getSelectedBooks()
      if (selectedBooks.length > 0) {
        openConfirmationModal(
          "Reject Selected Books",
          `Are you sure you want to reject ${selectedBooks.length} books?`,
          () => {
            rejectSelectedBooks()
          },
        )
      }
    })
  
    // Modal Actions
    document.getElementById("modal-approve-btn").addEventListener("click", function () {
      const bookId = this.dataset.bookId
      openConfirmationModal("Approve Book", "Are you sure you want to approve this book?", () => {
        approveBook(bookId)
        closeModal(bookDetailsModal)
      })
    })
  
    document.getElementById("modal-reject-btn").addEventListener("click", function () {
      const bookId = this.dataset.bookId
      openConfirmationModal("Reject Book", "Are you sure you want to reject this book?", () => {
        rejectBook(bookId)
        closeModal(bookDetailsModal)
      })
    })
  
    document.getElementById("modal-approve-rejected-btn").addEventListener("click", function () {
      const bookId = this.dataset.bookId
      openConfirmationModal("Approve Book", "Are you sure you want to approve this previously rejected book?", () => {
        approveBook(bookId)
        closeModal(bookDetailsModal)
      })
    })
  
    document.getElementById("modal-reject-approved-btn").addEventListener("click", function () {
      const bookId = this.dataset.bookId
      openConfirmationModal("Reject Book", "Are you sure you want to reject this previously approved book?", () => {
        rejectBook(bookId)
        closeModal(bookDetailsModal)
      })
    })
  
    // Close Modals
    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const modal = this.closest(".modal")
        closeModal(modal)
      })
    })
  
    confirmCancelBtn.addEventListener("click", () => {
      closeModal(confirmationModal)
    })
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        closeModal(e.target)
      }
    })
  
    // Functions
    function filterBooks() {
      const status = statusFilter.value
      const date = dateFilter.value
      const genre = genreFilter.value
      const searchTerm = searchInput.value.toLowerCase()
  
      const bookCards = document.querySelectorAll(".book-card")
      const tableRows = document.querySelectorAll("#books-list tbody tr")
  
      // Filter grid view
      bookCards.forEach((card) => {
        const cardStatus = card.dataset.status
        const cardTitle = card.querySelector(".book-title").textContent.toLowerCase()
        const cardAuthor = card.querySelector(".book-author").textContent.toLowerCase()
        const cardGenre = card.querySelector(".book-genre").textContent.toLowerCase()
  
        const statusMatch = status === "all" || cardStatus === status
        const genreMatch = genre === "all" || cardGenre.includes(genre.toLowerCase())
        const searchMatch = cardTitle.includes(searchTerm) || cardAuthor.includes(searchTerm)
  
        // Date filtering would be more complex in a real app
        const dateMatch = true
  
        if (statusMatch && genreMatch && dateMatch && searchMatch) {
          card.style.display = ""
        } else {
          card.style.display = "none"
        }
      })
  
      // Filter list view
      tableRows.forEach((row) => {
        const rowStatus = row.dataset.status
        const rowTitle = row.cells[2].textContent.toLowerCase()
        const rowAuthor = row.cells[3].textContent.toLowerCase()
        const rowGenre = row.cells[4].textContent.toLowerCase()
  
        const statusMatch = status === "all" || rowStatus === status
        const genreMatch = genre === "all" || rowGenre.includes(genre.toLowerCase())
        const searchMatch = rowTitle.includes(searchTerm) || rowAuthor.includes(searchTerm)
  
        // Date filtering would be more complex in a real app
        const dateMatch = true
  
        if (statusMatch && genreMatch && dateMatch && searchMatch) {
          row.style.display = ""
        } else {
          row.style.display = "none"
        }
      })
    }
  
    function updateSelectedCount() {
      const selectedBooks = getSelectedBooks()
      const selectedCount = document.getElementById("selected-count")
      selectedCount.textContent = `${selectedBooks.length} books selected`
    }
  
    function updateBatchActionButtons() {
      const selectedBooks = getSelectedBooks()
      approveSelectedBtn.disabled = selectedBooks.length === 0
      rejectSelectedBtn.disabled = selectedBooks.length === 0
    }
  
    function getSelectedBooks() {
      const checkboxes = document.querySelectorAll(".book-checkbox:checked")
      return Array.from(checkboxes).map((checkbox) => {
        return checkbox.closest(".book-card") || checkbox.closest("tr")
      })
    }
  
    function openBookDetailsModal(bookId) {
      const book = books.find((b) => b.id == bookId)
      if (!book) return
  
      // Populate modal with book details
      document.getElementById("modal-book-cover").src = book.cover
      document.getElementById("modal-book-status").className = `book-status ${book.status}`
      document.getElementById("modal-book-status").textContent =
        book.status.charAt(0).toUpperCase() + book.status.slice(1)
      document.getElementById("modal-book-title").textContent = book.title
      document.getElementById("modal-book-author").textContent = book.author
      document.getElementById("modal-book-genre").textContent = book.genre
      document.getElementById("modal-book-isbn").textContent = book.isbn
      document.getElementById("modal-book-publisher").textContent = book.publisher
      document.getElementById("modal-book-pub-date").textContent = formatDate(book.publicationDate)
      document.getElementById("modal-book-pages").textContent = book.pages
      document.getElementById("modal-book-submitter").textContent = book.submitter
      document.getElementById("modal-book-submit-date").textContent = formatDate(book.submittedDate)
      document.getElementById("modal-book-description").textContent = book.description
  
      // Set action buttons based on status
      document.getElementById("modal-pending-actions").style.display = book.status === "pending" ? "flex" : "none"
      document.getElementById("modal-approved-actions").style.display = book.status === "approved" ? "flex" : "none"
      document.getElementById("modal-rejected-actions").style.display = book.status === "rejected" ? "flex" : "none"
  
      // Set book ID for action buttons
      document.getElementById("modal-approve-btn").dataset.bookId = bookId
      document.getElementById("modal-reject-btn").dataset.bookId = bookId
      document.getElementById("modal-approve-rejected-btn").dataset.bookId = bookId
      document.getElementById("modal-reject-approved-btn").dataset.bookId = bookId
  
      // Clear admin review
      document.getElementById("admin-review").value = ""
  
      // Open modal
      bookDetailsModal.style.display = "block"
    }
  
    function openConfirmationModal(title, message, confirmAction) {
      document.getElementById("confirmation-title").textContent = title
      document.getElementById("confirmation-message").textContent = message
  
      // Set confirm action
      confirmActionBtn.onclick = () => {
        confirmAction()
        closeModal(confirmationModal)
      }
  
      // Open modal
      confirmationModal.style.display = "block"
    }
  
    function closeModal(modal) {
      modal.style.display = "none"
    }
  
    function approveBook(bookId) {
      // In a real app, this would send an API request
      const book = books.find((b) => b.id == bookId)
      if (book) {
        book.status = "approved"
        book.approvedDate = new Date().toISOString().split("T")[0]
  
        // Update UI
        updateBookUI(bookId, "approved")
        updateCounters()
  
        // Show toast notification
        showToast("success", `"${book.title}" has been approved.`)
      }
    }
  
    function rejectBook(bookId) {
      // In a real app, this would send an API request
      const book = books.find((b) => b.id == bookId)
      if (book) {
        book.status = "rejected"
        book.rejectedDate = new Date().toISOString().split("T")[0]
  
        // Update UI
        updateBookUI(bookId, "rejected")
        updateCounters()
  
        // Show toast notification
        showToast("error", `"${book.title}" has been rejected.`)
      }
    }
  
    function approveSelectedBooks() {
      const selectedElements = getSelectedBooks()
      const selectedIds = selectedElements.map((el) => el.dataset.id)
  
      let approvedCount = 0
      selectedIds.forEach((id) => {
        const book = books.find((b) => b.id == id)
        if (book && book.status !== "approved") {
          book.status = "approved"
          book.approvedDate = new Date().toISOString().split("T")[0]
          updateBookUI(id, "approved")
          approvedCount++
        }
      })
  
      // Update UI
      updateCounters()
      resetSelection()
  
      // Show toast notification
      if (approvedCount > 0) {
        showToast("success", `${approvedCount} books have been approved.`)
      }
    }
  
    function rejectSelectedBooks() {
      const selectedElements = getSelectedBooks()
      const selectedIds = selectedElements.map((el) => el.dataset.id)
  
      let rejectedCount = 0
      selectedIds.forEach((id) => {
        const book = books.find((b) => b.id == id)
        if (book && book.status !== "rejected") {
          book.status = "rejected"
          book.rejectedDate = new Date().toISOString().split("T")[0]
          updateBookUI(id, "rejected")
          rejectedCount++
        }
      })
  
      // Update UI
      updateCounters()
      resetSelection()
  
      // Show toast notification
      if (rejectedCount > 0) {
        showToast("error", `${rejectedCount} books have been rejected.`)
      }
    }
  
    function updateBookUI(bookId, newStatus) {
      // Update grid view
      const bookCard = document.querySelector(`.book-card[data-id="${bookId}"]`)
      if (bookCard) {
        bookCard.dataset.status = newStatus
        const statusElement = bookCard.querySelector(".book-status")
        statusElement.className = `book-status ${newStatus}`
        statusElement.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
  
        // Update action buttons
        const actions = bookCard.querySelector(".book-actions")
        actions.innerHTML = ""
  
        const viewBtn = document.createElement("button")
        viewBtn.className = "action-btn btn-view"
        viewBtn.dataset.id = bookId
        viewBtn.title = "View Details"
        viewBtn.innerHTML = '<i class="fas fa-eye"></i>'
        actions.appendChild(viewBtn)
  
        if (newStatus !== "approved") {
          const approveBtn = document.createElement("button")
          approveBtn.className = "action-btn btn-approve"
          approveBtn.dataset.id = bookId
          approveBtn.title = "Approve Book"
          approveBtn.innerHTML = '<i class="fas fa-check"></i>'
          actions.appendChild(approveBtn)
        }
  
        if (newStatus !== "rejected") {
          const rejectBtn = document.createElement("button")
          rejectBtn.className = "action-btn btn-reject"
          rejectBtn.dataset.id = bookId
          rejectBtn.title = "Reject Book"
          rejectBtn.innerHTML = '<i class="fas fa-times"></i>'
          actions.appendChild(rejectBtn)
        }
      }
  
      // Update list view
      const tableRow = document.querySelector(`#books-list tr[data-id="${bookId}"]`)
      if (tableRow) {
        tableRow.dataset.status = newStatus
        const statusBadge = tableRow.querySelector(".status-badge")
        statusBadge.className = `status-badge ${newStatus}`
        statusBadge.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
  
        // Update action buttons
        const actions = tableRow.querySelector(".table-actions")
        actions.innerHTML = ""
  
        const viewBtn = document.createElement("button")
        viewBtn.className = "action-btn btn-view"
        viewBtn.dataset.id = bookId
        viewBtn.title = "View Details"
        viewBtn.innerHTML = '<i class="fas fa-eye"></i>'
        actions.appendChild(viewBtn)
  
        if (newStatus !== "approved") {
          const approveBtn = document.createElement("button")
          approveBtn.className = "action-btn btn-approve"
          approveBtn.dataset.id = bookId
          approveBtn.title = "Approve Book"
          approveBtn.innerHTML = '<i class="fas fa-check"></i>'
          actions.appendChild(approveBtn)
        }
  
        if (newStatus !== "rejected") {
          const rejectBtn = document.createElement("button")
          rejectBtn.className = "action-btn btn-reject"
          rejectBtn.dataset.id = bookId
          rejectBtn.title = "Reject Book"
          rejectBtn.innerHTML = '<i class="fas fa-times"></i>'
          actions.appendChild(rejectBtn)
        }
      }
    }
  
    function resetSelection() {
      selectAllCheckbox.checked = false
      selectAllListCheckbox.checked = false
  
      const checkboxes = document.querySelectorAll(".book-checkbox")
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false
      })
  
      updateSelectedCount()
      updateBatchActionButtons()
    }
  
    function updateCounters() {
      const pendingCount = books.filter((book) => book.status === "pending").length
      const approvedCount = books.filter((book) => book.status === "approved").length
      const rejectedCount = books.filter((book) => book.status === "rejected").length
      const totalCount = books.length
  
      document.getElementById("pending-count").textContent = pendingCount
      document.getElementById("approved-count").textContent = approvedCount
      document.getElementById("rejected-count").textContent = rejectedCount
      document.getElementById("total-count").textContent = totalCount
    }
  
    function showToast(type, message) {
      const toastContainer = document.getElementById("toast-container")
  
      const toast = document.createElement("div")
      toast.className = `toast toast-${type}`
  
      let icon = ""
      if (type === "success") icon = '<i class="fas fa-check-circle toast-icon"></i>'
      else if (type === "error") icon = '<i class="fas fa-times-circle toast-icon"></i>'
      else if (type === "warning") icon = '<i class="fas fa-exclamation-circle toast-icon"></i>'
  
      toast.innerHTML = `
              ${icon}
              <div class="toast-message">${message}</div>
              <button class="toast-close"><i class="fas fa-times"></i></button>
          `
  
      toastContainer.appendChild(toast)
  
      // Auto remove after 5 seconds
      setTimeout(() => {
        toast.style.opacity = "0"
        setTimeout(() => {
          toast.remove()
        }, 300)
      }, 5000)
  
      // Close button
      toast.querySelector(".toast-close").addEventListener("click", () => {
        toast.style.opacity = "0"
        setTimeout(() => {
          toast.remove()
        }, 300)
      })
    }
  
    function formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString("en-US", options)
    }
  })
  
  