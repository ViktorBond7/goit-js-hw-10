import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputPicker = document.querySelector('#datetime-picker');
const buttonRef = document.querySelector('button');
const timerDay = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
buttonRef.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      izitoast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    } else {
      userSelectedDate = selectedDates[0];
      buttonRef.disabled = false;
    }
  },
};

const datePicker = flatpickr(inputPicker, options);
inputPicker.addEventListener('focus', () => {
  datePicker.config.defaultDate = new Date();
});
buttonRef.addEventListener('click', event => {
  event.preventDefault();
  buttonRef.disabled = true;
  const selectedDateTime = userSelectedDate.getTime();

  const timeInterval = setInterval(() => {
    const currentDateTime = new Date().getTime();
    let different = selectedDateTime - currentDateTime;
    const result = convertMs(different);

    timerDay.textContent = `${result.days}`;
    timerHours.textContent = `${result.hours}`;
    timerMinutes.textContent = `${result.minutes}`;
    timerSeconds.textContent = `${result.seconds}`;

    if (different <= 1000) {
      clearInterval(timeInterval);
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = String(Math.floor(ms / day)).padStart(2, '0');
  // Remaining hours
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  // Remaining minutes
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(
    2,
    '0'
  );
  // Remaining seconds
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, '0');

  return { days, hours, minutes, seconds };
}
