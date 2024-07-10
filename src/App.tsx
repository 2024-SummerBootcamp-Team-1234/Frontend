import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MainPage2 from './pages/MainPage2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/MainPage2" element={<MainPage2 />} />
    </Routes>
  );
}

export default App;
