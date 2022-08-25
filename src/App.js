import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from './app/store'
import { Provider } from 'react-redux'
import './App.css';
import Filter from './components/Filter';
import Content from './components/Content';
import Detail from './components/Detail';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<><Filter /><Content /></>}/>
          <Route exact path="/detail/:id" element={<Detail />}/>
      </Routes>
    </Router>
  );
}

export default App;
