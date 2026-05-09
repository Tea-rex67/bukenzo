document.addEventListener("DOMContentLoaded", () => {

  // BOOKING SYSTEM FUNCTIONALITY
  if (document.querySelector('.booking-hero')) {
    const sections = document.querySelectorAll('.booking-section');
    const serviceCards = document.querySelectorAll('[data-service]');
    const nextBtns = document.querySelectorAll('.btn-next');
    const backBtns = document.querySelectorAll('.btn-back');
    const cancelBtn = document.querySelector('.btn-cancel');
    const confirmBtn = document.querySelector('.btn-confirm');
    const form = document.querySelector('.booking-form');
    const bookingData = {};

    // Service selection
    serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        serviceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        bookingData.service = card.dataset.service;
        bookingData.price = card.dataset.price;
        document.querySelector('.btn-next').disabled = false;
      });
    });

    // Next button
    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.querySelector('.booking-section.active');
        const nextSection = current.nextElementSibling;
        if (nextSection && nextSection.classList.contains('booking-section')) {
          current.classList.remove('active');
          nextSection.classList.add('active');
          if (bookingData.service) {
            updateSummary();
          }
        }
      });
    });

    // Back button
    backBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.querySelector('.booking-section.active');
        const prevSection = current.previousElementSibling;
        if (prevSection && prevSection.classList.contains('booking-section')) {
          current.classList.remove('active');
          prevSection.classList.add('active');
        }
      });
    });

    // Cancel
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        if (confirm('Cancel booking?')) {
          window.location.href = 'home.html';
        }
      });
    }

    // Confirm
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const formData = new FormData(form);
        bookingData.name = form.querySelector('input[type="text"]').value;
        bookingData.email = form.querySelector('input[type="email"]').value;
        bookingData.phone = form.querySelector('input[type="tel"]').value;
        bookingData.date = form.querySelector('input[type="date"]').value;
        bookingData.time = form.querySelector('input[type="text"]:nth-of-type(2)').value;
        bookingData.notes = form.querySelector('textarea').value;
        bookingData.payment = document.querySelector('input[name="payment"]:checked').value;

        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        
        const confirmSection = document.querySelector('#confirm');
        confirmSection.querySelector('.confirm-summary').innerHTML = `
          <p><strong>Service:</strong> ${bookingData.service}</p>
          <p><strong>Price:</strong> $${bookingData.price}</p>
          <p><strong>Name:</strong> ${bookingData.name}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Date/Time:</strong> ${bookingData.date} ${bookingData.time}</p>
          <p><strong>Payment:</strong> ${bookingData.payment}</p>
        `;
        
        const current = document.querySelector('.booking-section.active');
        current.classList.remove('active');
        confirmSection.classList.add('active');
      });
    }

    function updateSummary() {
      document.querySelector('.service-name').textContent = bookingData.service;
      document.querySelector('.service-price').textContent = `$${bookingData.price}`;
      document.querySelector('.total-price').textContent = `$${bookingData.price}`;
    }

    // Load previous data
    const saved = localStorage.getItem('bookingData');
    if (saved) {
      const data = JSON.parse(saved);
      const savedCard = document.querySelector(`[data-service="${data.service}"]`);
      if (savedCard) {
        savedCard.classList.add('selected');
        document.querySelector('.btn-next').disabled = false;
        bookingData.service = data.service;
        bookingData.price = data.price;
      }
    }
  }

  /* ============================
     MOBILE MENU
  ============================ */
  const hamburger = document.querySelector("#hamburger");
  const mobileMenu = document.querySelector("#mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
    });

    // Close when clicking a link
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });

    // Close menu on desktop resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
    });
  }

  /* ============================
     TESTIMONIAL SLIDER
  ============================ */
  const track = document.querySelector(".ts-track");
  const cards = document.querySelectorAll(".ts-card:not(.clone)");
  const prev = document.querySelector(".ts-prev");
  const next = document.querySelector(".ts-next");
  const dotsContainer = document.querySelector(".ts-dots");

  if (track && cards.length && prev && next && dotsContainer) {
    let index = 0;
    let autoSlide;

    function visibleSlides() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    function createDots() {
      dotsContainer.innerHTML = "";
      cards.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);

        dot.addEventListener("click", () => {
          index = i;
          moveSlider();
          restartAutoSlide();
        });
      });
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll("span");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    function moveSlider() {
      const visible = visibleSlides();
      const shift = index * (100 / visible);
      track.style.transform = `translateX(-${shift}%)`;
      updateDots();
    }

    next.addEventListener("click", () => {
      index++;
      if (index >= cards.length) index = 0;
      moveSlider();
      restartAutoSlide();
    });

    prev.addEventListener("click", () => {
      index--;
      if (index < 0) index = cards.length - 1;
      moveSlider();
      restartAutoSlide();
    });

    function startAutoSlide() {
      autoSlide = setInterval(() => {
        index++;
        if (index >= cards.length) index = 0;
        moveSlider();
      }, 5000);
    }

    function restartAutoSlide() {
      clearInterval(autoSlide);
      startAutoSlide();
    }

    window.addEventListener("resize", () => {
      moveSlider();
    });

    createDots();
    moveSlider();
    startAutoSlide();
  }

  /* ============================
     APPOINTMENT BUTTON SCROLL
  ============================ */
  const appointmentBtn = document.querySelector(".hero1-btn");
  const appointmentSection = document.querySelector(".hero1");

  if (appointmentBtn && appointmentSection) {
    appointmentBtn.addEventListener("click", (e) => {
      e.preventDefault();
      appointmentSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ============================
     FIXED NAVBAR ON SCROLL
  ============================ */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    // Hero in both index.html and form.html is the header/hero itself
    // Next section differs by page:
    // - index.html: first section after hero is #about-section
    // - form.html: appointment section is #appointment-section
    const nextSection =
      document.querySelector('#about-section') ||
      document.querySelector('#appointment-section');

    const getThreshold = () => {
      if (!nextSection) return Infinity;
      // Use the top of next section as the trigger point
      const rect = nextSection.getBoundingClientRect();
      return rect.top + window.pageYOffset;
    };

    let threshold = getThreshold();

    const applyState = () => {
      const shouldBeScrolled = window.pageYOffset >= threshold - 1;
      navbar.classList.toggle('is-scrolled', shouldBeScrolled);
    };

    applyState();

    window.addEventListener('scroll', applyState, { passive: true });
    window.addEventListener('resize', () => {
      threshold = getThreshold();
      applyState();
    });
  }
});



  const faqs = document.querySelectorAll(".faq-item");

  // FAQ handlers (only if we are actually on a page that contains them)
  if (faqs.length) {

    faq.querySelector(".faq-question").addEventListener("click", () => {

      // Close others
      faqs.forEach(item => {
        if (item !== faq) item.classList.remove("active");
      });

      // Toggle current
      faq.classList.toggle("active");
    });




  const faq = document.querySelectorAll(".faq-item");

  faqs.forEach(faq => {
    faq.querySelector(".faq-question").addEventListener("click", () => {
      faq.classList.toggle("active");
    });
  });


  const form = document.getElementById("appointmentForm");
  const formBlock = document.getElementById("formBlock");
  const successBlock = document.getElementById("successBlock");
  const errorBanner = document.getElementById("apptErrorBanner");
  const summaryList = document.getElementById("apptSummaryList");

  function getFieldValue(name) {
    const el = form ? form.querySelector(`[name="${name}"]`) : null;
    return el ? String(el.value || "").trim() : "";
  }

  function showError(messages) {
    if (!errorBanner) return;
    errorBanner.innerHTML = "";
    const ul = document.createElement("ul");
    ul.style.margin = "0";
    ul.style.paddingLeft = "18px";

    messages.forEach((m) => {
      const li = document.createElement("li");
      li.textContent = m;
      ul.appendChild(li);
    });

    errorBanner.appendChild(ul);
    errorBanner.style.display = "block";
  }

  function hideError() {
    if (!errorBanner) return;
    errorBanner.innerHTML = "";
    errorBanner.style.display = "none";
  }

  function renderSummary(data) {
    if (!summaryList) return;
    summaryList.innerHTML = "";
    const items = [
      { label: "Name", value: data.firstName + " " + data.lastName },
      { label: "Email", value: data.email },
      { label: "Phone", value: data.phone },
      { label: "Date", value: data.appointmentDate },
      { label: "Time", value: data.appointmentTime },
      { label: "Event", value: data.message },
    ];

    items.forEach((it) => {
      const li = document.createElement("li");
      li.textContent = `${it.label}: ${it.value}`;
      summaryList.appendChild(li);
    });
  }

  if (form && formBlock && successBlock) {
    successBlock.style.display = "none";

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const data = {
        firstName: getFieldValue("firstName"),
        lastName: getFieldValue("lastName"),
        email: getFieldValue("email"),
        phone: getFieldValue("phone"),
        appointmentDate: getFieldValue("appointmentDate"),
        appointmentTime: getFieldValue("appointmentTime"),
        message: getFieldValue("message"),
      };

      const errors = [];
      if (!data.firstName) errors.push("First name is required.");
      if (!data.lastName) errors.push("Last name is required.");
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Please enter a valid email.");
      if (!data.phone) errors.push("Phone number is required.");
      if (!data.appointmentDate) errors.push("Appointment date is required.");
      if (!data.appointmentTime) errors.push("Preferred time is required.");
      if (!data.message) errors.push("Please describe your event.");

      if (errors.length) {
        hideError();
        showError(errors);
        successBlock.classList.remove("appt-success-anim");
        successBlock.style.display = "none";
        formBlock.style.display = "block";
        return;
      }

      hideError();

      // Save last submission for UX convenience
      try {
        localStorage.setItem(
          "lastAppointmentRequest",
          JSON.stringify({ ...data, submittedAt: new Date().toISOString() })
        );
      } catch (err) {
        // ignore storage issues
      }

      renderSummary(data);

      formBlock.style.display = "none";
      successBlock.style.display = "block";
      successBlock.classList.remove("appt-success-anim");
      // re-trigger animation
      void successBlock.offsetWidth;
      successBlock.classList.add("appt-success-anim");
    });
  }



  const overlay = document.getElementById("bookingOverlay");
  const modal = document.getElementById("bookingModal");

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  const nextBtn = document.getElementById("nextBtn");

  const serviceItems = document.querySelectorAll(".service-item");
  const selectedService = document.getElementById("selectedService");
  const servicePrice = document.getElementById("servicePrice");
  const totalPrice = document.getElementById("totalPrice");

  let chosenService = null;
  let chosenPrice = 0;

  // Show modal on load
  window.onload = () => {
    overlay.classList.add("active");
    modal.classList.add("active");
    step1.classList.add("active");
  };

  // Select service
  serviceItems.forEach(item => {
    item.addEventListener("click", () => {
      serviceItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      chosenService = item.dataset.name;
      chosenPrice = item.dataset.price;

      selectedService.textContent = chosenService;
      servicePrice.textContent = chosenPrice;
      totalPrice.textContent = chosenPrice;
    });
  });

  // Next button
  nextBtn.addEventListener("click", () => {
    if (!chosenService) {
      alert("Please select a service first.");
      return;
    }

    step1.classList.remove("active");
    step2.classList.add("active");
  });


