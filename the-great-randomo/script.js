const first = ["Tiny Epic", "Race for", "Rising", "Russian", "Gloom", "Time", "A Feast for", "The Quacks of", "Arkham", "Dominion:", "Architects of", "Star", "Dead of", "War of", "Le", "El", "Gaia", "Tigris &", "Puerto", "Terraforming", "Lords of", "Aeon's", "Mansions of", "Twilight", "Pandemic", "7", "Terra", "Five", "Power", "Raiders of", "Fields of", "Clans of", "Forbidden", "Wing", "Roll for", "Stone", "Code", "Champions of", "Battlestar", "Eldritch", "Blood", "Spirit", "Kingdom", "Underwater", "Through", "Star"];
const second = ["End", "Odin", "Wars", "the Ring", "Age", "Cities", "Wonders", "the Galaxy", "Mars", "Waterdeep", "Railroads", "Midgard", "Winter", "Madness", "Realms", "the Ages", "Mystica", "Sun", "Caledonia", "Quedlinburg", "Grid", "Euphrates", "Intrigue", "Legacy", "Grande", "stars", "Names", "Death", "Imperium", "Rage", "Island", "Arle", "Galactica", "Stories", "Span", "Tribes", "Rico", "Haven", "the West Kingdom", "Harve", "Horror", "Project", "the Galaxy", "Struggle", "the North Sea"];

const rand = max => {
  return Math.floor(Math.random() * (max + 1)); //The maximum is inclusive and the minimum is inclusive 
}
const generate = () => first[rand(first.length - 1)] + ' ' + second[rand(second.length - 1)];

const output = document.getElementById('output');
const die = document.getElementById('die');
const resultMessage = document.getElementById('result-message');
const timeout = 0.75;

document.getElementById('click').addEventListener('click', () => {
  die.style.display = 'block';
  output.innerText = '';
  resultMessage.style.display = 'block';
  setTimeout(() => {
    output.innerText = generate();    
    die.style.display = 'none';
    resultMessage.style.display = 'none';
  }, timeout * 1000)
});
