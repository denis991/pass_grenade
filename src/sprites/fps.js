
export const initFps = (getFpsCallback) => {
  const fpsDiv = document.createElement('div');
  fpsDiv.style.position = 'absolute';
  fpsDiv.style.right = '0px';
  fpsDiv.style.top = '0px';
  fpsDiv.style.backgroundColor = 'rgba(0,0,255,0.75)';
  fpsDiv.style.color = 'white';
  fpsDiv.style.font = '10pt Courier New';
  fpsDiv.style.zIndex = '256';
  fpsDiv.innerHTML = 'FPS';

  document.body.appendChild(fpsDiv); // добавляем div непосредственно в body документа

  const update = () => {
    const fps = getFpsCallback();
    fpsDiv.innerHTML = fps.toFixed(1).toString();
  }

  return {
    update,
  };
}


