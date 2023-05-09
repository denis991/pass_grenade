const appConstants = {
	// глоабльные константы
	size: {
		// размеры экрана
		WIDTH: window.innerWidth ? window.innerWidth : 800,
		HEIGHT: window.innerHeight ? window.innerHeight : 600,
	},
	containers: {
		// контейнеры
		player: 'player',
		bullets: 'bullets',
		people: 'people',
		enemies: 'enemies',
		bombs: 'bombs',
		explosions: 'explosions',
		infoPanel: 'infoPanel',
		grenades: 'grenades',
	},
	timeouts: {
		// задержка
		playerLock: 2000,
		playerShoots: 1000,
	},
	probability: {
		// вероятность
		enemyChangeDirection: 1,
		bomb: 3,
	},
	events: {
		// события
		infoUpdated: 'indoUpdated',
		ufoDestroyed: 'ufoDestroyed',
		manKilled: 'manKilled',
		bombDestroyed: 'bombDestroyed',
		youWin: 'youWin',
		gameOver: 'gameOver',
		restartGame: 'restartGame',
		resetPeople: 'resetPeople',
	},
};

export default appConstants;
