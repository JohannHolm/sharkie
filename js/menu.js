function mainMenuStart() {
  canvas = document.getElementById('canvas');
  const menu = document.getElementById('mainmenu');
  const hud = document.getElementById('mobile-hud');
  hud.style.display = 'flex';
  menu.style.display = 'none';
  canvas.style.display = 'unset';
  init();
  checkMuted();
}

function checkMuted() {
  if (isMutetd) {
    muteAllAudio();
  }
}

function displayMenu() {
  canvas = document.getElementById('canvas');
  const menu = document.getElementById('mainmenu');
  const hud = document.getElementById('mobile-hud');
  hud.style.display = 'none';
  menu.style.display = 'block';
  canvas.style.display = 'none';
  world[0].background_audio.pause();
}

function menuControlsButton(isOpen) {
  const icon = isOpen
    ? 'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'
    : 'M160-200q-33 0-56.5-23.5T80-280v-400q0-33 23.5-56.5T160-760h640q33 0 56.5 23.5T880-680v400q0 33-23.5 56.5T800-200H160Zm0-80h640v-400H160v400Zm160-40h320v-80H320v80ZM200-440h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM200-560h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM160-280v-400 400Z';
  const label = isOpen ? 'Close game controls' : 'Show game controls';
  const action = isOpen ? 'closeControl()' : 'openControl()';

  return `
    <div class="icon-div">
      <button class="icon" id="controls" type="button" aria-label="${label}" onclick="${action}">
        <svg class="icon-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
          <path d="${icon}" />
        </svg>
      </button>
    </div>`;
}

function mainMenuHTML() {
  return `
    ${menuControlsButton(false)}
    <div class="menu-content">
      <h1 id="heading">Sharkie</h1>
      <p class="menu-tagline">An underwater arcade adventure</p>
      <p class="menu-details">Explore the ocean · Collect treasure · Face the boss</p>
      <button class="menu-start" type="button" onclick="mainMenuStart()">
        <img class="start-button" src="./img/6.Botones/Start/4.png" alt="Start game">
      </button>
    </div>`;
}

function closeControl() {
  document.getElementById('mainmenu').innerHTML = mainMenuHTML();
  readAudio();
}

function openControl() {
  document.getElementById('mainmenu').innerHTML = `
    ${menuControlsButton(true)}
    <div class="menu-content">
      <h1 id="heading">Controls</h1>
      <div class="control-con">
        <div class="control-content"><img class="control-img img-cont" src="./img/1.Sharkie/Bubble trap/Bubble.png" alt="">SPACE / Bubble</div>
        <div class="control-content"><img class="control-img img-cont" src="./img/4. Marcadores/Poisen/Animada/2.png" alt="">D / Poison</div>
        <div class="control-content"><img class="control-img" src="./img/6.Botones/Key/arrow keys.png" alt="">ARROW KEYS / Swim</div>
      </div>
    </div>`;
}

function GameOverMenu() {
  exitFullscreenCheck();
  displayMenu();
  GameOverHTML();
}

function GameOverHTML() {
  document.getElementById('mainmenu').innerHTML = `
    ${menuControlsButton(false)}
    <div class="menu-content">
      <h1 id="heading">Game Over</h1>
      <button class="menu-action" type="button" onclick="mainMenuStart()">
        <img src="./img/6.Botones/Try again/Recurso 18.png" alt="Try again">
      </button>
    </div>`;
  readAudio();
}

function menuVictory() {
  exitFullscreenCheck();
  displayMenu();
  const victorySound = new Audio('./audio/victory.mp3');
  victorySound.play();
  document.getElementById('mainmenu').innerHTML = menuVictoryHTML();
  readAudio();
}

function menuVictoryHTML() {
  return `
    ${menuControlsButton(false)}
    <div class="menu-content">
      <h1 id="heading"><img class="victory" src="./img/6.Botones/Tittles/You win/Recurso 20.png" alt="You win"></h1>
      <button class="menu-action" type="button" onclick="mainMenuStart()">
        <img src="./img/6.Botones/Start/4.png" alt="Play again">
      </button>
    </div>`;
}

function exitFullscreenCheck() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}
