import { AnimatedSprite, Texture, Container, filters, ColorMatrixFilter } from 'pixi.js';
// import * as  PIXI from 'pixi.js';
import appConstants from '../common/constants';
import { destroySprite } from '../common/utils';

let app;
let grenades; // гранаты
let timeout; // задержка между выстрелами

const grenadeTypes = ['gren0', 'gren1', 'gren2', 'gren3', 'gren4', 'gren5', 'gren6', 'gren7']; // типы гранаты  (изображения) к json
const grenadeSpeed = 1; // скорость гранаты  (сетит в верх )
const allTextures = {}; // создавать массив текстур для анимированного спрайта будем  если они ещё не созданы
// гранаты  игрока
export const initGrenades = (currApp, root) => {
	// инициализация гранаты
	grenades = new Container(); // создаем контейнер для гранаты
	(grenades.name = appConstants.containers.grenades), (app = currApp);
	return grenades; // сохраняем текущеее состояние приложения
};

export const clearGrenades = () => {
	// очистка гранаты  при перезапуске игры
	grenades.children.forEach((b) => {
		// проходим по мосиву гранаты
		grenades.removeChild(b); // удаляем гранаты
		b.destroy({ children: true }); // удаляем детей
	});
};

export const destroyGrenade = (grenade) => {
	destroySprite(grenade);
	//add explosion BOOM
};

export const addGrenade = (coord) => {
	// добавление гранаты  | инициализация новой гранаты
	if (timeout) {
		return;
	}

	// новый спраайт
	const grenadeType = grenadeTypes[Math.floor(Math.random() * grenadeTypes.length)];

	let textures = []; // локальная переменная для хранения текстур
	if (allTextures[grenadeType]) {
		// проверяем если текстуры уже созданы
		textures = allTextures[grenadeType]; // присваиваем к текущемму массиву текстур
	} else {
		for (let i = 0; i < 3; i++) {
			// если нет то создаем
			const texture = Texture.from(`${grenadeType} ${i}`); // создаём текстуру в фрейме с именем
			textures.push(texture); // добавляем текстуру в массив
		}
		allTextures[grenadeType] = textures; // только созданный массив добавляем в общий массив блочной области видимости
	}
	const grenade = new AnimatedSprite(textures); // объект снаряда на основе текстуры (анимированный спрайт)
	const filter = new ColorMatrixFilter(); // фильтр для снаряда

	grenade.loop = false; // блокируем циклическое прогирование анимации
	const { matrix } = filter; // матрица фильтра
	matrix[1] = Math.sin(Math.random() * 10); // задаём рандомное значение матрицы или фильтра
	matrix[2] = Math.cos(Math.random() * 10);
	matrix[3] = Math.cos(Math.random() * 10);
	matrix[4] = Math.sin(Math.random() * 10);
	matrix[5] = Math.sin(Math.random() * 10);
	matrix[6] = Math.sin(Math.random() * 10);
	grenade.filters = [filter]; // масив фильтров
	grenade.animationSpeed = 0.2; // скорость анимации
	grenade.scale.set(2); // размер спрайта

	grenade.anchor.set(0.5); // изменяем  якорь спрайта

  grenade.onComplete = () => { 	// функция вращающая спрайт
    // start rotating the grenade after the animation completes
    grenade.animationSpeed = 0.1;
    grenade.rotation = Math.random() * Math.PI * 2;
  };
	grenade.position.set(coord.x, coord.y - 30); // устанавливаем позицию спрайта по входному параметру (координаты)
	//coord.y - 10 снаряд появлялся немного выше корабля игрока

	grenades.addChild(grenade); // добавляем снаряд в контейнер,
	grenade.play(); // запускаем анимацию

	timeout = setTimeout(() => {
		// задержка между выстрелами
		timeout = null;
	}, appConstants.timeouts.playerShoots);

};

export const grenadesTick = () => {
	//
	const toRemove = [];
	// console.log('grenades: <82>', grenades);// зацикенно
	grenades.children.forEach((b) => {
		// для вызова цикла в глобальной переменной он ест только у childern
		b.position.y -= grenadeSpeed * 2; // изменяем кординаты для снаряда
		if (b.position.y < 0) {
			// если снарад вышел за пределы экрана
			toRemove.push(b);
		}
	});
	toRemove.forEach((b) => {
		// удаляем снаряды
		grenades.removeChild(b);
		b.destroy({ children: true }); // удаляем детей ОБЪЕКТА
	});
};
