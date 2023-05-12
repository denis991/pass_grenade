# pass_grenade
для звука  howler



## Запуск процедуры сборки прокта:

    npm run build

## Чтобы запустить dev сервер:

    npm run start


доп матерьялы по проекту:
задать полёт гранаты по кривой траектории можно с помощью функции Math.sin
(для конктреного случая когда x2 > x1) пусть x1 начальное положение, x2 - конечное, dt - delta time в секундах, MAX_HEIGHT - максимальная точка в дуге по Y.
находим разницу xDist= x2 - x1.
progress = progress + dt;
xCurrent = x1 + xDist*progress;
yCurrent = Math.sin(Math.PI*progress) * MAX_HEIGHT;
статья по основам математики` https://ya-znau.ru/znaniya/zn/261`
примеры по использованию Math.sin` https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/sin`