import React from "react";
import { swapItems } from "../utils/swapItems";
import Button from "./Button";

const ButtonList = ({ buttons, setButtons, onButtonClick }) => {
  const moveUp = (index) => {
    if (index > 0) setButtons(swapItems(buttons, index, index - 1));
  };

  const moveDown = (index) => {
    if (index < buttons.length - 1) setButtons(swapItems(buttons, index, index + 1));
  };

  return (
    <div className="space-y-4 max-h-[800px] overflow-y-auto">
      {buttons.map((button, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Button
            onClick={() => onButtonClick(index)} // 點擊時切換群組
            className="bg-gray-500 text-white"
          >
            {button}
          </Button>
          <Button onClick={() => moveUp(index)} className="bg-green-500 text-white px-2 py-1">
            ↑
          </Button>
          <Button onClick={() => moveDown(index)} className="bg-red-500 text-white px-2 py-1">
            ↓
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ButtonList;