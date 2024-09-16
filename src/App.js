import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import WeatherApp from './Components/Weather';
import React, {useState } from 'react';
import ThemeSet from './Components/Theme';
export const ThemeContext=React.createContext()
function App() {
const[theme,settheme]=useState(true)
  return (
    <div className="App">
      <ThemeContext.Provider value={[theme,settheme]}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<WeatherApp/>}/>
        <Route path='/theme' element={<ThemeSet/>}/>
      </Routes>
      </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
