import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
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
    var worddic=useRef([]);
    useEffect(() => {
        fetch("http://localhost:5000/api/words")
            .then((response) => response.json())
            .then((data) => {setWords(data);console.log("Data fetched:", data);})
            .catch((error) => console.error("Error fetching words:", error));     
    }, []);

    if (words.length > 0) {      
        console.log(words[0]);      
    }
    return (        
        <div className="p-4 h-screen flex items-center justify-center ">
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
            <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">回首頁</Link>
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
