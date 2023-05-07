
import './App.css';
import Datatable from './component/DataTable';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Form from './component/Form';


function App() {
  return (
    <BrowserRouter >
    <Routes >
      <Route  >
        <Route path='/' element={<Form/>}/>
        <Route path='/datatable' element={<Datatable/>}/>
      </Route>
    </Routes>
  </BrowserRouter> 
  );
}

export default App;
