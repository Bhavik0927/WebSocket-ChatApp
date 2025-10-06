import { lazy, Suspense, useEffect } from "react";
import { io } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const HomePage = lazy(() => import("./Components/HomePage"));
const ChatPage = lazy(() => import("./Components/ChatPage"));

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
