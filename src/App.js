import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import List from './pages/List';
import Layout from './helper/Layout';
import Search from './pages/Search';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<List />} />
        <Route path='/search' element={<Search />} />
      </Route>
    </Routes>
    </BrowserRouter>
   
  
  );
}

export default App;
