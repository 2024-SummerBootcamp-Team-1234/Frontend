import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/category" element={<CategoryPage />}/>
    </Routes>
  );
}

export default App;
