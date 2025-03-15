import { Chart } from "@/components/ui/chart"
document.addEventListener("DOMContentLoaded", () => {
  // Toggle sidebar on mobile
  const menuToggle = document.querySelector(".sidebar-toggle")
  const sidebar = document.querySelector(".admin-sidebar")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
      document.querySelector(".admin-main").classList.toggle("sidebar-collapsed")
    })
  }

  // Initialize activity chart
  initActivityChart()

  // Initialize history table
  loadHistoryData()

  // Set up event listeners
  setupEventListeners()
})

// Initialize the activity chart
function initActivityChart() {
  const ctx = document.getElementById("activityChart").getContext("2d")

  // Sample data for the chart
  const labels = ["Mar 1", "Mar 5", "Mar 10", "Mar 15", "Mar 20", "Mar 25", "Mar 30"]
  const userActions = [12, 19, 15, 25, 22, 30, 18]
  const bookActions = [8, 15, 12, 17, 10, 15, 9]
  const policyActions = [2, 1, 0, 3, 1, 2, 3]
  const systemActions = [5, 7, 4, 6, 8, 5, 7]

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "User Actions",
          data: userActions,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Book Actions",
          data: bookActions,
          borderColor: "#8b5cf6",
          backgroundColor: "rgba(139, 92, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Policy Actions",
          data: policyActions,
          borderColor: "#f97316",
          backgroundColor: "rgba(249, 115, 22, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "System Actions",
          data: systemActions,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  })

  // Update chart when period changes
  document.getElementById("chart-week").addEventListener("click", function () {
    updateChartPeriod(this, chart, "week")
  })

  document.getElementById("chart-month").addEventListener("click", function () {
    updateChartPeriod(this, chart, "month")
  })

  document.getElementById("chart-quarter").addEventListener("click", function () {
    updateChartPeriod(this, chart, "quarter")
  })
}

// Update chart data based on selected period
function updateChartPeriod(button, chart, period) {
  // Update active button
  document.querySelectorAll(".chart-actions .btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  button.classList.add("active")

  let labels, userActions, bookActions, policyActions, systemActions

  if (period === "week") {
    labels = ["Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13", "Mar 14", "Mar 15"]
    userActions = [8, 12, 15, 10, 14, 18, 24]
    bookActions = [5, 8, 10, 7, 9, 12, 15]
    policyActions = [1, 0, 2, 0, 1, 3, 2]
    systemActions = [3, 4, 2, 5, 3, 6, 4]
  } else if (period === "month") {
    labels = ["Mar 1", "Mar 5", "Mar 10", "Mar 15", "Mar 20", "Mar 25", "Mar 30"]
    userActions = [12, 19, 15, 25, 22, 30, 18]
    bookActions = [8, 15, 12, 17, 10, 15, 9]
    policyActions = [2, 1, 0, 3, 1, 2, 3]
    systemActions = [5, 7, 4, 6, 8, 5, 7]
  } else if (period === "quarter") {
    labels = ["Jan", "Feb", "Mar"]
    userActions = [120, 145, 156]
    bookActions = [85, 95, 89]
    policyActions = [10, 8, 12]
    systemActions = [45, 50, 42]
  }

  chart.data.labels = labels
  chart.data.datasets[0].data = userActions
  chart.data.datasets[1].data = bookActions
  chart.data.datasets[2].data = policyActions
  chart.data.datasets[3].data = systemActions
  chart.update()
}

// Set up event listeners for the page
function setupEventListeners() {
  // Date range filter
  const dateRangeSelect = document.getElementById("date-range")
  const customDateContainer = document.getElementById("custom-date-container")

  dateRangeSelect.addEventListener("change", function () {
    if (this.value === "custom") {
      customDateContainer.style.display = "block"
    } else {
      customDateContainer.style.display = "none"
    }
  })

  // Date filter buttons
  document.getElementById("filter-today").addEventListener("click", function () {
    updateDateFilter(this, "today")
  })

  document.getElementById("filter-week").addEventListener("click", function () {
    updateDateFilter(this, "week")
  })

  document.getElementById("filter-month").addEventListener("click", function () {
    updateDateFilter(this, "month")
  })

  document.getElementById("filter-all").addEventListener("click", function () {
    updateDateFilter(this, "all")
  })

  // Apply filters button
  document.getElementById("apply-filters").addEventListener("click", () => {
    filterHistoryData()
  })

  // Refresh button
  document.getElementById("refresh-history").addEventListener("click", () => {
    loadHistoryData()
  })

  // Export buttons
  document.getElementById("export-csv").addEventListener("click", () => {
    exportData("csv")
  })

  document.getElementById("export-report").addEventListener("click", () => {
    exportData("pdf")
  })

  // Sortable columns
  const sortableHeaders = document.querySelectorAll(".sortable")
  sortableHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const sortBy = this.getAttribute("data-sort")
      sortHistoryData(sortBy)
    })
  })

  // Pagination
  document.getElementById("prev-page").addEventListener("click", function () {
    if (!this.disabled) {
      changePage("prev")
    }
  })

  document.getElementById("next-page").addEventListener("click", function () {
    if (!this.disabled) {
      changePage("next")
    }
  })

  // Category filter links
  document.getElementById("view-user-actions").addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("action-type").value = "user"
    filterHistoryData()
  })

  document.getElementById("view-book-actions").addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("action-type").value = "book"
    filterHistoryData()
  })

  document.getElementById("view-policy-actions").addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("action-type").value = "policy"
    filterHistoryData()
  })

  document.getElementById("view-today").addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("date-range").value = "today"
    filterHistoryData()
  })

  // Modal close buttons
  const closeModalButtons = document.querySelectorAll(".close-modal")
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("history-details-modal").classList.remove("active")
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("history-details-modal")
    if (event.target === modal) {
      modal.classList.remove("active")
    }
  })
}

