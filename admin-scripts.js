import { Chart } from "@/components/ui/chart"
document.addEventListener("DOMContentLoaded", () => {
  // Sidebar Toggle
  const sidebarToggle = document.querySelector(".sidebar-toggle")
  const adminSidebar = document.querySelector(".admin-sidebar")

  if (sidebarToggle && adminSidebar) {
    sidebarToggle.addEventListener("click", () => {
      adminSidebar.classList.toggle("active")
    })
  }

  // Date Filter
  const dateFilterBtns = document.querySelectorAll(".date-filter .btn")

  if (dateFilterBtns.length) {
    dateFilterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        dateFilterBtns.forEach((b) => b.classList.remove("active"))
        this.classList.add("active")

        // Here you would update the dashboard data based on the selected date range
        updateDashboardData(this.textContent.trim())
      })
    })
  }

  // Initialize Charts
  initializeCharts()

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

  // Function to update dashboard data based on date range
  function updateDashboardData(dateRange) {
    console.log(`Updating dashboard data for range: ${dateRange}`)

    // In a real application, you would fetch data from the server here
    // For this demo, we'll just show a notification
    window.showNotification(`Dashboard data updated for ${dateRange} view`, "success")

    // Update charts with new data
    updateCharts(dateRange)
  }

  // Initialize Charts
  function initializeCharts() {
    // User Growth Chart
    const userGrowthCtx = document.getElementById("userGrowthChart")
    if (userGrowthCtx) {
      const userGrowthChart = new Chart(userGrowthCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "New Users",
              data: [120, 145, 175, 190, 220, 250, 285, 310, 340, 360, 400, 420],
              borderColor: "#4f46e5",
              backgroundColor: "rgba(79, 70, 229, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
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
    }

    // Exchange Activity Chart
    const exchangeActivityCtx = document.getElementById("exchangeActivityChart")
    if (exchangeActivityCtx) {
      const exchangeActivityChart = new Chart(exchangeActivityCtx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Exchanges",
              data: [65, 78, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225],
              backgroundColor: "#f97316",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
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
    }
  }

  // Update charts with new data
  function updateCharts(dateRange) {
    // In a real application, you would update the charts with new data based on the date range
    // For this demo, we'll just log a message
    console.log(`Updating charts for range: ${dateRange}`)
  }
})

