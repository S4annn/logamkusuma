// DOM Elements
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const backToTop = document.getElementById("backToTop")
const customForm = document.getElementById("customForm")
const contactForm = document.getElementById("contactForm")
const galleryGrid = document.getElementById("galleryGrid")
const filterBtns = document.querySelectorAll(".filter-btn")

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
    backToTop.classList.add("show")
  } else {
    navbar.classList.remove("scrolled")
    backToTop.classList.remove("show")
  }
})

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Active Navigation Link
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Back to Top Button
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Gallery Filter
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))
    // Add active class to clicked button
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")
    const galleryItems = document.querySelectorAll(".gallery-item")

    galleryItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block"
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "scale(1)"
        }, 100)
      } else {
        item.style.opacity = "0"
        item.style.transform = "scale(0.8)"
        setTimeout(() => {
          item.style.display = "none"
        }, 300)
      }
    })
  })
})

// Form Submissions
customForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(customForm)
  const data = Object.fromEntries(formData)

  // Create WhatsApp message
  const message = `Halo Logam Kesuma, saya ingin request custom product:

*Nama Produk:* ${data.productName}
*Material:* ${data.material}
*Jumlah:* ${data.quantity}
*Dimensi:* ${data.dimensions || "Tidak disebutkan"}
*Deskripsi:* ${data.description}
*Budget Range:* ${data.budget || "Tidak disebutkan"}
*Target Selesai:* ${data.deadline || "Fleksibel"}
*Kontak:* ${data.contact}

Mohon informasi lebih lanjut. Terima kasih!`

  // Open WhatsApp
  const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")

  // Show success message
  showNotification("Request berhasil dikirim! Anda akan diarahkan ke WhatsApp.", "success")

  // Reset form
  customForm.reset()
})

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Create WhatsApp message
  const message = `Halo Logam Kesuma,

*Nama:* ${data.name}
*Email:* ${data.email}
*WhatsApp:* ${data.phone}
*Subjek:* ${data.subject}

*Pesan:*
${data.message}

Mohon respon segera. Terima kasih!`

  // Open WhatsApp
  const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")

  // Show success message
  showNotification("Pesan berhasil dikirim! Anda akan diarahkan ke WhatsApp.", "success")

  // Reset form
  contactForm.reset()
})

// File Upload Handler
document.querySelectorAll('input[type="file"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    const files = e.target.files
    const fileUploadText = e.target.nextElementSibling.querySelector("span")

    if (files.length > 0) {
      const fileNames = Array.from(files)
        .map((file) => file.name)
        .join(", ")
      fileUploadText.textContent = `${files.length} file(s) selected: ${fileNames}`
    } else {
      fileUploadText.textContent = "Drag & drop files atau klik untuk browse"
    }
  })
})

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === "success" ? "fa-check-circle" : "fa-info-circle"}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#28a745" : "#17a2b8"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `

  // Add to DOM
  document.body.appendChild(notification)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => notification.remove(), 300)
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Add notification animations to CSS
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
document.head.appendChild(notificationStyles)

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(".service-card, .material-card, .product-card, .article-card, .gallery-item")
  .forEach((el) => {
    observer.observe(el)
  })

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/\D/g, ""))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current) + (counter.textContent.includes("+") ? "+" : "")
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = counter.textContent // Reset to original
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when hero stats are visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const heroStats = document.querySelector(".hero-stats")
if (heroStats) {
  statsObserver.observe(heroStats)
}

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src || img.src
      img.classList.remove("lazy")
      imageObserver.unobserve(img)
    }
  })
})

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img)
})

// Search Functionality (for future implementation)
function initSearch() {
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase()
      // Implement search logic here
      console.log("Searching for:", query)
    })
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Logam Kesuma website loaded successfully!")

  // Initialize search if search input exists
  initSearch()

  // Add loading animation to forms
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    const submitBtn = form.querySelector('button[type="submit"]')
    if (submitBtn) {
      form.addEventListener("submit", () => {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...'
        submitBtn.disabled = true

        setTimeout(() => {
          submitBtn.innerHTML = submitBtn.dataset.originalText || submitBtn.innerHTML
          submitBtn.disabled = false
        }, 3000)
      })
    }
  })
})

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  // You can implement error reporting here
})

// Performance Monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Page loaded in ${Math.round(loadTime)}ms`)
})

