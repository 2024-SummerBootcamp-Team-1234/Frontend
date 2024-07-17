import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResultPage from './pages/ResultPage';
import MainPage2 from './pages/MainPage2';
import LatestPostPage from './pages/LatestPostPage';
import MyPostPage from './pages/MyPostPage';
import JudgePageCopy from './pages/JudgePageCopy';
import JudgePageCopy2 from './pages/JudgePageCopy2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
<<<<<<< HEAD
      <Route path="/judgepage" element={<JudgePage />} />
=======
      <Route path="/JudgePageCopy" element={<JudgePageCopy />} />
      <Route path="/JudgePageCopy2" element={<JudgePageCopy2 />} />
>>>>>>> 49494c2ec159240172241b72bc08e2a5ddc96cc6
      <Route path="/CategoryPage" element={<CategoryPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/MainPage2" element={<MainPage2 />} />

      <Route path="/signup" element={<SignupPage />} />
      <Route path="/result" element={<ResultPage />} />

      <Route path="/LatestPostPage" element={<LatestPostPage />} />
      <Route path="/MyPostPage" element={<MyPostPage />} />
    </Routes>
  );
}

export default App;
