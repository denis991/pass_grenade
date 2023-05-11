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
