import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestPage from "../pages/testPage";
import TestResultPage from "../pages/TestResultPage";
import App from "../App";

const TestView = () => {
  return (
    <div>
      Test View
      {/* //NOTE - 뷰 아래 페이지(컴포넌트)들이 갈아 끼워짐 */}
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/test-result" element={<TestResultPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default TestView;
