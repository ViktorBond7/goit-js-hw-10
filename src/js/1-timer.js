import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputPicker = document.querySelector('#datetime-picker');
const buttonRef = document.querySelector('button');
const timerDay = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const resTime = selectedDate.getTime() - new Date().getTime();
    const renderTime = convertMs(resTime);

    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      buttonRef.setAttribute('disablet', true);
    } else {
      buttonRef.removeAttribute('disablet');
      userSelectedDate = selectedDate;
    }

    timerDay.textContent = `${renderTime.days}`;
    timerHours.textContent = `${renderTime.hours}`;
    timerMinutes.textContent = `${renderTime.minutes}`;
    timerSeconds.textContent = `${renderTime.seconds}`;
  },
};
// console.log(userSelectedDate);

const datePicker = flatpickr(inputPicker, options);

buttonRef.addEventListener('click', () => {
  // datePicker.config.defaultDate = new Date();

  const currentDateTime = new Date();
  const selectedDateTime = userSelectedDate.getTime();
  console.log(selectedDateTime);

  const timeInterval = setInterval(() => {
    let different = selectedDateTime - currentDateTime;

    const result = convertMs(different);
    if (different <= 0) {
      clearInterval(timeInterval);
    } else {
      timerDay.textContent = `${result.days}`;
      timerHours.textContent = `${result.hours}`;
      timerMinutes.textContent = `${result.minutes}`;
      timerSeconds.textContent = `${result.seconds}`;
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
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