// Advanced Gallery Features
function initAdvancedGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item")

  // Lightbox functionality
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img")
      const title = item.querySelector("h4").textContent
      const description = item.querySelector("p").textContent

      createLightbox(img.src, title, description)
    })
  })
}

function createLightbox(imageSrc, title, description) {
  const lightbox = document.createElement("div")
  lightbox.className = "lightbox"
  lightbox.innerHTML = `
    <div class="lightbox-overlay">
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <img src="${imageSrc}" alt="${title}">
        <div class="lightbox-info">
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
      </div>
    </div>
  `

  // Add lightbox styles
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  `

  document.body.appendChild(lightbox)
  document.body.style.overflow = "hidden"

  // Close functionality
  const closeBtn = lightbox.querySelector(".lightbox-close")
  const overlay = lightbox.querySelector(".lightbox-overlay")

  closeBtn.addEventListener("click", closeLightbox)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox()
  })

  document.addEventListener("keydown", handleLightboxKeydown)

  function closeLightbox() {
    lightbox.style.animation = "fadeOut 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(lightbox)
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", handleLightboxKeydown)
    }, 300)
  }

  function handleLightboxKeydown(e) {
    if (e.key === "Escape") closeLightbox()
  }
}

// Advanced Form Features
function initAdvancedForms() {
  // Real-time form validation
  const inputs = document.querySelectorAll("input, select, textarea")

  inputs.forEach((input) => {
    input.addEventListener("blur", validateField)
    input.addEventListener("input", clearFieldError)
  })

  // Auto-save form data to localStorage
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    const formId = form.id
    if (formId) {
      // Load saved data
      loadFormData(form, formId)

      // Save data on input
      form.addEventListener("input", () => saveFormData(form, formId))
    }
  })
}

function validateField(e) {
  const field = e.target
  const value = field.value.trim()
  const fieldName = field.name

  clearFieldError(e)

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      showFieldError(field, "Format email tidak valid")
      return false
    }
  }

  // Phone validation
  if (field.type === "tel" && value) {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
    if (!phoneRegex.test(value.replace(/\s/g, ""))) {
      showFieldError(field, "Format nomor telepon tidak valid")
      return false
    }
  }

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    showFieldError(field, "Field ini wajib diisi")
    return false
  }

  return true
}

function showFieldError(field, message) {
  const errorElement = document.createElement("div")
  errorElement.className = "field-error"
  errorElement.textContent = message
  errorElement.style.cssText = `
    color: #dc3545;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    animation: fadeIn 0.3s ease;
  `

  field.parentNode.appendChild(errorElement)
  field.style.borderColor = "#dc3545"
}

function clearFieldError(e) {
  const field = e.target
  const errorElement = field.parentNode.querySelector(".field-error")
  if (errorElement) {
    errorElement.remove()
  }
  field.style.borderColor = ""
}

function saveFormData(form, formId) {
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)
  localStorage.setItem(`form_${formId}`, JSON.stringify(data))
}

function loadFormData(form, formId) {
  const savedData = localStorage.getItem(`form_${formId}`)
  if (savedData) {
    const data = JSON.parse(savedData)
    Object.keys(data).forEach((key) => {
      const field = form.querySelector(`[name="${key}"]`)
      if (field && field.type !== "file") {
        field.value = data[key]
      }
    })
  }
}

// Advanced Search and Filter
function initAdvancedSearch() {
  // Create search overlay
  const searchOverlay = document.createElement("div")
  searchOverlay.className = "search-overlay"
  searchOverlay.innerHTML = `
    <div class="search-container">
      <div class="search-header">
        <input type="text" id="globalSearch" placeholder="Cari layanan, artikel, atau informasi...">
        <button class="search-close">&times;</button>
      </div>
      <div class="search-results" id="searchResults"></div>
    </div>
  `

  document.body.appendChild(searchOverlay)

  // Search trigger (Ctrl+K or Cmd+K)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      openSearch()
    }
    if (e.key === "Escape") {
      closeSearch()
    }
  })

  // Search functionality
  const searchInput = document.getElementById("globalSearch")
  const searchResults = document.getElementById("searchResults")

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase()
    if (query.length > 2) {
      performSearch(query)
    } else {
      searchResults.innerHTML = ""
    }
  })

  function openSearch() {
    searchOverlay.style.display = "flex"
    searchInput.focus()
    document.body.style.overflow = "hidden"
  }

  function closeSearch() {
    searchOverlay.style.display = "none"
    document.body.style.overflow = "auto"
    searchInput.value = ""
    searchResults.innerHTML = ""
  }

  // Close search functionality
  document.querySelector(".search-close").addEventListener("click", closeSearch)
  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) closeSearch()
  })
}

function performSearch(query) {
  const searchableContent = [
    { type: "service", title: "Furniture Logam", content: "kursi meja rak furniture besi", url: "#layanan" },
    { type: "service", title: "Pagar & Railing", content: "pagar railing balkon tangga", url: "#layanan" },
    { type: "service", title: "Kanopi & Atap", content: "kanopi carport atap baja ringan", url: "#layanan" },
    { type: "service", title: "Custom Fabrication", content: "custom fabrikasi khusus industri", url: "#custom" },
    { type: "material", title: "Besi & Baja", content: "besi baja hollow plat konstruksi", url: "#layanan" },
    { type: "material", title: "Aluminium", content: "aluminium composite profil sheet", url: "#layanan" },
    { type: "material", title: "Kuningan", content: "kuningan dekoratif presisi", url: "#layanan" },
    { type: "material", title: "Stainless Steel", content: "stainless steel food grade industrial", url: "#layanan" },
    { type: "page", title: "Tentang Kami", content: "ahsin fathoni pengalaman profil", url: "#tentang" },
    { type: "page", title: "Galeri Proyek", content: "galeri proyek hasil karya portfolio", url: "#galeri" },
    { type: "page", title: "Artikel Tips", content: "artikel tips perawatan edukasi", url: "#artikel" },
    { type: "page", title: "Kontak", content: "kontak alamat telepon whatsapp", url: "#kontak" },
  ]

  const results = searchableContent.filter(
    (item) => item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query),
  )

  const searchResults = document.getElementById("searchResults")

  if (results.length > 0) {
    searchResults.innerHTML = results
      .map(
        (result) => `
      <div class="search-result-item" onclick="navigateToResult('${result.url}')">
        <div class="result-type">${getResultTypeLabel(result.type)}</div>
        <div class="result-title">${result.title}</div>
        <div class="result-content">${highlightQuery(result.content, query)}</div>
      </div>
    `,
      )
      .join("")
  } else {
    searchResults.innerHTML = '<div class="no-results">Tidak ada hasil ditemukan</div>'
  }
}

function getResultTypeLabel(type) {
  const labels = {
    service: "Layanan",
    material: "Material",
    page: "Halaman",
  }
  return labels[type] || type
}

function highlightQuery(text, query) {
  const regex = new RegExp(`(${query})`, "gi")
  return text.replace(regex, "<mark>$1</mark>")
}

function navigateToResult(url) {
  document.querySelector(".search-overlay").style.display = "none"
  document.body.style.overflow = "auto"

  if (url.startsWith("#")) {
    const target = document.querySelector(url)
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  } else {
    window.location.href = url
  }
}

// Progressive Web App Features
function initPWAFeatures() {
  // Service Worker registration
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    })
  }

  // Install prompt
  let deferredPrompt

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault()
    deferredPrompt = e
    showInstallButton()
  })

  function showInstallButton() {
    const installButton = document.createElement("button")
    installButton.className = "install-app-btn"
    installButton.innerHTML = '<i class="fas fa-download"></i> Install App'
    installButton.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: #b8860b;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 25px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 5px 20px rgba(184, 134, 11, 0.3);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
    `

    installButton.addEventListener("click", () => {
      if (deferredPrompt) {
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt")
          }
          deferredPrompt = null
          installButton.remove()
        })
      }
    })

    document.body.appendChild(installButton)

    // Auto hide after 10 seconds
    setTimeout(() => {
      if (installButton.parentNode) {
        installButton.style.animation = "slideOutRight 0.3s ease"
        setTimeout(() => installButton.remove(), 300)
      }
    }, 10000)
  }
}

