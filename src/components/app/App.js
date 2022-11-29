import AuthorizationPage from '../pages/AuthorizationPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Page404 from '../pages/404';
import './App.css';

function App() {
  return (
    <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path='/' element={<AuthorizationPage/>}/>
              <Route path='/desc' element={<MainPage/>}/>
              <Route path='*' element={<Page404/>}/>
            </Routes>
          </main>
        </div>
    </Router>
  );
}

export default App;
