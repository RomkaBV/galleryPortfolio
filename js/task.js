import { galleryItems } from "./gallery-items.js";

//  Рендерим з масиву каринки на HTML сторінку
const galleryCard = document.querySelector(".section__gallery");
const onAddGalleryCard = onAddGallery(galleryItems);
galleryCard.insertAdjacentHTML("beforeend", onAddGalleryCard);

function onAddGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
            <li class="section__gallery__item">
               <a class="section__gallery__link" href="">
               <img class="section__gallery__image" src="${preview}" alt="${description}" data-source="${original}">
               </a>
            </li>
`;
    })
    .join("");
}

// Рендерим з масиву картинки на модалку

const galleryModalCard = document.querySelector(".modal__col");
const onAddModalGallery = onAddGalleryModal(galleryItems);
galleryModalCard.insertAdjacentHTML("beforeend", onAddModalGallery);

function onAddGalleryModal(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div    data-sourse="${original}">
                <img class="modal__image" src="${preview}" data-sourse="${original}" alt="${description}" width="156px" height="156px">
</div>`;
    })
    .join("");
}

galleryCard.addEventListener("click", onHandleImgClick);
const originalSizeImg = document.querySelector(".modal-img");

const modalImg = document.querySelectorAll(".modal__image");
const backdrop = document.querySelector(".container__backdrop");
const battomLeftClick = document.querySelector(
  "button[data-action='next-modal']"
);
const battomRightClick = document.querySelector(
  "button[data-action='prev-modal']"
);
// console.log(modalImg);
const sliderCartLine = document.querySelector(".modal__col");
backdrop.addEventListener("click", onCloseBacdromClick);
battomRightClick.addEventListener("click", onRightArrowKeyPress);
battomLeftClick.addEventListener("click", onLeftArrowKeyPress);

let targetEl;
let index;
let previewSizeImg;
let count = 0;

function onHandleImgClick(evt) {
  previewSizeImg = evt.target.src;
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  onOpenModal(evt);
  onSearchModalImg(evt.target.dataset.source);
  onHandleCloseModalClick();
}

function onOpenModal(e) {
  window.addEventListener("keydown", onLeftArrowKeyPress);
  window.addEventListener("keydown", onRightArrowKeyPress);
  addImgIntoModal(e);
  window.addEventListener("keydown", onKeypress);
  document.body.classList.add("show-modal");
  test(e.target.dataset.source);
}
function onKeypress(evt) {
  if (evt.code === "Escape") {
    onCloseModal();
  }
}
function onSearchModalImg(url) {
  originalSizeImg.src = url;
}
function onHandleCloseModalClick() {
  const buttom = document.querySelector("button[data-action='close-modal']");
  buttom.addEventListener("click", onCloseModal);
}
function onCloseModal() {
  window.removeEventListener("keydown", onKeypress);
  window.removeEventListener("keydown", onLeftArrowKeyPress); //
  window.removeEventListener("keydown", onRightArrowKeyPress); //
  index = undefined;
  test2();
  originalSizeImg.src = "";
  document.body.classList.remove("show-modal");
}

function onCloseBacdromClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}
function addImgIntoModal(e) {
  // console.log(e.target.src);

  previewSizeImg = e.target;

  targetEl = e.target.dataset.source; // !Зчитуємо в звичайній галереї на картинці  data-source(Силка на велике фото при відкритті модалки)
  originalSizeImg.src = e.target.dataset.source; // ! Передаємо і тег img  силку на велике фото
  originalSizeImg.alt = e.target.alt; // ! Передали в тег img alt на велике фото
}

