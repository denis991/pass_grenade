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
		people: 'people',
		enemies: 'enemies',
		explosions: 'explosions',
		infoPanel: 'infoPanel',
		grenades: 'grenades',
	},
	timeouts: {
		// задержка
		playerLock: 2000,
		playerShoots: 3000,
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
