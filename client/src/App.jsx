import { useEffect } from "react";
import { io } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ChatPage from "./Components/ChatPage";
import './App.css';


const App = () => {
  // we need to give backend url here
  const socket = io("http://localhost:3000/");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected...", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });
  });

  return (
    <div className="App">
      <Routes>
        <Route exact path="/"  element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
