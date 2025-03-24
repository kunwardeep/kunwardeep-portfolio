import styled from "styled-components";

export interface ISnakeBody {
  top: number;
  left: number;
}

interface ISnake {
  snakeData: Array<ISnakeBody>;
  width: number;
  height: number;
}

const SnakeBodyPart = styled.div.attrs<{
  $width: number;
  $height: number;
  $top: number;
  $left: number;
  $isHead: boolean;
}>((props) => {
  return {
    style: {
      width: `${props.$width}px`,
      height: `${props.$height}px`,
      top: `${props.$top}px`,
      left: `${props.$left}px`,
      backgroundColor: props.$isHead ? "#0253a9" : "#2b74c1",
    },
  };
})`
  position: fixed;
`;

const Snake = ({ width, height, snakeData }: ISnake) => {
  const snakeHead = snakeData[0];
  const snakeBody = snakeData.slice(1);

  return (
    <>
      <SnakeBodyPart
        $top={snakeHead.top}
        $left={snakeHead.left}
        $width={width}
        $height={height}
        $isHead
      />
      {snakeBody.map((b) => {
        return (
          <SnakeBodyPart
            key={`${b.top}_${b.left}`}
            $top={b.top}
            $left={b.left}
            $width={width}
            $height={height}
            $isHead={false}
          />
        );
      })}
    </>
  );
};
export default Snake;
