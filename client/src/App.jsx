
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import Register from './components/register/Register'
import Message from './components/message/Message'
import Login from './components/login/Login'
import Content from './components/content/Content'

function App() {

  return (
    <div className='App'>
      <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path='/log/register' element ={<Register/>}/>
          <Route path='/log/login' element ={<Login/>}/>
          <Route path='/log/content/:_id/:token' element ={<Content/>}/>
          <Route path='/log/message/:token' element ={<Message/>}/>
      </Routes>
        
    </div>
  )
}

export default App
