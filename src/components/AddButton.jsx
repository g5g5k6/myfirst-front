import React from "react";
import { createWordGroup } from "../api/groups"; // 從api引入
import Button from "./Button"; // 用你現有的Button組件

const AddButton = ({ buttons, setButtons }) => {
  const handleAdd = async () => {
    try {
      const success = await createWordGroup();
      if (success) {
        const newButton = `Button ${buttons.length + 1}`;
        setButtons([...buttons, newButton]);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      // 可選：失敗時的fallback
      const newButton = `Button ${buttons.length + 1}`;
      setButtons([...buttons, newButton]);
    }
  };

  return (
    <Button onClick={handleAdd} className="bg-blue-500 text-white mb-4">
      Create Button
    </Button>
  );
};

export default AddButton;