document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
  };

 
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const currentHash = window.location.hash;

  links.forEach(link => {
    const href = link.getAttribute("href");

    link.classList.remove("active");

    // 👉 FULL PAGE LINKS (Home, Contact)
    if (!href.includes("#")) {
      const linkPage = href.split("/").pop();

      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    }

    // 👉 SECTION LINKS (index.html#about-section etc.)
    if (href.includes("#")) {
      const [page, hash] = href.split("#");

      if (currentPage === "index.html") {
        // If user clicked or is on that section
        if (currentHash === "#" + hash) {
          link.classList.add("active");
        }
      }
    }

    // 👉 Default Home active (when no hash on index)
    if (
      currentPage === "index.html" &&
      !currentHash &&
      href.includes("index.html") &&
      !href.includes("#")
    ) {
      link.classList.add("active");
    }
  });

  // 👉 OPTIONAL: Highlight section while scrolling (index only)
  if (currentPage === "index.html") {
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      links.forEach(link => {
        const href = link.getAttribute("href");

        if (href.includes("#" + current)) {
          link.classList.add("active");
        } else if (href.includes("#")) {
          link.classList.remove("active");
        }
      });
    });
  }
});

document.getElementById("appointmentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = document.getElementById("appointmentForm");

  const data = {
    firstName: form.querySelector('[name="firstName"]').value,
    lastName: form.querySelector('[name="lastName"]').value,
    email: form.querySelector('[name="email"]').value,
    phone: form.querySelector('[name="phone"]').value,
    date: form.querySelector('[name="appointmentDate"]').value,
    time: form.querySelector('[name="appointmentTime"]').value,
    eventType: form.querySelector('[name="eventType"]').value,
    message: form.querySelector('[name="message"]').value
  };

  fetch("https://script.google.com/macros/s/AKfycbxmzpqXe573MRJh5-2rpJ6yrUtJXc1LhzZH5VejKYArVLeTmx1klAyGSFZskMVx0bx8/exec", {
    method: "POST",
    body: JSON.stringify(data)
  });

  // hide form
  document.getElementById("formBlock").style.display = "none";

  // show success
  document.getElementById("successBlock").style.display = "block";

  // fill summary
  document.getElementById("apptSummaryList").innerHTML = `
    <li><strong>Name:</strong> ${data.firstName} ${data.lastName}</li>
    <li><strong>Email:</strong> ${data.email}</li>
    <li><strong>Phone:</strong> ${data.phone}</li>
    <li><strong>Date:</strong> ${data.date}</li>
    <li><strong>Time:</strong> ${data.time}</li>
    <li><strong>Event:</strong> ${data.eventType}</li>
  `;

  form.reset();
});