// Analytics and Tracking
function initAnalytics() {
  // Track page views
  trackEvent("page_view", {
    page_title: document.title,
    page_location: window.location.href,
  })

  // Track scroll depth
  let maxScroll = 0
  window.addEventListener("scroll", () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent
      if (maxScroll % 25 === 0) {
        // Track at 25%, 50%, 75%, 100%
        trackEvent("scroll_depth", { percent: maxScroll })
      }
    }
  })

  // Track form interactions
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", () => {
      trackEvent("form_submit", { form_id: form.id })
    })
  })

  // Track button clicks
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      trackEvent("button_click", {
        button_text: btn.textContent.trim(),
        button_location: btn.closest("section")?.id || "unknown",
      })
    })
  })

  // Track WhatsApp clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("whatsapp_click", { source: link.closest("section")?.id || "unknown" })
    })
  })
}

function trackEvent(eventName, parameters = {}) {
  // Google Analytics 4 tracking
  window.gtag =
    window.gtag ||
    (() => {
      window.dataLayer.push(arguments)
    })
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...parameters })

  // Console log for development
  console.log("Event tracked:", eventName, parameters)

  // You can also send to other analytics services here
}

// Performance Monitoring
function initPerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ("web-vital" in window) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
    })
  }

  // Monitor resource loading
  window.addEventListener("load", () => {
    const navigation = performance.getEntriesByType("navigation")[0]
    const resources = performance.getEntriesByType("resource")

    console.log("Navigation timing:", {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      totalTime: navigation.loadEventEnd - navigation.fetchStart,
    })

    // Track slow resources
    resources.forEach((resource) => {
      if (resource.duration > 1000) {
        // Resources taking more than 1 second
        console.warn("Slow resource:", resource.name, resource.duration + "ms")
      }
    })
  })
}

