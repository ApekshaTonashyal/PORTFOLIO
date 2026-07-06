// ==========================================
// 1. TYPING EFFECT
// ==========================================
const typingEl = document.getElementById("typing");
const roles = ["Web Developer", "Machine Learning Enthusiast", "Problem Solver", "CS Student"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeDelay = 50; // faster deleting
  } else {
    typingEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeDelay = 120; // normal typing
  }

  // Handle typing lifecycle
  if (!isDeleting && charIndex === currentRole.length) {
    typeDelay = 1500; // Pause at the end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeDelay = 500; // Pause before typing next word
  }

  setTimeout(typeEffect, typeDelay);
}

// Start typing effect if element exists
if (typingEl) {
  typeEffect();
}


// ==========================================
// 2. THEME SWITCHER WITH LOCALSTORAGE
// ==========================================
const themeToggleBtn = document.getElementById("theme-toggle");
const rootHtml = document.documentElement;

// Retrieve initial theme
function initTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    rootHtml.classList.add("light");
    if (themeToggleBtn) themeToggleBtn.textContent = "🌙";
  } else {
    rootHtml.classList.remove("light");
    if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
  }
}

// Toggle theme handler
function toggleTheme() {
  if (rootHtml.classList.contains("light")) {
    rootHtml.classList.remove("light");
    themeToggleBtn.textContent = "☀️";
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    rootHtml.classList.add("light");
    themeToggleBtn.textContent = "🌙";
    localStorage.setItem("portfolio-theme", "light");
  }
  showToast("Theme changed successfully!");
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", toggleTheme);
}
initTheme();


// ==========================================
// 3. RESPONSIVE MOBILE NAVIGATION MENU
// ==========================================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

function toggleMobileMenu() {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("show");
}

if (hamburger) {
  hamburger.addEventListener("click", toggleMobileMenu);
}

// Close mobile menu when links are clicked
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (hamburger.classList.contains("active")) {
      toggleMobileMenu();
    }
  });
});


// ==========================================
// 4. PROJECT MODALS & DYNAMIC DATABASE
// ==========================================
const projectsData = {
  nutrition: {
    title: "Nutrition Deficiency Prediction",
    tags: ["Machine Learning", "Python", "Flask", "Scikit-Learn"],
    desc: "A machine learning based web application designed to predict potential human vitamin and mineral deficiencies based on user-reported physiological symptoms.",
    features: [
      "Trained on a dataset mapping symptoms like fatigue, dry skin, and mouth ulcers to nutrient lacks.",
      "Uses Naive Bayes and Linear Regression classification models to output deficiency probabilities.",
      "Intuitive questionnaire interface and dynamic dashboard visualizing results.",
      "Suggests direct dietary recommendations for each identified deficiency."
    ],
    tech: ["Python", "Flask", "HTML5", "CSS3", "JavaScript", "Pandas", "Scikit-Learn"],
    github: "https://github.com/ApekshaTonashyal",
    demo: "#sandbox" // links to interactive playground in index!
  },
  sopify: {
    title: "SOPify – Enterprise AI Writing & Documentation Assistant",
    tags: ["AI Writing", "Documentation", "LLM APIs", "Supabase", "Embeddings"],
    desc: "An enterprise-grade AI assistant for generating, editing, and organizing business documents, SOPs, and technical reports with semantic context awareness.",
    features: [
      "Generate polished SOPs, project briefs, and process documentation from natural language prompts.",
      "Context-aware rewriting, grammar enhancement, and structure optimization for professional content.",
      "Semantic search using embeddings for fast retrieval across prior documents and templates.",
      "User account management and Supabase-backed storage for collaborative documentation workflows."
    ],
    tech: ["HTML5", "CSS3 (Flexbox/Grid)", "JavaScript (ES6)", "Flask", "Supabase", "LLM / Embedding APIs"],
    github: "https://github.com/swavik/SOPify",
    demo: "#"
  },
  cryptography: {
    title: "Quantum-Resilient Adaptive Hybrid Cryptographic Framework",
    tags: ["Cryptography", "Security", "AES", "RSA", "Kyber"],
    desc: "Designed and developed a secure communication framework integrating AES, RSA, and CRYSTALS-Kyber cryptographic algorithms. Implemented adaptive encryption selection based on message risk levels and incorporated quantum-resistant security mechanisms to enhance future-proof data protection.",
    features: [
      "Integrates AES-256 for symmetric block encryption and RSA-4096 for asymmetric signatures/exchanges.",
      "Implements CRYSTALS-Kyber KEM (Key Encapsulation Mechanism) for next-generation quantum-resistant security.",
      "Engineered an adaptive encryption policy manager that assesses traffic danger levels to scale encryption strength.",
      "Optimized cryptographic pipelines for efficient message wrapping and decryption cycles."
    ],
    tech: ["Python", "C/C++", "crystals-kyber", "AES", "RSA", "Performance Profiling"],
    github: "https://github.com/ApekshaTonashyal/Quantum-Resilient-Adaptive-Hybrid-Cryptographic-Framework",
    demo: "#"
  }
};

