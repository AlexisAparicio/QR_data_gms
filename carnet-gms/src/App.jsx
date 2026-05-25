import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Carnet from './components/Carnet';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Carnet />} />
        <Route path="/verify/:token" element={<Carnet />} />
      </Routes>
    </BrowserRouter>
  );
}