// Accessibility Enhancements
function initAccessibilityFeatures() {
  // Skip to content link
  const skipLink = document.createElement("a")
  skipLink.href = "#beranda"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "skip-link"
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #b8860b;
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s ease;
  `

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px"
  })

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)

  // Keyboard navigation for gallery
  document.querySelectorAll(".gallery-item").forEach((item, index) => {
    item.setAttribute("tabindex", "0")
    item.setAttribute("role", "button")
    item.setAttribute("aria-label", `View project ${index + 1}`)

    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        item.click()
      }
    })
  })

  // Focus management for mobile menu
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  hamburger.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      // Focus first menu item when menu opens
      setTimeout(() => {
        const firstMenuItem = navMenu.querySelector(".nav-link")
        if (firstMenuItem) firstMenuItem.focus()
      }, 100)
    }
  })

  // Trap focus in mobile menu
  navMenu.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      const focusableElements = navMenu.querySelectorAll(".nav-link")
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  })
}

// Initialize all advanced features
document.addEventListener("DOMContentLoaded", () => {
  initAdvancedGallery()
  initAdvancedForms()
  initAdvancedSearch()
  initPWAFeatures()
  initAnalytics()
  initPerformanceMonitoring()
  initAccessibilityFeatures()

  // Add lightbox and search styles
  const advancedStyles = document.createElement("style")
  advancedStyles.textContent = `
    .lightbox-content {
      max-width: 90vw;
      max-height: 90vh;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
    }
    
    .lightbox-content img {
      width: 100%;
      height: auto;
      max-height: 70vh;
      object-fit: contain;
    }
    
    .lightbox-close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.7);
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 1;
    }
    
    .lightbox-info {
      padding: 1.5rem;
    }
    
    .search-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      z-index: 10000;
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding-top: 10vh;
    }
    
    .search-container {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 600px;
      max-height: 80vh;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    
    .search-header {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    
    .search-header input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1.1rem;
      padding: 0.5rem;
    }
    
    .search-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      margin-left: 1rem;
    }
    
    .search-results {
      max-height: 60vh;
      overflow-y: auto;
    }
    
    .search-result-item {
      padding: 1rem;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    
    .search-result-item:hover {
      background: #f8f9fa;
    }
    
    .result-type {
      font-size: 0.8rem;
      color: #b8860b;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }
    
    .result-title {
      font-weight: 600;
      color: #212529;
      margin-bottom: 0.25rem;
    }
    
    .result-content {
      font-size: 0.9rem;
      color: #666;
    }
    
    .result-content mark {
      background: #fff3cd;
      padding: 0 2px;
      border-radius: 2px;
    }
    
    .no-results {
      padding: 2rem;
      text-align: center;
      color: #666;
    }
    
    .skip-link:focus {
      top: 6px !important;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `

  document.head.appendChild(advancedStyles)
})
