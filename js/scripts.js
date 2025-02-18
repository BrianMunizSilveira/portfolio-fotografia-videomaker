document.addEventListener("DOMContentLoaded", () => {
    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector("nav ul")
  
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show")
      this.classList.toggle("active")
    })
  
    // Fechar menu ao clicar em um link (para dispositivos móveis)
    const navLinks = document.querySelectorAll("nav ul li a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show")
        menuToggle.classList.remove("active")
      })
    })
  
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
        const headerOffset = document.querySelector("header").offsetHeight
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
  
        // Adiciona classe para iniciar a transição
        document.body.classList.add("is-scrolling")
  
        smoothScrollTo(offsetPosition, 1000)
  
        // Remove a classe após a conclusão da rolagem
        setTimeout(() => {
          document.body.classList.remove("is-scrolling")
        }, 1000)
      })
    })
  
    function smoothScrollTo(targetPosition, duration) {
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      let startTime = null
  
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const run = ease(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
      }
  
      function ease(t, b, c, d) {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t + b
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
      }
  
      requestAnimationFrame(animation)
    }
  
    // Efeito Parallax otimizado para desktop e mobile
    function parallaxEffect() {
      const parallaxSections = document.querySelectorAll(".parallax-section")
  
      parallaxSections.forEach((section) => {
        const desktopBg = section.querySelector(".desktop-parallax")
        const mobileBg = section.querySelector(".mobile-parallax")
        const distance = window.pageYOffset - section.offsetTop
  
        if (window.innerWidth > 768) {
          // Desktop parallax
          desktopBg.style.transform = `translateY(${distance * 0.5}px)`
        } else {
          // Mobile parallax (suave deslizamento)
          mobileBg.style.transform = `translateY(${distance * 0.2}px)`
        }
      })
    }
  
    // Throttle function para otimizar o desempenho do parallax
    function throttle(func, limit) {
      let inThrottle
      return function () {
        const args = arguments
  
        if (!inThrottle) {
          func.apply(this, args)
          inThrottle = true
          setTimeout(() => (inThrottle = false), limit)
        }
      }
    }
  
    window.addEventListener("scroll", throttle(parallaxEffect, 10))
    window.addEventListener("resize", throttle(parallaxEffect, 10))
  
    // Filtro de portfólio
    const filterButtons = document.querySelectorAll(".filter-buttons button")
    const categories = document.querySelectorAll(".category")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter")
  
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
  
        categories.forEach((category) => {
          if (filter === "all" || category.id === filter) {
            category.style.display = "block"
          } else {
            category.style.display = "none"
          }
        })
      })
    })
  
    // Lazy loading para imagens e vídeos
    const lazyLoadMedia = () => {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]')
      const lazyVideos = document.querySelectorAll('video[loading="lazy"]')
  
      if ("IntersectionObserver" in window) {
        const mediaObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const media = entry.target
              if (media.tagName.toLowerCase() === "img") {
                media.src = media.dataset.src
              } else if (media.tagName.toLowerCase() === "video") {
                media.src = media.dataset.src
                media.load()
              }
              media.removeAttribute("loading")
              observer.unobserve(media)
            }
          })
        })
  
        lazyImages.forEach((img) => mediaObserver.observe(img))
        lazyVideos.forEach((video) => mediaObserver.observe(video))
      } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        lazyImages.forEach((img) => {
          img.src = img.dataset.src
          img.removeAttribute("loading")
        })
        lazyVideos.forEach((video) => {
          video.src = video.dataset.src
          video.load()
          video.removeAttribute("loading")
        })
      }
    }
  
    lazyLoadMedia()
  
    // Header transparente no topo e sólido ao rolar
    const header = document.querySelector("header")
  
    function checkHeader() {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
      } else {
        header.style.backgroundColor = "transparent"
      }
    }
  
    window.addEventListener("scroll", throttle(checkHeader, 100))
    window.addEventListener("load", checkHeader)
  
    // Destacar item do menu ativo
    function setActiveMenuItem() {
      const sections = document.querySelectorAll("section")
      const navItems = document.querySelectorAll("nav ul li a")
  
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (pageYOffset >= sectionTop - 60) {
          current = section.getAttribute("id")
        }
      })
  
      navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href").substring(1) === current) {
          item.classList.add("active")
        }
      })
    }
  
    window.addEventListener("scroll", throttle(setActiveMenuItem, 100))
    window.addEventListener("load", setActiveMenuItem)
  
    // Destacar seção ativa durante a rolagem
    function highlightActiveSection() {
      const sections = document.querySelectorAll("section")
      const navItems = document.querySelectorAll("nav ul li a")
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100 // Ajuste conforme necessário
        const sectionBottom = sectionTop + section.offsetHeight
        const scrollPosition = window.scrollY
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const correspondingNavItem = document.querySelector(`nav ul li a[href="#${section.id}"]`)
          navItems.forEach((item) => item.classList.remove("active"))
          if (correspondingNavItem) {
            correspondingNavItem.classList.add("active")
          }
        }
      })
    }
  
    window.addEventListener("scroll", throttle(highlightActiveSection, 100))
  
    // Função para aplicar efeito de fade nas seções
    function fadeInSections() {
      const sections = document.querySelectorAll("section")
      const windowHeight = window.innerHeight
  
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionBottom = section.getBoundingClientRect().bottom
  
        if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
          section.classList.add("visible")
        } else {
          section.classList.remove("visible")
        }
      })
    }
  
    // Adicione os event listeners para a função fadeInSections
    window.addEventListener("scroll", throttle(fadeInSections, 100))
    window.addEventListener("load", fadeInSections)
  })
  
  