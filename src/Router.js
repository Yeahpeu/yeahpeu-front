import { BrowserRouter, Routes } from "react-router-dom";
import App from "./App";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes path="/" element={<App />} />
    </BrowserRouter>
  );
};
