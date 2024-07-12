import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import JudgePage from './pages/JudgePage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import MainPage2 from './pages/MainPage2';
import SignupPage from './pages/SignupPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/judgepage" element={<JudgePage />} />
      <Route path="/CategoryPage" element={<CategoryPage />}/>
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/MainPage2" element={<MainPage2 />} />
<<<<<<< Updated upstream
      <Route path="/SignUp" element={<SignupPage />} />
=======
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/result" element={<ResultPage />} />
>>>>>>> Stashed changes
    </Routes>
  );
}

export default App;
