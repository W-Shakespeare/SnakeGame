function apple(arrSnake, str) {
  if (compare(arrSnake)) {
    arrSnake.push({ x: applePositionX - 10, y: applePositionY - 10 });
    appleMove();
    str == "snake" ? score++ : score2++;
  }
  ctx.drawImage(
    imageApple,
    applePositionX,
    applePositionY,
    blockSize,
    blockSize
  );
}
function appleNewPosition() {
  let val = Math.round(Math.random() * (480 - 10) + 10);
  return Math.round(val / 10) * 10;
}
function appleMove() {
  applePositionX = appleNewPosition();
  applePositionY = appleNewPosition();
}

export default apple;
