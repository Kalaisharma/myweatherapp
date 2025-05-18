// import './App.css';
// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import WeatherApp from './Components/Weather';
// import React, {useState } from 'react';
// import ThemeSet from './Components/Theme';
// export const ThemeContext=React.createContext()
// function App() {
// const[theme,settheme]=useState(true)
//   return (
//     <div className="App">
//       <ThemeContext.Provider value={[theme,settheme]}>
//       <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<WeatherApp/>}/>
//         <Route path='/theme' element={<ThemeSet/>}/>
//       </Routes>
//       </BrowserRouter>
//       </ThemeContext.Provider>
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import WeatherApp from "./Components/Weather";
import ThemeSet from "./Components/Theme";
import "./App.css";

export const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState(true); // true = light theme, false = dark

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: theme ? "#fdf6e3" : "#121212",
          color: theme ? "black" : "white",
          minHeight: "100vh",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WeatherApp />} />
            <Route path="/theme" element={<ThemeSet />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeContext.Provider>
  );
}

export default App;
