// const onHandleStart = () => {
//   const startTime = Date.now();

//   updateClockface(0);

//   const intervalId = setInterval(() => {
//     const currentTime = Date.now();
//     const deltaTime = currentTime - startTime;

//     // console.log('deltaTime :>> ', deltaTime);
//   }, 1000);
// };

// const onHandleWait = () => {};

// const onHandleReset = () => {
//   clearInterval(this.intervalId);
//   updateClockface(0);
// };

/*
 * - Принимает время в миллисекундах
 * - Высчитывает сколько в них вмещается часов/минут/секунд
 * - Возвращает обьект со свойствами hours, mins, secs
 */
// const updateClockface = time => {
//   const hours = pad(
//     Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//   );
//   const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//   const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
//   return { hours, mins, secs };
// };

/*
 * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
 */
// const pad = value => {
//   return String(value).padStart(2, '0');
// };

{
  /* <p className={styles.clockface}>{`${hours}:${mins}:${secs}`}</p> */
}