const modalOverlay = document.getElementById("project-modal");
const modalCloseBtn = document.getElementById("modal-close");

function openModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  // Populate modal data
  document.getElementById("modal-title").textContent = data.title;

  // Tags
  const tagsContainer = document.getElementById("modal-tags");
  tagsContainer.innerHTML = "";
  data.tags.forEach(t => {
    const span = document.createElement("span");
    span.className = "project-tag";
    span.textContent = t;
    tagsContainer.appendChild(span);
  });

  // Description & Features
  document.getElementById("modal-desc").textContent = data.desc;

  const featuresList = document.getElementById("modal-features-list");
  featuresList.innerHTML = "";
  data.features.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    featuresList.appendChild(li);
  });

  const techList = document.getElementById("modal-tech-list");
  techList.innerHTML = "";
  data.tech.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    techList.appendChild(li);
  });

  // Action Buttons
  const githubBtn = document.getElementById("modal-github");
  const demoBtn = document.getElementById("modal-demo");

  githubBtn.href = data.github;
  demoBtn.href = data.demo;

  // Show modal
  modalOverlay.classList.add("show");
  document.body.style.overflow = "hidden"; // disable background scrolling
}

function closeModal() {
  modalOverlay.classList.remove("show");
  document.body.style.overflow = ""; // restore scrolling
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}
if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

// Bind details buttons dynamically
document.querySelectorAll(".view-details-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const projectId = btn.getAttribute("data-project-id");
    openModal(projectId);
  });
});


// ==========================================
// 5. PROJECT GALLERY FILTER TABS
// ==========================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Toggle active class
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      if (filterValue === "all" || cardCategory === filterValue) {
        card.style.display = "flex";
        // subtle animate-in
        card.animate([
          { opacity: 0, transform: 'scale(0.95)' },
          { opacity: 1, transform: 'scale(1)' }
        ], { duration: 300, fill: 'forwards' });
      } else {
        card.style.display = "none";
      }
    });
  });
});


// ==========================================
// 6. INTERACTIVE MACHINE LEARNING SANDBOX
// ==========================================
const symptomCheckboxes = document.querySelectorAll(".symptom-checkbox");
const resultPlaceholder = document.getElementById("result-placeholder");
const resultActive = document.getElementById("result-active");
const gaugeFill = document.getElementById("gauge-fill");
const gaugeVal = document.getElementById("gauge-val");
const diagnosisText = document.getElementById("diagnosis-text");
const diagnosisDesc = document.getElementById("diagnosis-desc");
const detailsVitamins = document.getElementById("details-vitamins");
const detailsFoods = document.getElementById("details-foods");

// Knowledge base for mock ML calculations
const symptomMapping = {
  fatigue: { iron: 0.4, vitD: 0.3, b12: 0.3 },
  hairloss: { iron: 0.3, zinc: 0.4, vitD: 0.2 },
  dryskin: { vitA: 0.4, zinc: 0.3, vitC: 0.3 },
  cramps: { magnesium: 0.5, potassium: 0.3, calcium: 0.2 },
  ulcers: { b12: 0.4, iron: 0.3, folate: 0.3 },
  poorvision: { vitA: 0.8, zinc: 0.2 }
};

