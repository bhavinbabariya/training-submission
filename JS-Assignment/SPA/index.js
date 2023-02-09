const home = document.querySelector(".containerr");
const about = document.getElementById("about-us");
const contact = document.getElementById("contact-us");
const programs = document.getElementById("op-h");

const homeBtn = document.getElementById("home-btn");
const auBtn = document.getElementById("au-btn");
const cuBtn = document.getElementById("cu-btn");
const opBtn = document.getElementById("op-btn");

const header = document.querySelector("header");
homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Another Method for scrolling

    /*  home.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
      });    */
    window.scrollTo(0,0)
});

auBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const aboutCoords = about.getBoundingClientRect(); 
    window.scrollTo(aboutCoords.left+window.pageXOffset,aboutCoords.top+window.pageYOffset-100);
    
});

cuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const contactCoords = contact.getBoundingClientRect(); 
    window.scrollTo(contactCoords.left+window.pageXOffset,contactCoords.top+window.pageYOffset);
 
});

opBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const programsCoords = programs.getBoundingClientRect(); 
    window.scrollTo(programsCoords.left+window.pageXOffset,programsCoords.top+window.pageYOffset-50);
});

// -----------Slider--------------------

const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');
  
    let curSlide = 0;
    const maxSlide = slides.length;
  
    // Functions
    const createDots = function () {
      slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
          'beforeend',
          `<button class="dots__dot" data-slide="${i}"></button>`
        );
      });
    };
  
    const activateDot = function (slide) {
      document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));
  
      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
    };
  
    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      );
    };
  
    // Next slide
    const nextSlide = function () {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
  
      goToSlide(curSlide);
      activateDot(curSlide);
    };
  
    const prevSlide = function () {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
    };
  
    const init = function () {
      goToSlide(0);
      createDots();
  
      activateDot(0);
    };
    init();
  
    // Event handlers
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);
  
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') prevSlide();
      e.key === 'ArrowRight' && nextSlide();
    });
  
    dotContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });
  };
  slider();