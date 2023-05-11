import { Container, Graphics, Sprite, Text, TextStyle } from 'pixi.js';

const style = new TextStyle({});

let info; // локальная переменная для хранения информационной панели
export const initInfo = (currApp, root) => {

  info = new Container();
	info.name = appConstants.containers.infoPanel;

	app = currApp;

	const infoPanel = new Container();

	infoPanel.position.x = 20;
	infoPanel.position.y = 20;


	// const effectsButton = new Container();

	// const graphicsEffectsOff = new Graphics();

	// info.addChild(effectsButton);

	// root.addChild(info);

	return info;
};
