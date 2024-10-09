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
  const observer = new IntersectionObserver((entries) => {
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

let currentSection = 0; // Номер поточної секції
const sections = document.querySelectorAll(".fullscreen-section");
let isScrolling = false; // Змінна для контролю прокрутки

// Функція для переходу до секції
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

// Обробка прокрутки мишкою та переходу за посиланнями
function handleScroll(event) {
  if (!isScrolling) {
    // Перевіряємо, чи не прокручуємо
    if (event.deltaY > 0 || event.type === "click") {
      // Прокрутка вниз або перехід за посиланням
      currentSection = Math.min(currentSection + 1, sections.length - 1);
    } else if (event.deltaY < 0) {
      // Прокрутка вгору
      currentSection = Math.max(currentSection - 1, 0);
    }
    scrollToSection(currentSection);
    if (event.type === "wheel") {
      event.preventDefault(); // Запобігає стандартній прокрутці
    }
  }
}

// Додати обробку події прокрутки
window.addEventListener("wheel", handleScroll);

// Додати обробку переходу за посиланнями
menuLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Зупинити стандартну поведінку
    const targetId = this.getAttribute("href").substring(1); // Отримати id секції
    const targetIndex = Array.from(sections).findIndex(
      (section) => section.id === targetId
    );
    if (targetIndex !== -1) {
      currentSection = targetIndex; // Оновлюємо currentSection
      scrollToSection(currentSection);
    }
  });
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
