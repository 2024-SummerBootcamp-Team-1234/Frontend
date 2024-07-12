import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage2 from './pages/MainPage2';
import CategoryPage from './pages/CategoryPage';
import LatestPostPage from './pages/LatestPostPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/CategoryPage" element={<CategoryPage />}/>
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/MainPage2" element={<MainPage2 />} />
      <Route path="/SignUp" element={<SignupPage />} />
      <Route path="/LatestPostPage" element={<LatestPostPage />} />
    </Routes>
  );
}

export default App;
