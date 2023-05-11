import * as PIXI from 'pixi.js';
import { root } from 'postcss';
import { loadAssets } from './common/assets'; // текстуры
import appConstants from './common/constants'; // константы
import { addPlayer, getPlayer, playerShoots, playerTick } from './sprites/player'; // игрок и его состояния
import { grenadesTick, clearGrenades, destroyGrenade, initGrenades } from './sprites/grenades'; // гранаты
import { initEnemies, addEnemy, enemyTick, destroyEmeny } from './sprites/enemy'; // противник
import { initInfo } from './sprites/infoPanel'; // информационная панель
import { EventHub } from './common/eventHub'; // события игры + вероятности их возникновения

// локальные переменные
const HEIGHT = appConstants.size.HEIGHT;
const WIDTH = appConstants.size.WIDTH;
const gameState = {
	// состояние игры
	stopped: false,
  moveLeftActive: false,
	moveRightActive: false,
};
let rootContainer;

const createScene = () => {
	// сцена игры
	const app = new PIXI.Application({
		// инициальзируем приложение PIXI
		background: '#CCCCCC', // цвет фона
		antialias: true, // сглаживание
		width: WIDTH, // игровая область
		height: HEIGHT,
		// resolution: window.devicePixelRatio || 1, // плотность пикселей //mac 2 , windows 1
	});

	document.body.appendChild(app.view); /// Добавление сцены в HTML-документ
	gameState.app = app; // добавляем в gameState || сохраняем объект приложения
	rootContainer = app.stage; // корневой контейнер приложения
	rootContainer.eventMode = true; // включаем интерактивность для приложения
	rootContainer.hitArea = app.screen; // активкая область приложения

	// initInfo(app, rootContainer); // инициализация информационной панели

	const player = addPlayer(app, rootContainer); // создаём игрока , передаём корневой контейнер его положение
	rootContainer.addChild(player); // player добавляем в корневой контейнер игры // Добавление спрайта на сцену
	// app.stage.addChild(player);

	const grenades = initGrenades(app, rootContainer); // создаём гранаты  , передаём корневой контейнер
	rootContainer.addChild(grenades);

  const enemies = initEnemies(app, rootContainer); // создаём контейнер для врага
	addEnemy();// создаём проивника
	rootContainer.addChild(enemies);// добавляем противника в корневой контейнер
	// const ticker = PIXI.Ticker.shared;
	// ticker.add((deltaTime) => {
	// 	const fps = ticker.FPS.toFixed(2);
	// 	console.log('FPS: ', fps);
	// });
	// app.ticker.start();


	return app;
};

const initInteraction = () => {
	// интерактивность игры для пользователя
	console.log('initInteraction');

	gameState.mousePosition = getPlayer().position.x; //инициализирум  позиция игрок , и потом получаем позицию мышки
  gameState.app.stage.interactive = true;
  // gameState.app.renderer.plugins.interaction.setEventFirst(true);

	gameState.app.stage.addEventListener('pointermove', (e) => {
		// обработчик событий для обработки курсора мышки
		gameState.mousePosition = e.global.x; // сохраняем позицию мышки в gameState
	});
// пробел
	// document.addEventListener('keydown', (e) => {
  //   console.log('e: ', e);
	// 	// обработчик событий для обработки клавиатуры
	// 	if (e.code === 'Space') {
	// 		playerShoots(); // стрельба
	// 	}
	// });


  let mouseDownTime = 0; // Время нажатия на левую кнопку мыши
  // Прослушиваем событие нажатия левой кнопки мыши
  document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
          mouseDownTime = Date.now(); // Запоминаем время нажатия на левую кнопку мыши
      }
  });
  // Прослушиваем событие отпускания левой кнопки мыши
  document.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
          const mouseUpTime = Date.now(); // Время отпускания левой кнопки мыши
          const elapsedTime = mouseUpTime - mouseDownTime; // Вычисляем прошедшее время
          console.log('Elapsed time:', elapsedTime, 'ms');

          // Код, который будет выполняться при отпускании левой кнопки мыши
          playerShoots(); // бросок гранаты
      }
  });



	gameState.app.ticker.add((delta) => {
		// глобальный цикл обработки цикла состояния игры
		playerTick(gameState); // пользователь
		grenadesTick(); // гранаты
    enemyTick(); // противник
	});
};

export const initGame = () => {
	// инициализация игры
	loadAssets((progress) => {
		console.log('progress: ', progress);
		if (progress === 'all') {
			createScene(); // вызываем загрузку текстур
			initInteraction(); // вызываем интерактивность игры
		}
	});
};
const restartGame = () => {
	clearGrenades(); // очищаем гранаты
	restorePeople(); // противник
};
EventHub.on(appConstants.events.youWin, () => {
	gameState.app.ticker.stop();
	rootContainer.addChild(getYouWin());
});

EventHub.on(appConstants.events.gameOver, () => {
	gameState.app.ticker.stop();
	rootContainer.addChild(getGameOver());
});

EventHub.on(appConstants.events.restartGame, (event) => {
	restartGame();
	if (event === appConstants.events.gameOver) {
		rootContainer.removeChild(getGameOver());
	}
	if (event === appConstants.events.youWin) {
		rootContainer.removeChild(getYouWin());
	}
	gameState.app.ticker.start();
});