// Update date filter buttons
function updateDateFilter(button, period) {
  // Update active button
  document.querySelectorAll(".date-filter .btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  button.classList.add("active")

  // Update date range select to match
  document.getElementById("date-range").value = period === "all" ? "month" : period

  // Apply filter
  filterHistoryData()
}

// Sample history data
const historyData = [
  {
    id: 1,
    timestamp: "2025-03-15T14:34:12Z",
    admin: "Sarah Johnson",
    action: "Book Approval",
    category: "book",
    target: "The Great Gatsby (B-2025-03-15-001)",
    ip: "192.168.1.105",
    session: "a7f8d9e3c2b1",
    status: "success",
    description:
      'Approved book submission "The Great Gatsby" by F. Scott Fitzgerald. Book was added to the Fiction category with 5 available copies.',
    beforeState: {
      status: "pending",
      reviewCount: 0,
      lastUpdated: "2025-03-15T10:15:23Z",
    },
    afterState: {
      status: "approved",
      reviewCount: 1,
      lastUpdated: "2025-03-15T14:34:12Z",
      approvedBy: "sarah.johnson",
      approvalNotes: "Classic literature, approved for general circulation",
    },
    relatedActions: [
      {
        time: "2025-03-15T10:15:23Z",
        info: 'Book submission created by user "jsmith"',
      },
      {
        time: "2025-03-15T14:34:12Z",
        info: 'Book approved by admin "Sarah Johnson"',
      },
      {
        time: "2025-03-15T14:35:05Z",
        info: 'Notification sent to user "jsmith"',
      },
    ],
  },
  {
    id: 2,
    timestamp: "2025-03-15T13:22:45Z",
    admin: "Michael Chen",
    action: "User Approval",
    category: "user",
    target: "Emily Davis (U-2025-03-15-003)",
    ip: "192.168.1.110",
    session: "b8e7f6d5c4a3",
    status: "success",
    description: "Approved user registration for Emily Davis. User was granted standard member privileges.",
    beforeState: {
      status: "pending",
      reviewCount: 0,
      lastUpdated: "2025-03-15T09:45:18Z",
    },
    afterState: {
      status: "approved",
      reviewCount: 1,
      lastUpdated: "2025-03-15T13:22:45Z",
      approvedBy: "michael.chen",
      approvalNotes: "Verified identity through provided documentation",
    },
    relatedActions: [
      {
        time: "2025-03-15T09:45:18Z",
        info: 'User registration submitted by "edavis"',
      },
      {
        time: "2025-03-15T13:22:45Z",
        info: 'User approved by admin "Michael Chen"',
      },
      {
        time: "2025-03-15T13:23:10Z",
        info: 'Welcome email sent to "edavis@example.com"',
      },
    ],
  },
  {
    id: 3,
    timestamp: "2025-03-15T11:05:33Z",
    admin: "Jessica Williams",
    action: "Policy Update",
    category: "policy",
    target: "Late Return Policy",
    ip: "192.168.1.115",
    session: "c9d8e7f6g5h4",
    status: "success",
    description:
      "Updated the Late Return Policy to increase grace period from 3 days to 5 days before late fees apply.",
    beforeState: {
      version: "1.2",
      graceperiod: 3,
      lastUpdated: "2025-01-10T15:30:22Z",
    },
    afterState: {
      version: "1.3",
      graceperiod: 5,
      lastUpdated: "2025-03-15T11:05:33Z",
      updatedBy: "jessica.williams",
      updateNotes: "Extended grace period based on user feedback",
    },
    relatedActions: [
      {
        time: "2025-03-10T14:20:15Z",
        info: 'Policy change proposed by admin "Jessica Williams"',
      },
      {
        time: "2025-03-14T16:45:30Z",
        info: "Policy change approved by admin board",
      },
      {
        time: "2025-03-15T11:05:33Z",
        info: 'Policy updated by admin "Jessica Williams"',
      },
      {
        time: "2025-03-15T11:10:45Z",
        info: "Policy change notification sent to all users",
      },
    ],
  },
  {
    id: 4,
    timestamp: "2025-03-15T10:15:20Z",
    admin: "Sarah Johnson",
    action: "Book Rejection",
    category: "book",
    target: "Inappropriate Content (B-2025-03-14-015)",
    ip: "192.168.1.105",
    session: "d0e1f2g3h4i5",
    status: "success",
    description: "Rejected book submission due to inappropriate content that violates community guidelines.",
    beforeState: {
      status: "pending",
      reviewCount: 0,
      lastUpdated: "2025-03-14T16:30:45Z",
    },
    afterState: {
      status: "rejected",
      reviewCount: 1,
      lastUpdated: "2025-03-15T10:15:20Z",
      rejectedBy: "sarah.johnson",
      rejectionReason: "Content violates Section 3.2 of community guidelines",
    },
    relatedActions: [
      {
        time: "2025-03-14T16:30:45Z",
        info: 'Book submission created by user "anonymous123"',
      },
      {
        time: "2025-03-15T10:15:20Z",
        info: 'Book rejected by admin "Sarah Johnson"',
      },
      {
        time: "2025-03-15T10:16:05Z",
        info: 'Notification sent to user "anonymous123"',
      },
    ],
  },
  {
    id: 5,
    timestamp: "2025-03-15T09:30:15Z",
    admin: "System",
    action: "Backup Created",
    category: "system",
    target: "Database Backup",
    ip: "192.168.1.100",
    session: "system",
    status: "success",
    description: "Automated daily database backup completed successfully. Backup size: 2.3GB",
    beforeState: {
      lastBackup: "2025-03-14T09:30:10Z",
      backupSize: "2.2GB",
    },
    afterState: {
      lastBackup: "2025-03-15T09:30:15Z",
      backupSize: "2.3GB",
      backupLocation: "cloud-storage/backups/2025-03-15/",
    },
    relatedActions: [
      {
        time: "2025-03-15T09:30:00Z",
        info: "Automated backup process initiated",
      },
      {
        time: "2025-03-15T09:30:15Z",
        info: "Backup completed successfully",
      },
      {
        time: "2025-03-15T09:31:20Z",
        info: "Backup verification completed",
      },
      {
        time: "2025-03-15T09:32:05Z",
        info: "Backup uploaded to cloud storage",
      },
    ],
  },
]

// Generate more sample data
function generateMoreData() {
  const actions = [
    "User Approval",
    "User Rejection",
    "Book Approval",
    "Book Rejection",
    "Policy Update",
    "System Update",
    "Login",
    "Logout",
  ]
  const categories = ["user", "book", "policy", "system", "login"]
  const admins = ["Sarah Johnson", "Michael Chen", "Jessica Williams", "System"]
  const statuses = ["success", "warning", "error"]

  const additionalData = []

  for (let i = 6; i <= 156; i++) {
    const actionIndex = Math.floor(Math.random() * actions.length)
    const action = actions[actionIndex]
    let category

    if (action.includes("User")) {
      category = "user"
    } else if (action.includes("Book")) {
      category = "book"
    } else if (action.includes("Policy")) {
      category = "policy"
    } else if (action.includes("System")) {
      category = "system"
    } else {
      category = "login"
    }

    const admin = action.includes("System") ? "System" : admins[Math.floor(Math.random() * (admins.length - 1))]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    // Generate a random date within the last 30 days
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    additionalData.push({
      id: i,
      timestamp: date.toISOString(),
      admin: admin,
      action: action,
      category: category,
      target: `Sample Target ${i}`,
      ip: `192.168.1.${100 + Math.floor(Math.random() * 100)}`,
      session: Math.random().toString(36).substring(2, 12),
      status: status,
      description: `This is a sample description for action ${i}.`,
      beforeState: {
        sample: "before state",
      },
      afterState: {
        sample: "after state",
      },
      relatedActions: [
        {
          time: date.toISOString(),
          info: `Sample related action for ${i}`,
        },
      ],
    })
  }

  return [...historyData, ...additionalData]
}

// Current page and items per page for pagination
let currentPage = 1
const itemsPerPage = 10
let allHistoryData = []
let filteredData = []
const currentSort = { field: "timestamp", direction: "desc" }

// Load history data
function loadHistoryData() {
  // In a real application, this would be an API call
  allHistoryData = generateMoreData()
  filteredData = [...allHistoryData]

  // Sort by most recent first by default
  sortHistoryData("timestamp", true)

  // Update counters
  updateCounters()

  // Render the first page
  renderHistoryTable()
  updatePagination()
}

// Filter history data based on selected filters
function filterHistoryData() {
  const searchTerm = document.getElementById("search-history").value.toLowerCase()
  const dateRange = document.getElementById("date-range").value
  const actionType = document.getElementById("action-type").value
  const adminFilter = document.getElementById("admin-filter").value

  // Filter the data
  filteredData = allHistoryData.filter((item) => {
    // Search term filter
    const matchesSearch =
      item.action.toLowerCase().includes(searchTerm) ||
      item.target.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)

    // Date range filter
    let matchesDate = true
    const itemDate = new Date(item.timestamp)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (dateRange === "today") {
      const endOfDay = new Date(today)
      endOfDay.setHours(23, 59, 59, 999)
      matchesDate = itemDate >= today && itemDate <= endOfDay
    } else if (dateRange === "yesterday") {
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const endOfYesterday = new Date(yesterday)
      endOfYesterday.setHours(23, 59, 59, 999)
      matchesDate = itemDate >= yesterday && itemDate <= endOfYesterday
    } else if (dateRange === "week") {
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      matchesDate = itemDate >= weekAgo
    } else if (dateRange === "month") {
      const monthAgo = new Date(today)
      monthAgo.setDate(monthAgo.getDate() - 30)
      matchesDate = itemDate >= monthAgo
    } else if (dateRange === "custom") {
      const startDate = document.getElementById("start-date").value
      const endDate = document.getElementById("end-date").value

      if (startDate) {
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        matchesDate = itemDate >= start
      }

      if (endDate && matchesDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        matchesDate = itemDate <= end
      }
    }

    // Action type filter
    let matchesAction = true
    if (actionType !== "all") {
      matchesAction = item.category === actionType
    }

    // Admin filter
    let matchesAdmin = true
    if (adminFilter !== "all") {
      const adminName =
        adminFilter === "sarah"
          ? "Sarah Johnson"
          : adminFilter === "michael"
            ? "Michael Chen"
            : adminFilter === "jessica"
              ? "Jessica Williams"
              : ""
      matchesAdmin = item.admin === adminName
    }

    return matchesSearch && matchesDate && matchesAction && matchesAdmin
  })

  // Reset to first page
  currentPage = 1

  // Apply current sort
  sortHistoryData(currentSort.field, false)

  // Update counters
  updateCounters()

  // Render the table
  renderHistoryTable()
  updatePagination()
}

