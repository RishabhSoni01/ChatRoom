import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './Pages/ChatPage';
import Homepage from './Pages/Homepage';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage />} exact />
          <Route path='/chats' element={<ChatPage />}/>
        </Routes>
          
      </div>
    
  );
}

export default App;
