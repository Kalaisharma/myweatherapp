import { useContext } from "react";
import { ThemeContext } from "../App";
import { IconButton, Tooltip } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeSet = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  const handleToggle = () => {
    setTheme(!theme);
  };

  return (
    <div style={{ position: "absolute", top: 20, right: 20 }}>
      <Tooltip title={`Switch to ${theme ? "Light" : "Dark"} Mode`}>
        <IconButton
          onClick={handleToggle}
          color="inherit"
          sx={{ fontSize: 50 }}
        >
          {theme ? (
            <DarkModeIcon sx={{ fontSize: 50, color: "#3f51b5" }} />
          ) : (
            <WbSunnyIcon sx={{ fontSize: 50, color: "#fdd835" }} />
          )}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ThemeSet;