// Sort history data
function sortHistoryData(field, toggleDirection = true) {
  // Update sort direction
  if (toggleDirection && currentSort.field === field) {
    currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc"
  } else {
    currentSort.field = field
    currentSort.direction = "desc" // Default to descending
  }

  // Update sort indicators in the UI
  const sortableHeaders = document.querySelectorAll(".sortable")
  sortableHeaders.forEach((header) => {
    header.classList.remove("asc", "desc")
    if (header.getAttribute("data-sort") === field) {
      header.classList.add(currentSort.direction)
    }
  })

  // Sort the data
  filteredData.sort((a, b) => {
    let valueA = a[field]
    let valueB = b[field]

    // Handle dates
    if (field === "timestamp") {
      valueA = new Date(valueA)
      valueB = new Date(valueB)
    }

    // Compare values
    if (valueA < valueB) {
      return currentSort.direction === "asc" ? -1 : 1
    }
    if (valueA > valueB) {
      return currentSort.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Render the table
  renderHistoryTable()
}

// Render history table
function renderHistoryTable() {
  const tableBody = document.getElementById("history-table-body")
  tableBody.innerHTML = ""

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length)

  // Get current page data
  const currentPageData = filteredData.slice(startIndex, endIndex)

  // Render table rows
  currentPageData.forEach((item) => {
    const row = document.createElement("tr")

    // Format date
    const date = new Date(item.timestamp)
    const formattedDate = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`

    // Create category badge
    const categoryBadge = `<span class="category-badge ${item.category}">${getCategoryLabel(item.category)}</span>`

    row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${item.admin}</td>
            <td>${item.action}</td>
            <td>${categoryBadge}</td>
            <td>${item.target}</td>
            <td><button class="btn btn-sm btn-outline view-details-btn" data-id="${item.id}">View Details</button></td>
        `

    tableBody.appendChild(row)
  })

  // Add event listeners to view details buttons
  const viewDetailsButtons = document.querySelectorAll(".view-details-btn")
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = Number.parseInt(this.getAttribute("data-id"))
      openDetailsModal(id)
    })
  })

  // Update showing info
  document.getElementById("showing-start").textContent = filteredData.length > 0 ? startIndex + 1 : 0
  document.getElementById("showing-end").textContent = endIndex
  document.getElementById("total-entries").textContent = filteredData.length
}

