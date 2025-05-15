 import {BrowserRouter, Route, Routes} from 'react-router-dom';
 import GetUniformes from '../components/GetUniformes';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetUniformes></GetUniformes>} />
      </Routes>
    </BrowserRouter>
  );
}