function onLeftArrowKeyPress(event) {
  //!Функція при нажиманні на клавіатурі кнопки вліво
  const arrayOfOriginLinks = galleryItems.map((item) => item.original); //! отримали масив силок на велике фото
  const arrayOfPreviewLinks = galleryItems.map((item) => item.preview);

  if (index === undefined) {
    //! Умова якщо індекс undefined   Шукаємо силку на велике фото відкритого зараз в модалці. Та присвоюємо в зміннну індекс значення індексу
    index = arrayOfOriginLinks.indexOf(targetEl); //!
  }

  if (event.code === "ArrowLeft") {
    //! При нажиманні кнопки вліво, перевіряємо значення індекс, якщо воно ноль міняємо індекс на елемент який знаходиться в кінці
    if (index === 0) {
      index = arrayOfOriginLinks.length;
    }

    index -= 1; //! Після перевірок зменшуємо індекс на одиницю
    originalSizeImg.src = arrayOfOriginLinks[index]; //! передаємо  у силку на велике фото в модалку наступного індексу
  }
  if (index === 0) {
    index = arrayOfOriginLinks.length;
  }

  index -= 1; //! Після перевірок зменшуємо індекс на одиницю
  originalSizeImg.src = arrayOfOriginLinks[index]; //! передаємо  у силку на велике фото в модалку наступного індексу

  test(arrayOfOriginLinks[index]);
}

function onRightArrowKeyPress(event) {
  const arrayOfOriginLinks = galleryItems.map((item) => item.original);
  if (index === undefined) {
    index = arrayOfOriginLinks.indexOf(targetEl);
  }

  if (event.code === "ArrowRight") {
    if (index === arrayOfOriginLinks.length - 1) {
      index = -1;
    }

    index += 1;
    originalSizeImg.src = arrayOfOriginLinks[index];
    modalImg.src = arrayOfOriginLinks[index];
  }
  if (index === arrayOfOriginLinks.length - 1) {
    index = -1;
  }
  index += 1;
  originalSizeImg.src = arrayOfOriginLinks[index];

  test(arrayOfOriginLinks[index]);
}

function test(b) {
  const test = document.querySelector(`div[data-sourse='${b}']`);
  const test2 = document.querySelector(`img[data-sourse='${b}']`);
  const test3 = document.querySelectorAll(`.test`);
  const test4 = document.querySelectorAll(`.modal__image.test2`);
  for (const iterator of test3) {
    if (iterator.dataset.source !== b) {
      iterator.classList.remove("test");
    }
  }
  for (const iterator of test4) {
    if (iterator.dataset.source !== b) {
      iterator.classList.remove("test2");
    }
  }
  test.classList.add("test");
  test2.classList.add("test2");
}

function test2() {
  const test2 = document.querySelectorAll(`.modal__image.test2`);
  const test = document.querySelectorAll(`.test`);

  for (const iterator of test2) {
    iterator.classList.remove("test2");
  }
  for (const iterator of test) {
    iterator.classList.remove("test");
  }
}

const modalColEl = document.querySelector(".modal__col");
modalColEl.addEventListener("click", modalClickImg);
function modalClickImg(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  console.log(e.target);

  onSearchModalImg(e.target.dataset.sourse);
  test(e.target.dataset.sourse);
}
// test.classList.toggle("test");

//}
//;

// const rowGallery = document.querySelectorAll(".modal__col>.modal__column");
// const imageGallery = document.querySelectorAll(".modal__image");

// for (const iterator of imageGallery) {
//   let b = [];
//   b.push(iterator.src);
//   let test = b.join("");
//   if (
//     previewSizeImg ===
//     "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg"
//   ) {
//     console.log("test2");
//   }
// }

// const buttonNext = document
//   .querySelector(".button__next")
//   .addEventListener("click", onButtonNextClick);
// const buttonPrev = document
//   .querySelector(".button__prev")
//   .addEventListener("click", onButtonPrevClick);

function onButtonNextClick(evt) {
  // console.log(count);

  if (count === -1280) {
    count = 256;
  }
  count -= 256;
  sliderCartLine.style.left = `${count}px`;
}
function onButtonPrevClick(evt) {
  // console.log(count);
  if (count === 0) {
    count = -1536;
  }
  count += 256;
  sliderCartLine.style.left = `${count}px`;
}
