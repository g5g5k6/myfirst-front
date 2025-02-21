import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import Clock from "./Clock";
function HomePage() {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">7000單</h1>
            <Link to="/study" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">開始學習</Link>
            </div>
        </div >
    );
}
function StudyPage() {
    const [words, setWords] = useState([]);
    const [index, setIndex] = useState(0);
    const [buttons, setButtons] = useState([]);//TRY
// 先執行一次 定期發送檢查有無過期 
const fetchData = () => {
    reviewGroup()
    fetch("http://localhost:5000/api/due_groups")
        .then((response) => response.json())
        .then((data) => {
            setWords(data);
            console.log("Updated words:", data);
        })
        .catch((error) => console.error("Error fetching words:", error));
};
const reviewGroup = (groupId) => {
    fetch(`http://localhost:5000/api/review/${groupId}`, {
        method: "POST",
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Review result:", data.message);
 // 成功後立即刷新可複習單字
    })
    .catch((error) => console.error("Error reviewing:", error));
};
    useEffect(() => {

        fetchData(); // 先執行一次
        const interval = setInterval(fetchData, Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000); // 10~30秒隨機刷新
    
        return () => clearInterval(interval); // 清除計時
    }, []);




    const addButton = () => {
        const newButton = `Button ${buttons.length + 1}`;
        setButtons([...buttons, newButton]);
      };//TRY
      const moveUp = (index) => {
        if (index > 0) {
          const newButtons = [...buttons];
          const temp = newButtons[index];
          newButtons[index] = newButtons[index - 1];
          newButtons[index - 1] = temp;
          setButtons(newButtons);
        }
      }; 
      // 下移按鈕
      const moveDown = (index) => {
        if (index < buttons.length - 1) {
          const newButtons = [...buttons];
          const temp = newButtons[index];
          newButtons[index] = newButtons[index + 1];
          newButtons[index + 1] = temp;
          setButtons(newButtons);
        }
      };
    if (words.length > 0) {      
        console.log(words[0]);      
    }
    return (        
        <div className="flex ">
            <div className="w-[200px] flex flex-col">
                {/* 創建按鈕 */}
                <button
                onClick={addButton}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
                >
                Create Button
                </button>
                {/* 按鈕列表 */}
                <div className="space-y-4 max-h-[800px] overflow-y-auto">
                    {buttons.map((button, index) => (
                    <div key={index} className="flex items-center space-x-4">
                    {/* 顯示按鈕 */}
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                    {button}
                    </button>
                    {/* 上移按鈕 */}
                    <button
                    onClick={() => moveUp(index)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                    >
                      ↑
                    </button> 
                    {/* 下移按鈕 */}
                    <button
                    onClick={() => moveDown(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                     ↓
                    </button>
                    </div>
                    ))}
                </div>
            </div>
         <div className="w-[500px] flex flex-col">
            <div className="p-4 h-screen  items-center justify-center ">
                <h1 className="text-xl font-bold bg-blue-100">學習界面</h1>
                <ul className=" ml-5 bg-blue-300">  
                    <li key={index}>{words.length > 0 ? words[index][0]:""}</li>
                    <button 
                    onClick={() =>setIndex(index + 1)} 
                    disabled={index >= words.length-1} 
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                    下一個
                    </button>                
                    <button 
                    onClick={() =>setIndex(index - 1)} 
                    disabled={index <= 0} 
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                    上一個
                    </button>                               
                </ul>
                <Clock />
                <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">回首頁</Link>
            </div>
         </div>
        </div>

    );
}
export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/study" element={<StudyPage />} />
            </Routes>
        </Router>
    );
}
