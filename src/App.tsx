import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';
import MainPage2 from './pages/MainPage2';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
//import JudgePageCopy from './pages/JudgePageCopy';
//import JudgePageCopy2 from './pages/JudgePageCopy2';
import ResultPage from './pages/ResultPage';
import LatestPostPage from './pages/LatestPostPage';
import MyPostPage from './pages/MyPostPage';
import PlaintiffTrial from './pages/PlaintiffTrial';
import DefendantTrial from './pages/DefendantTrial';
import PlaintiffFinalTrial from './pages/PlaintiffFinalTrial';
import DefendantFinalTrial from './pages/DefendantFinalTrial';
import ResultPage2 from './pages/ResultPage2';
import SummaryPage from './pages/SummaryPage';
import SituationPage from './pages/SituationPage';
import ChoicePage from './pages/ChoicePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/MainPage2" element={<MainPage2 />} />
      <Route path="/SignUp" element={<SignupPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/CategoryPage" element={<CategoryPage />} />
      {/* <Route path="/JudgePageCopy" element={<JudgePageCopy />} />
      <Route path="/JudgePageCopy2" element={<JudgePageCopy2 />} /> */}
      <Route path="/SummaryPage" element={<SummaryPage />} />
      <Route path="/SituationPage" element={<SituationPage />} />
      <Route path="/ChoicePage" element={<ChoicePage />} />

      <Route path="/PlaintiffTrial" element={<PlaintiffTrial />} />
      <Route path="/DefendantTrial" element={<DefendantTrial />} />
      <Route path="/PlaintiffFinalTrial" element={<PlaintiffFinalTrial />} />
      <Route path="/DefendantFinalTrial" element={<DefendantFinalTrial />} />

      <Route path="/LatestPostPage" element={<LatestPostPage />} />
      <Route path="/MyPostPage" element={<MyPostPage />} />
      <Route path="/ResultPage" element={<ResultPage />} />
      <Route path="/ResultPage2" element={<ResultPage2 />} />
    </Routes>
  );
}

export default App;
