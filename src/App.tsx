import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import JudgePage from './pages/JudgePage';
import MainPage2 from './pages/MainPage2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/judgepage" element={<JudgePage />} />
      <Route path="/MainPage2" element={<MainPage2 />} />
    </Routes>
  );
}

export default App;
