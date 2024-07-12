import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import JudgePage from './pages/JudgePage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import MainPage2 from './pages/MainPage2';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/judgepage" element={<JudgePage />} />
      <Route path="/CategoryPage" element={<CategoryPage />}/>
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/MainPage2" element={<MainPage2 />} />
      <Route path="/SignUp" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
