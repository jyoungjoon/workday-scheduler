const currentTime = document.querySelector(`#currentTime`);
const modal = document.querySelector(`.modalWindow`);
const overlay = document.querySelector(`.overlay`);
const btnCloseModal = document.querySelector(`.closeBtn`);

// Use dayjs to grab current hour:
let hourNow = dayjs().hour();

// Display current date and time; it is dynamically updated every second:
setInterval(function () {
  let timeNow = dayjs();
  currentTime.innerHTML = timeNow.format(`dddd, MMMM D, YYYY, hh:mm:ss A`);
});

// Display modal if user has not seen it before:
if (localStorage.getItem(`no_display`) !== `true`) {
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
}

// Load data from local storage and set time block colors when page is loaded:
loadStorage();
setHourColors();

// Save data to local storage when save button is clicked:
$(`.saveBtn`).on(`click`, saveStorage);

// Set color of time blocks based on hourNow variable:
function setHourColors() {
  for (let i = 9; i <= 17; i++) {
    let time = $(`#hour-` + i);
    if (hourNow > i) {
      time.addClass(`past`);
    } else if (hourNow === i) {
      time.addClass(`present`);
    } else {
      time.addClass(`future`);
    }
  }
}

// Local storage functions for loading data:
function loadStorage() {
  localStorage.setItem(`no_display`, `true`)
  for (let i = 9; i <= 17; i++) {
    let hour = $(`#hour-` + i);
    let text = localStorage.getItem(hour.attr(`id`));
    hour.children(`.description`).val(text);
  }
}

// Local storage functions for saving data:
function saveStorage() {
  let hour = $(this).parent().attr(`id`);
  let text = $(this).siblings(`.description`).val();
  localStorage.setItem(hour, text);
}

// Modal functions:
const closeModal = function () {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
  localStorage.setItem(`no_display`, `true`);
};

// Open modal when user clicks on the close button or the overlay:
btnCloseModal.addEventListener(`click`, closeModal);
overlay.addEventListener(`click`, closeModal);

// Close modal when user presses the escape key:
document.addEventListener(`keydown`, function (event) {
  if (event.key === `Escape` && !modal.classList.contains(`hidden`)) {
    closeModal();
  }
  localStorage.setItem(`no_display`, `true`);
});
