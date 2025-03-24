export interface ISnakeBody {
  top: number;
  left: number;
}

interface ISnake {
  snakeData: Array<ISnakeBody>;
  width: number;
  height: number;
}

const Snake = ({ width, height, snakeData }: ISnake) => {
  const snakeHead = snakeData[0];
  const snakeBody = snakeData.slice(1);

  return (
    <>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          top: `${snakeHead.top}px`,
          left: `${snakeHead.left}px`,
          backgroundColor: "#0253a9",
        }}
        className="absolute"
      />
      {snakeBody.map((b) => {
        return (
          <div
            key={`${b.top}_${b.left}px`}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              top: `${b.top}px`,
              left: `${b.left}px`,
              backgroundColor: "#2b74c1",
            }}
            className="absolute"
          />
        );
      })}
    </>
  );
};
export default Snake;
