"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Snake, { ISnakeBody } from "../Snake";
import { INITIAL_SNAKE_SPEED, SNAKE_WIDTH } from "../../consts";
import useSnakeReducer, {
  makeSnakeGrow,
  makeSnakeMove,
  makeSnakeReset,
} from "../../hooks/useSnakeReducer";

type DirectionType = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

interface IBoard {
  width: number;
  height: number;
}

const getRandomPosition = (min: number, max: number) => {
  if (max <= min) return min;

  const range = max - min;
  const randNum =
    Math.floor(Math.random() * (range / SNAKE_WIDTH)) * SNAKE_WIDTH + min;

  return randNum;
};

export const Board = ({ width, height }: IBoard) => {
  const snakeSpeed = useRef(INITIAL_SNAKE_SPEED);
  const direction = useRef<DirectionType>(undefined);
  const interval = useRef<NodeJS.Timeout>(undefined);

  const [foodLocation, setFoodLocation] = useState<ISnakeBody | undefined>(
    undefined
  );

  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snakeData, dispatchSnakeData] = useSnakeReducer(width, height);

  const updateFoodLocation = useCallback(() => {
    const foodWillEndUpOnSnake = (top: number, left: number) => {
      return Boolean(
        snakeData.find((d) => {
          return d.left === left && d.top === top;
        })
      );
    };

    do {
      const top = getRandomPosition(SNAKE_WIDTH, height - SNAKE_WIDTH);
      const left = getRandomPosition(SNAKE_WIDTH, width - SNAKE_WIDTH);

      if (!foodWillEndUpOnSnake(top, left)) {
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

  const increaseSnakeSpeed = () => {
    snakeSpeed.current = snakeSpeed.current - 5;
  };

  const isFoodEaten = useCallback(
    (snakeHead: ISnakeBody) => {
      if (foodLocation) {
        return (
          snakeHead.left === foodLocation.left &&
          snakeHead.top === foodLocation.top
        );
      }
    },
    [foodLocation]
  );

  const isOutOfBounds = useCallback(
    (snakeHead: ISnakeBody) => {
      if (
        snakeHead.top === 0 - SNAKE_WIDTH ||
        snakeHead.top === height ||
        snakeHead.left === 0 - SNAKE_WIDTH ||
        snakeHead.left === width
      ) {
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
            top: currentSnakeHead.top - SNAKE_WIDTH,
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
            top: currentSnakeHead.top + SNAKE_WIDTH,
            left: currentSnakeHead.left,
          };

          break;
        case "ArrowLeft":
          if (direction.current === "ArrowRight") {
            // Snake cant go in opposite direction
            return;
          }
          direction.current = "ArrowLeft";
          newSnakeHead = {
            top: currentSnakeHead.top,
            left: currentSnakeHead.left - SNAKE_WIDTH,
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
            left: currentSnakeHead.left + SNAKE_WIDTH,
          };

          break;
      }

      if (isOutOfBounds(newSnakeHead) || hasSnakeBitItself(newSnakeHead)) {
        setGameOver(true);
        return;
      }

      if (!isFoodEaten(newSnakeHead)) {
        makeSnakeMove(dispatchSnakeData, newSnakeHead);
        return;
      }

      makeSnakeGrow(dispatchSnakeData, newSnakeHead);
      updateFoodLocation();
      increaseSnakeSpeed();
      setPoints(points + 1);
    },
    [
      hasSnakeBitItself,
      isFoodEaten,
      isOutOfBounds,
      dispatchSnakeData,
      snakeData,
      updateFoodLocation,
    ]
  );

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (direction.current !== ev.code) {
        moveSnake(ev.code);
      }
    },
    [moveSnake]
  );

  useEffect(() => {
    if (gameOver || !direction.current) {
      return;
    }

    interval.current = setInterval(() => {
      if (direction.current) {
        moveSnake(direction.current);
      }
    }, snakeSpeed.current);

    return () => {
      clearInterval(interval.current);
    };
  }, [moveSnake, gameOver]);

  useEffect(() => {
    if (!foodLocation) {
      updateFoodLocation();
    }
    document.addEventListener("keydown", handleKeyDown);

    if (gameOver) {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, gameOver]);

  const handleGameReset = () => {
    makeSnakeReset(dispatchSnakeData);
    snakeSpeed.current = INITIAL_SNAKE_SPEED;
    direction.current = undefined;
    interval.current = undefined;
    setGameOver(false);
    setPoints(0);
    updateFoodLocation();
  };

  return (
    <div className="m-20">
      <div className="p-1">
        <b>Points:</b>
        {points}
      </div>

      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: `${gameOver ? "#000000" : "#bab9b8"}`,
        }}
        className="relative"
      >
        <Snake snakeData={snakeData} width={SNAKE_WIDTH} height={SNAKE_WIDTH} />
        {foodLocation && (
          <div
            className="w-5 h-5 absolute bg-emerald-900 rounded-xl"
            style={{
              top: `${foodLocation.top}px`,
              left: `${foodLocation.left}px`,
            }}
          />
        )}
      </div>
      <div className="p-1">
        <button
          onClick={handleGameReset}
          type="reset"
          className="cursor-pointer bg-sky-300 hover:bg-sky-200 rounded-full w-40 h-10"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};
