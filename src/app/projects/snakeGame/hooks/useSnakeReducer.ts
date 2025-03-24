import { useReducer } from "react";
import { ISnakeBody } from "../components/Snake";
import { SNAKE_WIDTH } from "../consts";

type SnakeAction = "MOVE" | "GROW" | "RESET";

const useSnakeReducer = (width: number, height: number) => {
  const defaultSnakePosition = [
    { top: width / 2 - SNAKE_WIDTH, left: height / 2 - SNAKE_WIDTH },
  ];

  const snakeReducer = (
    state: Array<ISnakeBody>,
    action: { type: SnakeAction; payload?: ISnakeBody }
  ) => {
    switch (action.type) {
      case "MOVE":
        return action.payload ? [action.payload, ...state.slice(0, -1)] : state;
      case "GROW":
        return action.payload ? [action.payload, ...state] : state;
      case "RESET":
        return defaultSnakePosition;
      default:
        return state;
    }
  };

  return useReducer(snakeReducer, defaultSnakePosition);
};

export const makeSnakeGrow = (
  dispatchSnakeData: (action: {
    type: SnakeAction;
    payload?: ISnakeBody;
  }) => void,
  payload: ISnakeBody
) => {
  dispatchSnakeData({ type: "GROW", payload: payload });
};

export const makeSnakeMove = (
  dispatchSnakeData: (action: {
    type: SnakeAction;
    payload?: ISnakeBody;
  }) => void,
  payload: ISnakeBody
) => {
  dispatchSnakeData({ type: "MOVE", payload: payload });
};

export const makeSnakeReset = (
  dispatchSnakeData: (action: { type: SnakeAction }) => void
) => {
  dispatchSnakeData({ type: "RESET" });
};

export default useSnakeReducer;
