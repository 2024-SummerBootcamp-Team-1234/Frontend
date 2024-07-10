import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import JudgePage from './pages/JudgePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/judgepage" element={<JudgePage />} />
    </Routes>
  );
}

export default App;
