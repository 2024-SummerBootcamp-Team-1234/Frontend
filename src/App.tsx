import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';

import LoginPage from './pages/LoginPage';
import MainPage2 from './pages/MainPage2';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/CategoryPage" element={<CategoryPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/MainPage2" element={<MainPage2 />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
