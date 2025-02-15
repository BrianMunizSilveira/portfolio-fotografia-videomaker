document.addEventListener("DOMContentLoaded", () => {
    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector(".menu-toggle")
    const navMenu = document.querySelector("nav ul")
  
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show")
      this.classList.toggle("active")
    })
  
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
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
  
    // Animação de fade-in para elementos ao rolar a página
    const fadeElements = document.querySelectorAll(".fade-in")
  
    function checkFade() {
      fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementBottom = element.getBoundingClientRect().bottom
  
        if (elementTop < window.innerHeight && elementBottom > 0) {
          element.classList.add("visible")
        }
      })
    }
  
    window.addEventListener("scroll", checkFade)
    window.addEventListener("load", checkFade)
  
    // Formulário de contato
    const contactForm = document.getElementById("contact-form")
  
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Aqui você pode adicionar a lógica para enviar o formulário
      // Por exemplo, usando fetch para enviar os dados para um servidor
  
      alert("Mensagem enviada com sucesso!")
      contactForm.reset()
    })
  
    // Header transparente no topo e sólido ao rolar
    const header = document.querySelector("header")
  
    function checkHeader() {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
      } else {
        header.style.backgroundColor = "transparent"
      }
    }
  
    window.addEventListener("scroll", checkHeader)
    window.addEventListener("load", checkHeader)
  })
  
  