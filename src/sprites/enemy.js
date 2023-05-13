import { allTextureKeys } from '../common/textures'; //  текстуры
import { getTexture } from '../common/assets';// для получения текстур
import { Container, AnimatedSprite } from 'pixi.js';
import appConstants from '../common/constants';
import { randomIntFromInterval, destroySprite } from '../common/utils';
import { addExplosion } from './explosions';
import{destroyGrenade}from './grenades';

let enemies;// контейнер c врагом
let app;
let rootContainer;// текущий крневой  контейнер

export const initEnemies = (currApp, root) => { // инициализация врага
	enemies = new Container();
	enemies.name = appConstants.containers.enemies;// имя контейнера
	app = currApp; // сохпаняем ссылку на приложение
	rootContainer = root; // сохраняем ссылку на корневой контейнер
	return enemies;
};

export const destroyEmeny = (enemy) => {// уничтожение врага
	addExplosion({ x: enemy.position.x, y: enemy.position.y });
	destroySprite(enemy);
	ufoDestroyed();
	setTimeout(() => {// через секунду добавляем нового врага
		addEnemy();
	}, 1000);
};

export const addEnemy = () => {// добавление врага
	const textures = [getTexture(allTextureKeys.shipBlue), getTexture(allTextureKeys.shipBlue2)];// текстуры врага
	const enemy = new AnimatedSprite(textures);// создаем спрайт
	enemy.anchor.set(0.5, 1);// якорь или точка привязки
	const alivePerson = getRandomAlivePerson();// полячаем случайного жителя
	if (alivePerson) {// если он живой
		enemy.position.x = alivePerson;// ставим врага на позицию жителя
	} else {
		enemy.x = randomIntFromInterval(20, appConstants.size.WIDTH - 20); // если жителя нет то ставим врага в случайное место
	}
	enemy.y = 80;// позиция по  у врага
	enemy.scale.set(0.5); // размер врага

	enemy.animationSpeed = 0.1;// скорость анимации
	enemy.customData = { // кастомные данные
		left: true,// направление движения
	};

	enemy.destroyMe = function () {
		destroyEmeny(this);
	};
	enemies.addChild(enemy);// добавляем врага в контейнер

	return enemy;
};


export const enemyTick = () => {// состояние пришельца || вся логика пришельца
	const allAlive = getAlivePeople(); // получаем всех живых жителей

	enemies.children.forEach((e) => {// движение пришельца
		let directionChanged = false;
		if (e.customData.left) {// изменялось ли направление движения
      e.position.x -= 1;// движение влево
			if (e.position.x < 20) {// если пришелец вышел за пределы экрана
				e.customData.left = false;// меняем направление движения
				directionChanged = true; /// направление изменилось
			}
		} else {// пришелец движется !вправо!
			e.position.x += 1;
			if (e.position.x > appConstants.size.WIDTH - 20) {
				e.customData.left = true;
				directionChanged = true;
			}
		}

		if (!directionChanged && Math.random() * 100 < appConstants.probability.enemyChangeDirection) {// рандомно мняем направление движения
			e.customData.left = !e.customData.left;// меняем направление движения
			const idx = randomIntFromInterval(0, 1);//меняем текстуру пришельца
			e.gotoAndStop(idx);
		}

		const underPerson = allAlive.filter((p) => { // проверяем находится ли пришелец над жителем
			return p - 10 <= e.position.x && p + 10 >= e.position.x;// если да то возвращаем жителя под пришельцем
		});

		if (underPerson.length) {// тарелка над жителем
			if (Math.random() * 100 < appConstants.probability.bomb) { // нужно ли сбросить бомбу
				//generate bomb
				addBomb(e.position);
			}
		} else {
			if (Math.random() * 100 < appConstants.probability.bomb / 4) { // если нет жителя под пришельцем то сбрасываем бомбу но 4 раза реже
				//generate bomb
				addBomb(e.position);
			}
		}
	});
};
