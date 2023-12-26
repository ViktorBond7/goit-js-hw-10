import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formRes = document.querySelector('.form');

formRes.addEventListener('submit', event => {
  event.preventDefault();

  const delay = formRes.elements.delay.value;
  const meaningRad = formRes.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (meaningRad == 'fulfilled') {
        resolve(`success`);
      } else {
        reject(`error`);
      }
    }, delay);
    formRes.reset();
  });
  promise
    .then(value => {
      iziToast.success({
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay} ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: `❌ Rejected promise in ${delay} ms`,
      });
    });
});