// Update pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginationNumbers = document.getElementById("pagination-numbers")
  const prevPageBtn = document.getElementById("prev-page")
  const nextPageBtn = document.getElementById("next-page")

  // Update prev/next buttons
  prevPageBtn.disabled = currentPage === 1
  nextPageBtn.disabled = currentPage === totalPages

  // Generate pagination numbers
  paginationNumbers.innerHTML = ""

  if (totalPages <= 5) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      addPaginationNumber(i)
    }
  } else {
    // Show first, last, and pages around current
    if (currentPage <= 3) {
      // Near the beginning
      for (let i = 1; i <= 4; i++) {
        addPaginationNumber(i)
      }
      addPaginationEllipsis()
      addPaginationNumber(totalPages)
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      addPaginationNumber(1)
      addPaginationEllipsis()
      for (let i = totalPages - 3; i <= totalPages; i++) {
        addPaginationNumber(i)
      }
    } else {
      // In the middle
      addPaginationNumber(1)
      addPaginationEllipsis()
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        addPaginationNumber(i)
      }
      addPaginationEllipsis()
      addPaginationNumber(totalPages)
    }
  }
}

// Add pagination number
function addPaginationNumber(number) {
  const paginationNumbers = document.getElementById("pagination-numbers")
  const button = document.createElement("button")
  button.classList.add("pagination-number")
  if (number === currentPage) {
    button.classList.add("active")
  }
  button.textContent = number
  button.addEventListener("click", () => {
    currentPage = number
    renderHistoryTable()
    updatePagination()
  })
  paginationNumbers.appendChild(button)
}