const deficiencyDetails = {
  iron: {
    name: "Iron Deficiency (Anemia Risk)",
    desc: "Iron is vital for producing hemoglobin, which helps red blood cells carry oxygen. Low levels lead to exhaustion.",
    nutrients: "Iron, Vitamin C (helps absorption)",
    foods: "Spinach, Red Meat, Lentils, Pumpkin Seeds, Broccoli"
  },
  vitD: {
    name: "Vitamin D Deficiency",
    desc: "Essential for bone health, immune function, and mental well-being. Common in indoor lifestyles.",
    nutrients: "Vitamin D3, Calcium",
    foods: "Fatty Fish, Egg Yolks, Mushrooms, Fortified Milk"
  },
  b12: {
    name: "Vitamin B12 Deficiency",
    desc: "Crucial for nerve tissue health, brain function, and red blood cell production. Common in plant-based diets.",
    nutrients: "Vitamin B12, Cobalt",
    foods: "Dairy products, Eggs, Fortified Cereals, Nutritional Yeast"
  },
  zinc: {
    name: "Zinc Deficiency",
    desc: "Supports immune health, protein synthesis, cell division, and healthy skin/hair maintenance.",
    nutrients: "Zinc, Vitamin A",
    foods: "Shellfish, Chickpeas, Cashews, Pumpkin Seeds, Yogurt"
  },
  vitA: {
    name: "Vitamin A Deficiency",
    desc: "Critical for maintaining healthy vision, immune defenses, and skin integrity.",
    nutrients: "Beta-Carotene, Vitamin A",
    foods: "Carrots, Sweet Potatoes, Spinach, Cantaloupe, Eggs"
  },
  vitC: {
    name: "Vitamin C Deficiency",
    desc: "A powerful antioxidant necessary for collagen production, tissue repair, and immune response.",
    nutrients: "Vitamin C, Bioflavonoids",
    foods: "Oranges, Strawberries, Bell Peppers, Kiwi, Tomatoes"
  },
  magnesium: {
    name: "Magnesium Deficiency",
    desc: "Involved in over 300 enzyme reactions, muscle relaxation, nerve transmission, and energy production.",
    nutrients: "Magnesium, Potassium",
    foods: "Dark Chocolate, Avocados, Almonds, Black Beans"
  }
};

function calculateDeficiency() {
  const selectedSymptoms = [];
  symptomCheckboxes.forEach(cb => {
    if (cb.checked) selectedSymptoms.push(cb.value);
  });

  if (selectedSymptoms.length === 0) {
    // Show placeholder, hide active output
    resultPlaceholder.style.display = "block";
    resultActive.style.display = "none";
    return;
  }

  // Hide placeholder, show active output
  resultPlaceholder.style.display = "none";
  resultActive.style.display = "block";

  // Score mapping
  const scores = {
    iron: 0,
    vitD: 0,
    b12: 0,
    zinc: 0,
    vitA: 0,
    vitC: 0,
    magnesium: 0
  };

  selectedSymptoms.forEach(symptom => {
    const weights = symptomMapping[symptom];
    if (weights) {
      for (const [key, val] of Object.entries(weights)) {
        if (scores[key] !== undefined) {
          scores[key] += val;
        }
      }
    }
  });

  // Find deficiency with the highest score
  let maxDeficiency = "iron";
  let maxScore = -1;
  for (const [key, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxDeficiency = key;
    }
  }

  // Calculate dynamic mock confidence value
  // Confidence goes up with more symptoms checked, capping at 92%
  const baseConfidence = 45;
  const symptomMultiplier = Math.min(selectedSymptoms.length * 12, 47);
  const confidencePercent = Math.round(baseConfidence + symptomMultiplier);

  // Retrieve details
  const details = deficiencyDetails[maxDeficiency];

  // Render results
  diagnosisText.textContent = details.name;
  diagnosisDesc.textContent = details.desc;
  detailsVitamins.textContent = details.nutrients;
  detailsFoods.textContent = details.foods;
  gaugeVal.textContent = `${confidencePercent}%`;

  // Update SVG Gauge radial progress
  const circumference = 439.6; // 2 * PI * 70
  const dashOffset = circumference - (confidencePercent / 100) * circumference;
  gaugeFill.style.strokeDashoffset = dashOffset;
}

// Bind event listeners to sandbox inputs
symptomCheckboxes.forEach(cb => {
  cb.addEventListener("change", calculateDeficiency);
});


// ==========================================
// 7. CONTACT FORM SUBMISSION HANDLER
// ==========================================
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form inputs
    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const subject = document.getElementById("form-subject").value.trim();
    const message = document.getElementById("form-message").value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    // Trigger simulation of mailing
    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending message...";
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast(`Thank you, ${name}! Your message was sent successfully.`, "success");
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1200);
  });
}


// ==========================================
// 8. TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast glass-panel toast-${type}`;

  // Success checkmark SVG icon
  const successIcon = `
    <svg class="toast-success-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `;

  // Info bubble SVG icon
  const infoIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  `;

  toast.innerHTML = `
    ${type === 'success' ? successIcon : infoIcon}
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger browser paint to slide in
  setTimeout(() => {
    toast.classList.add("show");
  }, 50);

  // Remove toast after duration
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}


// ==========================================
// 9. SCROLL INTERSECTION OBSERVER
// ==========================================
const faders = document.querySelectorAll(".fade-section");
const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(f => {
  appearOnScroll.observe(f);
});
