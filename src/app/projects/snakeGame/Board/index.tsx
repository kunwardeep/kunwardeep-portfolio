"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Snake, { ISnakeBody } from "../Snake";

const Food = styled.div.attrs<{
  $top: number;
  $left: number;
}>((props) => {
  return {
    style: {
      top: `${props.$top}px`,
      left: `${props.$left}px`,
    },
  };
})`
  width: 20px;
  height: 20px;
  position: fixed;
  background-color: #5fcc6c;
  border-radius: 50%;
`;

type DirectionType = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

const BoardBoundary = styled.div<{ $width: number; $height: number }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  background-color: red;
  position: relative;
`;

interface IBoard {
  width: number;
  height: number;
}

const getRandomPosition = (max: number, min: number, size: number) => {
  const randNum = Math.floor(Math.random() * (max - min) + min);
  return Math.floor(Math.floor(randNum) / size) * size;
};

export const Board = ({ width, height }: IBoard) => {
  const snakeWidth = 20;
  const snakeSpeed = useRef(200);
  const [foodLocation, setFoodLocation] = useState<ISnakeBody>({
    top: 100,
    left: 100,
  });
  const [gameFinished, setGameFinished] = useState(false);
  const [snakeData, setSnakeData] = useState<Array<ISnakeBody>>([
    { top: width / 2, left: height / 2 },
    { top: width / 2, left: height / 2 - snakeWidth },
    { top: width / 2, left: height / 2 - snakeWidth * 2 },
    { top: width / 2, left: height / 2 - snakeWidth * 3 },
  ]);

  const direction = useRef<DirectionType | undefined>(undefined);
  const interval = useRef<NodeJS.Timeout>(undefined);

  const updateFoodLocation = useCallback(() => {
    const foodWillEndUpOnSnake = (top: number, left: number) => {
      return Boolean(
        snakeData.find((d) => {
          return d.left === left && d.top === top;
        })
      );
    };

    do {
      const top = getRandomPosition(
        snakeWidth,
        height - snakeWidth,
        snakeWidth
      );
      const left = getRandomPosition(
        snakeWidth,
        width - snakeWidth,
        snakeWidth
      );
      if (!foodWillEndUpOnSnake(top, left)) {
        console.log("Set food loc", top, left);
        setFoodLocation({ top: top, left: left });
        break;
      }
    } while (true);
  }, [height, width, snakeData]);

  const hasSnakeBitItself = useCallback(
    (newSnakeHead: ISnakeBody) => {
      const snakeBodyMinusTail = [...snakeData];
      snakeBodyMinusTail.pop();

      return Boolean(
        snakeBodyMinusTail.find(
          (d) => d.left === newSnakeHead.left && d.top === newSnakeHead.top
        )
      );
    },
    [snakeData]
  );

  const isFoodEaten = useCallback(
    (snakeHead: ISnakeBody) => {
      return (
        snakeHead.left === foodLocation.left &&
        snakeHead.top === foodLocation.top
      );
    },
    [foodLocation]
  );

  const isOutOfBounds = useCallback(
    (snakeHead: ISnakeBody) => {
      if (
        snakeHead.top === 0 - snakeWidth ||
        snakeHead.top === height ||
        snakeHead.left === 0 - snakeWidth ||
        snakeHead.left === width
      ) {
        console.log("Out of bounds", snakeHead);

        return true;
      }
      return false;
    },
    [height, width]
  );

  const moveSnake = useCallback(
    (keyPressDirection: string) => {
      const currentSnakeHead = snakeData[0];
      let newSnakeHead: ISnakeBody = { top: -20, left: -20 };

      switch (keyPressDirection) {
        case "ArrowUp":
          if (direction.current === "ArrowDown") {
            // Snake cant go in opposite direction
            return;
          }
          direction.current = "ArrowUp";
          newSnakeHead = {
            top: currentSnakeHead.top - snakeWidth,
            left: currentSnakeHead.left,
          };

          break;
        case "ArrowDown":
          if (direction.current === "ArrowUp") {
            // Snake cant go in opposite direction
            return;
          }
          direction.current = "ArrowDown";

          newSnakeHead = {
            top: currentSnakeHead.top + snakeWidth,
            left: currentSnakeHead.left,
          };

          console.log("down");
          break;
        case "ArrowLeft":
          if (direction.current === "ArrowRight") {
            // Snake cant go in opposite direction
            return;
          }
          direction.current = "ArrowLeft";
          newSnakeHead = {
            top: currentSnakeHead.top,
            left: currentSnakeHead.left - snakeWidth,
          };

          break;
        case "ArrowRight":
          if (direction.current === "ArrowLeft") {
            // Snake cant go in opposite direction
            return;
          }
          direction.current = "ArrowRight";
          newSnakeHead = {
            top: currentSnakeHead.top,
            left: currentSnakeHead.left + snakeWidth,
          };

          break;
      }

      if (isOutOfBounds(newSnakeHead) || hasSnakeBitItself(newSnakeHead)) {
        setGameFinished(true);
      } else {
        console.log("move...");
        const newSnakeData = [newSnakeHead, ...snakeData];
        // check if food is eaten
        if (isFoodEaten(newSnakeHead)) {
          updateFoodLocation();
          snakeSpeed.current = snakeSpeed.current - 5;
        } else {
          // Remove the tail of the snake as the snake is moving
          console.log("Remove tail move...");

          newSnakeData.pop();
        }

        setSnakeData(newSnakeData);
      }
    },
    [
      hasSnakeBitItself,
      isFoodEaten,
      isOutOfBounds,
      snakeData,
      updateFoodLocation,
    ]
  );

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      moveSnake(ev.code);
    },
    [moveSnake]
  );

  useEffect(() => {
    if (gameFinished) {
      clearInterval(interval.current);
      return;
    }
    if (direction.current) {
      interval.current = setInterval(() => {
        console.log("direction", direction);
        if (direction.current) {
          moveSnake(direction.current);
        }
      }, snakeSpeed.current);
    }
    return () => {
      console.log("clear");
      clearInterval(interval.current);
    };
  }, [moveSnake, gameFinished]);

  useEffect(() => {
    console.log("fire it only once");

    document.addEventListener("keydown", handleKeyDown);

    if (gameFinished) {
      console.log("game finish");
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, gameFinished]);

  return (
    <BoardBoundary $width={width} $height={height}>
      <Snake snakeData={snakeData} width={snakeWidth} height={snakeWidth} />
      <Food $top={foodLocation.top} $left={foodLocation.left} />
    </BoardBoundary>
  );
};