// Add pagination ellipsis
function addPaginationEllipsis() {
  const paginationNumbers = document.getElementById("pagination-numbers")
  const span = document.createElement("span")
  span.classList.add("pagination-ellipsis")
  span.textContent = "..."
  paginationNumbers.appendChild(span)
}

// Change page
function changePage(direction) {
  if (direction === "prev" && currentPage > 1) {
    currentPage--
  } else if (direction === "next" && currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
    currentPage++
  }

  renderHistoryTable()
  updatePagination()
}

// Open details modal
function openDetailsModal(id) {
  const item = allHistoryData.find((item) => item.id === id)

  if (!item) return

  // Format date
  const date = new Date(item.timestamp)
  const formattedDate = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`

  // Populate modal with data
  document.getElementById("detail-timestamp").textContent = formattedDate
  document.getElementById("detail-admin").textContent = item.admin
  document.getElementById("detail-ip").textContent = item.ip
  document.getElementById("detail-session").textContent = item.session
  document.getElementById("detail-action-type").textContent = item.action
  document.getElementById("detail-category").textContent = getCategoryLabel(item.category)
  document.getElementById("detail-target").textContent = item.target

  // Status badge
  const statusBadge = `<span class="status-badge ${item.status}">${getStatusLabel(item.status)}</span>`
  document.getElementById("detail-status").innerHTML = statusBadge

  // Description
  document.getElementById("detail-description").textContent = item.description

  // Before and after state
  document.getElementById("detail-before-state").textContent = JSON.stringify(item.beforeState, null, 2)
  document.getElementById("detail-after-state").textContent = JSON.stringify(item.afterState, null, 2)

  // Related actions
  const relatedActionsContainer = document.getElementById("related-actions")
  relatedActionsContainer.innerHTML = ""

  item.relatedActions.forEach((action) => {
    const actionDate = new Date(action.time)
    const formattedActionDate = `${actionDate.toLocaleDateString()} - ${actionDate.toLocaleTimeString()}`

    const timelineItem = document.createElement("div")
    timelineItem.classList.add("timeline-item")

    // Highlight current action
    const isCurrentAction = action.time === item.timestamp

    timelineItem.innerHTML = `
            <div class="timeline-point${isCurrentAction ? " active" : ""}"></div>
            <div class="timeline-content">
                <div class="timeline-time">${formattedActionDate}</div>
                <div class="timeline-info">${action.info}</div>
            </div>
        `

    relatedActionsContainer.appendChild(timelineItem)
  })

  // Show modal
  document.getElementById("history-details-modal").classList.add("active")
}

// Export data
function exportData(format) {
  // In a real application, this would generate and download a file
  alert(`Exporting data in ${format.toUpperCase()} format...`)

  // Simulate download delay
  setTimeout(() => {
    alert(`${format.toUpperCase()} export completed successfully!`)
  }, 1500)
}

// Update counters
function updateCounters() {
  // Count today's actions
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayActions = allHistoryData.filter((item) => {
    const itemDate = new Date(item.timestamp)
    return itemDate >= today
  }).length

  // Count by category
  const userActions = allHistoryData.filter((item) => item.category === "user").length
  const bookActions = allHistoryData.filter((item) => item.category === "book").length
  const policyActions = allHistoryData.filter((item) => item.category === "policy").length

  // Update counter elements
  document.getElementById("today-actions").textContent = todayActions
  document.getElementById("user-actions").textContent = userActions
  document.getElementById("book-actions").textContent = bookActions
  document.getElementById("policy-actions").textContent = policyActions
}

// Helper functions
function getCategoryLabel(category) {
  switch (category) {
    case "user":
      return "User"
    case "book":
      return "Book"
    case "policy":
      return "Policy"
    case "system":
      return "System"
    case "login":
      return "Login"
    default:
      return category
  }
}

function getStatusLabel(status) {
  switch (status) {
    case "success":
      return "Successful"
    case "warning":
      return "Warning"
    case "error":
      return "Error"
    default:
      return status
  }
}

