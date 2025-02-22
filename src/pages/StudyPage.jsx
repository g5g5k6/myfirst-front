import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGroups } from "../api/groups";
import AddButton from "../components/AddButton";
import ButtonList from "../components/ButtonList";
import Button from "../components/Button";
import Clock from "../components/Clock";

function StudyPage() {
  const [words, setWords] = useState([]); // 存單字列表
  const [index, setIndex] = useState(0); // 控制顯示哪個單字
  const [buttons, setButtons] = useState([]); // 按鈕列表
  const [groups, setGroups] = useState([]); // 存API回傳的完整資料

  // 載入群組資料
  useEffect(() => {
    fetchGroups().then((data) => {
      setGroups(data);
      console.log("Fetched groups:", data);

      // 處理資料：把id轉成按鈕，words存起來
      const initialButtons = data.map((group) => `Group ${group.id}`);
      setButtons(initialButtons);

      // 預設顯示第一個群組的單字（如果有資料）
      if (data.length > 0) {
        setWords(data[0].words);
      }
    });
  }, []);

  // 點擊按鈕時切換顯示的單字群組
  const handleButtonClick = (groupIndex) => {
    setWords(groups[groupIndex].words);
    setIndex(0); // 重置到第一個單字
  };

  return (
    <div className="flex">
      <div className="w-[200px] flex flex-col">
        <AddButton buttons={buttons} setButtons={setButtons} />
        <ButtonList
          buttons={buttons}
          setButtons={setButtons}
          onButtonClick={handleButtonClick} // 傳入點擊處理
        />
      </div>
      <div className="w-[500px] flex flex-col">
        <div className="p-4 h-screen items-center justify-center">
          <h1 className="text-xl font-bold bg-blue-100">學習界面</h1>
          <ul className="ml-5 bg-blue-300 p-4">
            {words.length > 0 ? (
              <li key={index}>
                <div>
                  <strong>{words[index].word}</strong>
                  <p>{words[index].definition}</p>
                  <p>{words[index].example}</p>
                </div>
              </li>
            ) : (
              <li>無單字可顯示</li>
            )}
            <div className="mt-4 space-x-2">
              <Button
                onClick={() => setIndex(index - 1)}
                disabled={index <= 0}
                className="bg-blue-500 text-white"
              >
                上一個
              </Button>
              <Button
                onClick={() => setIndex(index + 1)}
                disabled={index >= words.length - 1}
                className="bg-blue-500 text-white"
              >
                下一個
              </Button>
            </div>
          </ul>
          <Clock />
          <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            回首頁
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudyPage;