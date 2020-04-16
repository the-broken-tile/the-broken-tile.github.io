import { days } from './data.js';
import repository from './repository.js';
import EventDispatcher from './EventDispatcher.js';
import { NewButtonClickedEvent, CreateGameEvent } from './Event';
import EventRegistry from './EventRegistry.js'
// let game = repository.load('game') || {
//     day: 0,
// };
// const ACTIVE_CLASS = 'active';
//
// //init wheel.
// const $wheel = document.getElementById('wheel');
// const initWheel = () => {
//     days.forEach(day => {
//         $wheel.innerHTML += '<span class="day ' + day.illuminated + '"></span>';
//     });
// };
// const updateWheel = () => {
//     days.forEach(day => {
//         $wheel.classList.toggle('illuminated-' + day.illuminated, day.id === game.day);
//     });
// };
// initWheel();
// updateWheel();
// $wheel.addEventListener('click', e => {
//     game.day +=1;
//     game.day = game.day % days.length;
//     updateWheel();
// });
EventRegistry.register();
document.getElementById('button-new').addEventListener('click', () => {
    EventDispatcher.dispatch(new NewButtonClickedEvent())
});
document.getElementById('button-create').addEventListener('click', () => {
    EventDispatcher.dispatch(new CreateGameEvent());
});