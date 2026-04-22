// Student Number: 12345678

const makes = ["VW", "BMW", "Benz", "Audi", "Ford", "Toyota"];

const cars = [
  {
    name: "Cabriolet",
    type: "Cars",
    make: "Ford",
    images: ["images/fordCabriolet.webp"]
  },
  {
    name: "Beetle",
    type: "Cars",
    make: "VW",
    images: ["images/beetleVW.webp"]
  },
  {
    name: "3 Series E30",
    type: "Cars",
    make: "BMW",
    images: ["images/bmw3SeriesE30.jpg"]
  },
  {
    name: "300SL Gullwing",
    type: "Cars",
    make: "Benz",
    images: ["images/benzGullwing.webp"]
  },
  {
    name: "Quattro",
    type: "Cars",
    make: "Audi",
    images: ["images/audiQuattro.jpg"]
  },
  {
    name: "Land Cruiser FJ40",
    type: "Cars",
    make: "Toyota",
    images: ["images/toyotaLandCruiser.jpeg"]
  },
  // Student-added car 1:
  {
    name: "Corolla KE20",
    type: "Cars",
    make: "Toyota",
    images: ["images/toyotaCorolla.jpg"]
  },
  // Student-added car 2:
  {
    name: "Thunderbird",
    type: "Cars",
    make: "Ford",
    images: ["images/fordThunderbird.jpeg"]
  }
];

let currentCar = null;
let correctCount = 0;
let totalCount = 0;

// Populate the #make-list dropdown with car makes
function populateMakes() {
  var makeList = document.getElementById("make-list");
  for (var i = 0; i < makes.length; i++) {
    var option = document.createElement("option");
    option.value = i;           // unique value attribute per spec
    option.textContent = makes[i];
    makeList.appendChild(option);
  }
}

// Pick a random car from the cars array
function getRandomCar() {
  var index = Math.floor(Math.random() * cars.length);
  return cars[index];
}

// Display a car's name, type and image on the page
function displayCar(car) {
  document.getElementById("car-name").textContent = car.name;
  document.getElementById("car-type").textContent = car.type;

  var img = document.getElementById("car-img");
  // If the car has only one image, use it as the source
  img.src = car.images[0];
  // Remove the hidden class so the image is visible
  img.classList.remove("hidden");
}

// Enable the guess button by removing the disabled class
function enableGuessBtn() {
  document.getElementById("guess-btn").classList.remove("disabled");
}

// Disable the guess button by adding the disabled class
function disableGuessBtn() {
  document.getElementById("guess-btn").classList.add("disabled");
}

// Handle a guess when the user clicks the Guess! button
function handleGuess() {
  // Disable the button immediately on click
  disableGuessBtn();

  // Get the currently selected make name from the dropdown
  var makeList = document.getElementById("make-list");
  var selectedMake = makes[parseInt(makeList.value)];

  // Check if the guess matches the current car's make
  if (selectedMake === currentCar.make) {
    correctCount++;
    document.getElementById("count").textContent = correctCount;  // #count per HTML spec
  }

  // Always increment total guesses regardless of correctness
  totalCount++;
  document.getElementById("total").textContent = totalCount;

  // Select a new random car and update the display
  currentCar = getRandomCar();
  displayCar(currentCar);

  // Re-enable the guess button once the new car is shown
  enableGuessBtn();
}

// Initialise everything once the page has fully loaded
window.addEventListener("DOMContentLoaded", function () {
  populateMakes();

  // Select and display the first random car
  currentCar = getRandomCar();
  displayCar(currentCar);

  // Enable the guess button (removes the initial disabled class)
  enableGuessBtn();

  // Attach the click handler to the guess button
  document.getElementById("guess-btn").addEventListener("click", handleGuess);

  const img = document.getElementById("car-img");

  img.src = cars.images[0];
});
