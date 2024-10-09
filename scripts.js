const images = document.querySelectorAll(".background-image");

images.forEach((image, index) => {
  // Випадкова початкова позиція
  image.style.left = Math.random() * window.innerWidth + "px";
  image.style.top = Math.random() * window.innerHeight + "px";

  let duration;
  switch (index) {
    case 0:
      duration = 600;
      break;
    case 1:
      duration = 500;
      break;
    case 2:
      duration = 700;
      break;
  }

  // Анімація
  setInterval(() => {
    image.style.transition = `transform ${duration}ms ease-in-out`;
    image.style.transform = "rotate(10deg) translateX(30px) "; // Поворот і переміщення вправо

    setTimeout(() => {
      image.style.transform = "rotate(-10deg) translateX(0px)"; // Поворот назад і переміщення вліво
    }, duration / 2); // Повернення на половині циклу

    // Пауза перед наступним циклом
    setTimeout(() => {
      image.style.transform = "rotate(0deg)"; // Повернення до початкового положення
    }, duration);
  }, duration * 2); // Цикл повторюється з подвоєною тривалістю
});
// Функція для створення Intersection Observer
const createObserver = () => {
  const options = {
    root: null, // Відслідковувати вікно перегляду
    threshold: 0.1, // Спрацьовує, коли 10% зображення видно
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        // Показуємо зображення, коли воно на екрані
        image.style.opacity = 1;
        // Вибираємо тривалість анімації
        let duration;
        switch (image.alt) {
          case "Background Image 1":
            duration = 2000;
            break;
          case "Background Image 2":
            duration = 2500;
            break;
          case "Background Image 3":
            duration = 3000;
            break;
        }
        // Запускаємо анімацію, якщо елемент у полі зору
        startAnimation(image, duration);
        // Зупиняємо спостереження для цього елемента після першого спрацьовування
        observer.unobserve(image);
      }
    });
  }, options);
  // Додаємо кожне зображення в спостерігач
  images.forEach((image) => {
    observer.observe(image);
  });
};
// Запускаємо створення спостерігача при завантаженні сторінки
window.onload = createObserver;

// Отримуємо всі посилання з меню
const menuLinks = document.querySelectorAll("nav.main-nav ul li a");

// Функція для оновлення активного пункту
function setActiveLink() {
  let fromTop = window.scrollY + document.querySelector("header").offsetHeight; // Висота хедера

  menuLinks.forEach((link) => {
    // Видаляємо клас active з усіх посилань
    link.classList.remove("active");

    // Отримуємо цільове місце для кожного посилання (id секції)
    let section = document.querySelector(link.hash);

    // Додаємо клас active, якщо секція у видимій області
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    }
  });
}

// Викликаємо функцію під час прокрутки
window.addEventListener("scroll", setActiveLink);

// Викликаємо функцію при завантаженні сторінки
document.addEventListener("DOMContentLoaded", setActiveLink);

document.addEventListener("DOMContentLoaded", function () {
  const langSwitcher = document.querySelector(".lang-switcher");
  const currentLangIcon = document.querySelector(".current-lang-icon");
  const otherLangIcon = document.querySelector('.lang-icon[data-lang="es"]');
  const esElements = document.querySelectorAll(".es");
  const enElements = document.querySelectorAll(".en");

  langSwitcher.addEventListener("click", function () {
    // Toggle icons' rotation animation
    currentLangIcon.classList.toggle("up");
    otherLangIcon.classList.toggle("down");

    // Swap icons after animation delay
    setTimeout(() => {
      const tempSrc = currentLangIcon.src;
      currentLangIcon.src = otherLangIcon.src;
      otherLangIcon.src = tempSrc;
      otherLangIcon.style.display = "none"; // Hide the other language icon
    }, 300); // Match animation duration

    // Toggle text display for both languages
    esElements.forEach((el) => {
      el.style.display = el.style.display === "none" ? "block" : "none";
    });
    enElements.forEach((el) => {
      el.style.display = el.style.display === "none" ? "block" : "none";
    });
  });

  // Smooth scrolling for anchor links
  const navLinks = document.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});
let currentSection = 0; // Номер поточної секції
const sections = document.querySelectorAll(".fullscreen-section");
let isScrolling = false; // Змінна для контролю прокрутки

function scrollToSection(index) {
  const targetSection = sections[index];
  if (targetSection && !isScrolling) {
    isScrolling = true; // Встановлюємо прапорець прокрутки
    // Прокрутка до вибраної секції
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    // Скидаємо прапорець після завершення прокрутки
    setTimeout(() => {
      isScrolling = false;
    }, 1000); // Час, що дорівнює тривалості анімації (можливо, налаштуйте цей час під вашу анімацію)
  }
}

// Обробка події прокрутки
window.addEventListener("wheel", (event) => {
  if (!isScrolling) {
    // Перевіряємо, чи не прокручуємо
    if (event.deltaY > 0) {
      // Прокрутка вниз
      currentSection = Math.min(currentSection + 1, sections.length - 1);
    } else {
      // Прокрутка вгору
      currentSection = Math.max(currentSection - 1, 0);
    }
    scrollToSection(currentSection);
    event.preventDefault(); // Запобігає стандартній прокрутці
  }
});

// Додати обробку клавіш (можна використовувати для навігації)
window.addEventListener("keydown", (event) => {
  if (!isScrolling) {
    // Перевіряємо, чи не прокручуємо
    if (event.key === "ArrowDown") {
      currentSection = Math.min(currentSection + 1, sections.length - 1);
    } else if (event.key === "ArrowUp") {
      currentSection = Math.max(currentSection - 1, 0);
    }
    scrollToSection(currentSection);
    event.preventDefault(); // Запобігає стандартній прокрутці
  }
});
