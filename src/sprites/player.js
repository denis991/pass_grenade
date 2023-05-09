import { Sprite } from 'pixi.js';
import { getTexture } from '../common/assets';
import appConstants from '../common/constants';
import { allTextureKeys } from '../common/textures';
import { addGrenade } from './grenades.js';
import { destroySprite } from '../common/utils';

let player;
let app;
let lockTimeout;
 // корабль игрока
export const addPlayer = (currApp, root) => {
	if (player) {

		return player;
	}
	app = currApp;
	player = new Sprite(getTexture(allTextureKeys.people)); // как выглядит пользователь подключаем спрайт
	player.name = appConstants.containers.player;
	player.anchor.set(0.5); // якорь спрайта
	player.scale.set(0.3); // размер спрайта (корабля)
	player.position.x = appConstants.size.WIDTH / 2; // позиция пользователя на старте
	player.position.y = appConstants.size.HEIGHT - 200; // позиция пользователя на старте
	return player;
};

export const getPlayer = () => player;

export const lockPlayer = () => {
	if (lockTimeout) {
		return;
	}
	player.locked = true; // игрок заблокирован
	lockTimeout = setTimeout(() => {
		lockTimeout = null;
		player.locked = false; // игрок разблокирован по истечению времени
	}, appConstants.timeouts.playerLock);
};

export const playerShoots = () => { // стрельба
	if (!lockTimeout) { // если игрок не заблокирован
		addGrenade({ x: player.position.x, y: player.position.y }); // добавляем пулю
	}
};

export const playerTick = (state) => { // состояние игрока его представление
	if (lockTimeout) {
		player.alpha = 0.5; // прозрачность
	} else {
		player.alpha = 1; // прозрачность
	}

	const playerPosition = player.position.x;

	player.position.x = state.mousePosition; // позиция коробля , куда мышка направляется
    // // Создание анимации для спрайта
    // app.ticker.add(() => {
    //   player.rotation += 0.1;
    // });

	if (player.position.x < playerPosition) { //
		player.rotation = -0.3; //  наклоняем корабль влево
	} else if (player.position.x > playerPosition) {
		player.rotation = 0.3; // наклоняем корабль вправо
	} else {
		player.rotation = 0;
	}
};
