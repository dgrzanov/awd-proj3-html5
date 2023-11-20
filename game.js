const INITIAL_ASTEROID_COUNT = 5;
const asteroidGenerationFrequency = 5000; // U milisekundama (npr. svakih 5 sekundi)

// Dohvaćanje Canvas elementa
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Postavljanje veličine Canvasa na cijeli prozor
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

let startTime = null; // Vrijeme početka igre
let collisionDetected = false; // Varijabla koja označava da li se dogodila kolizija

// Definicija klase za igrača
class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
  }

  // Metoda za crtanje igrača
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Metoda za upravljanje igračem
  move(directionX, directionY) {
    this.x += directionX * this.speed;
    this.y += directionY * this.speed;
  }
}

// Definicija klase za asteroide
class Asteroid {
  constructor(x, y, width, height, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  // Metoda za crtanje asteroida
  draw() {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Metoda za ažuriranje položaja asteroida
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

// Funkcija za upravljanje tipkovničkim događajima
function handleKeyPress(e) {
  // Strelica prema gore
  if (e.key === "ArrowUp") {
    player.move(0, -1);
  }
  // Strelica prema dolje
  else if (e.key === "ArrowDown") {
    player.move(0, 1);
  }
  // Strelica lijevo
  else if (e.key === "ArrowLeft") {
    player.move(-1, 0);
  }
  // Strelica desno
  else if (e.key === "ArrowRight") {
    player.move(1, 0);
  }
}

// Funkcija za detekciju kolizije između dva objekta
function checkCollision(obj1, obj2) {
  if (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  ) {
    return true; // Kolizija se dogodila
  }
  return false; // Nema kolizije
}

// Funkcija za generiranje asteroida
function generateAsteroids(numAsteroids) {
  for (let i = 0; i < numAsteroids; i++) {
	  const asteroidWidth = 30;
    const asteroidHeight = 30;

    // Odabir slučajne strane iz koje će asteroid ući na ekran
    const side = Math.floor(Math.random() * 4); // 0 - top, 1 - right, 2 - bottom, 3 - left
    let asteroidX, asteroidY, asteroidSpeedX, asteroidSpeedY;

    if (side === 0) { // Top
      asteroidX = Math.random() * canvas.width;
      asteroidY = -asteroidHeight;
      asteroidSpeedX = (Math.random() - 0.5) * 4; // Slučajna brzina horizontalnog kretanja
      asteroidSpeedY = Math.random() * 2 + 1; // Brzina vertikalnog kretanja prema dolje
    } else if (side === 1) { // Right
      asteroidX = canvas.width;
      asteroidY = Math.random() * canvas.height;
      asteroidSpeedX = -(Math.random() * 2 + 1); // Brzina horizontalnog kretanja prema lijevo
      asteroidSpeedY = (Math.random() - 0.5) * 4; // Slučajna brzina vertikalnog kretanja
    } else if (side === 2) { // Bottom
      asteroidX = Math.random() * canvas.width;
      asteroidY = canvas.height;
      asteroidSpeedX = (Math.random() - 0.5) * 4; // Slučajna brzina horizontalnog kretanja
      asteroidSpeedY = -(Math.random() * 2 + 1); // Brzina vertikalnog kretanja prema gore
    } else { // Left
      asteroidX = -asteroidWidth;
      asteroidY = Math.random() * canvas.height;
      asteroidSpeedX = Math.random() * 2 + 1; // Brzina horizontalnog kretanja prema desno
      asteroidSpeedY = (Math.random() - 0.5) * 4; // Slučajna brzina vertikalnog kretanja
    }

    const newAsteroid = new Asteroid(asteroidX, asteroidY, asteroidWidth, asteroidHeight, asteroidSpeedX, asteroidSpeedY);
    asteroids.push(newAsteroid);
  }
}

// Funkcija za prikaz vremena u gornjem desnom kutu prozora
function displayTimer(elapsedTime) {
  const timerElement = document.getElementById('timer');
  const bestTimerElement = document.getElementById('best_timer');
  timerElement.textContent = 'Vrijeme: ' + formatTime(elapsedTime);
  bestTimerElement.textContent = 'Najbolje Vrijeme: ' + BEST_TIME ? formatTime(BEST_TIME) : '00:00:000';
}

// Funkcija za pretvaranje vremena iz sekundi u format (minute:sekunde.milisekunde)
function formatTime(miliseconds) {
  const minutes = Math.floor(miliseconds / 60000);
  const remainingSeconds = (miliseconds - 60 * minutes) / 1000;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds.toFixed(3)).padStart(6, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}


// Dodavanje slušača tipkovničkih događaja
document.addEventListener("keydown", handleKeyPress);

// Inicijalizacija igrača
const player = new Player(
  canvas.width / 2 - 25,
  canvas.height / 2 - 25,
  50,
  50,
);

// Inicijalizacija asteroida
const asteroids = [];

// Inicijalizacija asteroida na početku igre
generateAsteroids(INITIAL_ASTEROID_COUNT); // Generira 5 asteroida na početku igre (prilagodi prema potrebi)

let BEST_TIME = localStorage.getItem("best_time");

// Glavna petlja igre
function gameLoop() {
  // Brisanje ekrana
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ažuriranje i crtanje igrača
  player.draw();

  // Ažuriranje i crtanje asteroida te provjera kolizije
  asteroids.forEach((asteroid, index) => {
    asteroid.update();
    asteroid.draw();

    // Provjera kolizije s igračem
    if (checkCollision(player, asteroid)) {
      // Kolizija se dogodila, ovdje dodaj logiku za reakciju na koliziju
      console.log("Kolizija!"); // Primjer reakcije (možeš dodati smanjenje života ili kraj igre)
      // alert("You ded!");
      //return;
			collisionDetected = true;
    }
  });

	if (startTime) {
	const endTime = Date.now();
  const elapsedTime = endTime - startTime;
	displayTimer(elapsedTime);
	}
  // Ako se dogodila kolizija, zaustavi mjerenje vremena
  if (collisionDetected) {
			if (startTime) {
      const endTime = Date.now();
      const elapsedTime = (endTime - startTime) / 1000; // Vrijeme u sekundama
      console.log('Kolizija se dogodila nakon ' + elapsedTime + ' sekundi.');
		  console.log(formatTime(elapsedTime));

		  // TODO spremiti u localStorage najbolje vrijeme
		  const bestTime = localStorage.getItem("best_time");
		  if (bestTime && bestTime > elapsedTime) {
				localStorage.setItem("best_time", elapsedTime);
			}

      // Resetiranje vremena i označavanje da se ponovno pokrene igra
      startTime = null;
      collisionDetected = false;
      // dodati funkciju za ponovno pokretanje igre
		  return;
    }
  } else {
    // Ako kolizija nije detektirana, nastavi mjerenje vremena
    if (!startTime) {
      startTime = Date.now();
    }
  }

  requestAnimationFrame(gameLoop);
}

// Pokretanje igre
gameLoop();
