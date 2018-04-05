'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_X = 120;
var TEXT_Y = 42;
var TEXT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_X = 130;
var BAR_Y = 100;
var BAR_GAP = 50;
var BAR_COLOR_YOUSELF = 'rgba(255, 0, 0, 1)';

/*функция, описывающая белое облако*/
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/*функция, описывающая рисование гистограммы*/
var drawBar = function (ctx, upperLeftCornerX, upperLeftCornerY, width, height) {
  ctx.save();
  ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  ctx.restore();
};

/*функция вывода текста в облаке*/
var drawText = function (ctx) {
  ctx.font='16px PT Mono';
  ctx.fillStyle='#000000';
  ctx.textBaseline='handing';
  ctx.fillText('Ура вы победили!', TEXT_X, TEXT_Y);
  ctx.fillText('Список результатов:', TEXT_X, TEXT_Y+TEXT_GAP);
};

/*Максимальный элемент массива*/
var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i=1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

/*функция задает случайное число*/
var getRandomOpacity = function (min, max) {
  return Math.random() * (max - min) + min;
};

var BAR_COLOR = 'rgba(16, 55, 233, ' + getRandomOpacity(0.1, 1) + ')';

/*функция выбора цвета гистограммы*/
var getColorBar = function(gamer) {
  return gamer === 'Вы' ? BAR_COLOR_YOUSELF : BAR_COLOR;
};
 
window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X+GAP, CLOUD_Y+GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  drawText(ctx);
  var maxTime =getMaxElement(times);
  for (var i=0; i<players.length; i++) {
    ctx.fillStyle = getColorBar(players[i]);
    drawBar(ctx, BAR_X+(BAR_WIDTH+BAR_GAP)*i, BAR_Y+BAR_HEIGHT-BAR_HEIGHT*times[i]/maxTime, BAR_WIDTH, BAR_HEIGHT*times[i]/maxTime);
    ctx.fillStyle='#000000';
    ctx.fillText(Math.floor(times[i]), BAR_X+(BAR_WIDTH+BAR_GAP)*i, BAR_Y+BAR_HEIGHT-BAR_HEIGHT*times[i]/maxTime-TEXT_GAP/2);
    ctx.fillStyle='#000000';
    ctx.fillText(players[i], BAR_X+(BAR_WIDTH+BAR_GAP)*i, BAR_Y+BAR_HEIGHT+TEXT_GAP);  
  }  
};