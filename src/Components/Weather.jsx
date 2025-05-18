import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "../App";
import WaterDroplets from "./WaterDroplets";
import ThemeSet from "./Theme";
import { Fetchdata } from "../Services/weatherservice";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import CompressIcon from "@mui/icons-material/Compress";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
import ToysIcon from "@mui/icons-material/Toys"; // acts as a windmill/fan

const WeatherApp = () => {
  const [theme] = useContext(ThemeContext);
  const [city, setCity] = useState("");
  const [isError, setError] = useState(false);
  const [weather, setWeather] = useState({
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
      humidity: 0,
      pressure: 0,
      grnd_level: 0,
    },
    weather: [{ description: "", icon: "" }],
    wind: { speed: 0 },
    clouds: { all: 0 },
    sys: { country: "", sunrise: 0, sunset: 0 },
    name: "",
    timezone: 0,
    dt: 0,
  });
  const [image, setImage] = useState("");
  const [timeDate, setTimeDate] = useState({ date: "", time: "" });
  const [sun, setSun] = useState({ sunrise: "", sunset: "" });
  const moveClouds = keyframes`
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: 1000px;
  }
`;
const rotatingFan = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "linear",

    },
  },
};
  useEffect(() => {
    fetchCityData("Tiruvannamalai");
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value.toUpperCase());
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.currentTarget.id === "citysearch") {
      fetchCityData(city);
    }
  };

  const fetchCityData = async (cityName) => {
    try {
      const response = await Fetchdata(cityName);
      const data = response.data;
      setWeather(data);
      setImage(
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );

      const localDate = new Date((data.dt + data.timezone) * 1000)
        .toUTCString()
        .split(" ");
      const timeParts = localDate[4].split(":");
      const formattedTime = `${timeParts[0]}:${timeParts[1]}`;
      setTimeDate({
        date: localDate.slice(0, 4).join(" "),
        time: formattedTime,
      });

      const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000)
        .toUTCString()
        .split(" ")[4];
      const sunset = new Date((data.sys.sunset + data.timezone) * 1000)
        .toUTCString()
        .split(" ")[4];
      setSun({
        sunrise: sunrise.split(":").slice(0, 2).join(":"),
        sunset: sunset.split(":").slice(0, 2).join(":"),
      });

      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  // Background image based on theme
  const backgroundImage = theme
    ? "url('https://img.icons8.com/emoji/96/sun-emoji.png')"
    : "url('https://img.icons8.com/emoji/96/full-moon-emoji.png')";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 2,
        background: theme
          ? "linear-gradient(to bottom right, #fceabb, #f8b500)" // light sunny warm yellow
          : "linear-gradient(to bottom right, #0a1216, #16202a, #243242)", // deeper night blues
        color: theme ? "black" : "#e0e0e0",
        transition: "background 0.5s ease-in-out",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: `url("https://cdn-icons-png.flaticon.com/512/414/414825.png")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "contain",
          animation: `${moveClouds} 60s linear infinite`,
          opacity: theme ? 0.1 : 0.15,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        custom={0}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="wrap"
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              variant="outlined"
              label="Search City"
              autoComplete="off"
              onChange={handleChange}
              onKeyUp={handleSearch}
              value={city}
              sx={{
                input: { color: theme ? "black" : "#e0e0e0" }, // light text
                label: { color: theme ? "black" : "#90caf9" }, // soft blue label for night
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme ? undefined : "#90caf9", // night mode border color
                  },
                  "&:hover fieldset": {
                    borderColor: theme ? undefined : "#42a5f5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme ? undefined : "#1976d2",
                  },
                },
              }}
            />

            <IconButton id="citysearch" onClick={handleSearch}>
              <SearchIcon sx={{ color: theme ? "black" : "white" }} />
            </IconButton>
          </Box>
          <ThemeSet />
        </Box>
      </motion.div>

      {isError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h6"
            color={theme ? "error" : "#ff8a80"} // soft red for night
            align="center"
          >
            No Result Found!
          </Typography>
        </motion.div>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        custom={1}
      >
        <Card
          sx={{
            maxWidth: 700,
            mx: "auto",
            bgcolor: theme ? "#fff9c4" : "rgba(18, 24, 27, 0.75)",
            color: theme ? "black" : "#e0e0e0",
            boxShadow: theme
              ? "0 4px 12px rgba(255, 193, 7, 0.3)"
              : "0 8px 32px rgba(0, 0, 0, 0.7)",
            borderRadius: 3,
            backdropFilter: theme ? "none" : "blur(8px)",
            border: theme ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <CardContent>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="h6">
                  🌏 {weather.name}, {weather.sys.country}
                </Typography>
                <Typography variant="body2">
                  {timeDate.date} | {timeDate.time}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ textTransform: "capitalize" }}
                >
                  {weather.weather[0].description}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar src={image} sx={{ width: 80, height: 80 }} />
              </Grid>
            </Grid>

            <Card
              sx={{
                maxWidth: 700,
                mx: "auto",
                mt: 2,
                bgcolor: theme ? "#fff9c4" : "rgba(18, 24, 27, 0.75)",
                color: theme ? "black" : "#e0e0e0",
                boxShadow: theme
                  ? "0 4px 12px rgba(255, 193, 7, 0.3)"
                  : "0 8px 32px rgba(0, 0, 0, 0.7)",
                borderRadius: 3,
                backdropFilter: theme ? "none" : "blur(8px)",
                border: theme ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                mb: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                  Dawn & Dusk
                </Typography>
                <Grid container spacing={2} justifyContent="space-between">
                  {[
                    {
                      label: "Sunrise",
                      value: `${sun.sunrise} AM`,
                      icon: (
                        <WbSunnyIcon
                          sx={{ mr: 1, color: theme ? "#fdd835" : "#fff176" }}
                        />
                      ),
                    },
                    {
                      label: "Sunset",
                      value: `${sun.sunset} PM`,
                      icon: (
                        <NightsStayIcon
                          sx={{ mr: 1, color: theme ? "#3f51b5" : "#7986cb" }}
                        />
                      ),
                    },
                  ].map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item.icon} {item.label}: {item.value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
            <Card
              sx={{
                maxWidth: 700,
                mx: "auto",
                mt: 2,
                bgcolor: theme ? "#fff9c4" : "rgba(18, 24, 27, 0.75)",
                color: theme ? "black" : "#e0e0e0",
                boxShadow: theme
                  ? "0 4px 12px rgba(255, 193, 7, 0.3)"
                  : "0 8px 32px rgba(0, 0, 0, 0.7)",
                borderRadius: 3,
                backdropFilter: theme ? "none" : "blur(8px)",
                border: theme ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                mb: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                  Temperature
                </Typography>
                <Grid container spacing={2} justifyContent="space-between">
                  {[
                    {
                      label: "Current",
                      value: `${weather.main.temp}°C`,
                      icon: (
                        <ThermostatIcon
                          sx={{ mr: 1, color: theme ? "#ff5722" : "#ff8a65" }}
                        />
                      ),
                    },
                    {
                      label: "Min",
                      value: `${weather.main.temp_min}°C`,
                      icon: (
                        <ThermostatIcon
                          sx={{ mr: 1, color: theme ? "#ef5350" : "#ef9a9a" }}
                        />
                      ),
                    },
                    {
                      label: "Max",
                      value: `${weather.main.temp_max}°C`,
                      icon: (
                        <ThermostatIcon
                          sx={{ mr: 1, color: theme ? "#ef5350" : "#ef9a9a" }}
                        />
                      ),
                    },
                  ].map((item, index) => (
                    <Grid item xs={4} key={index}>
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {item.icon} {item.label}: {item.value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                bgcolor: theme ? "#fff9c4" : "rgba(18, 24, 27, 0.75)",
                color: theme ? "black" : "#e0e0e0",
                boxShadow: theme
                  ? "0 4px 12px rgba(255, 193, 7, 0.3)"
                  : "0 8px 32px rgba(0, 0, 0, 0.7)",
                borderRadius: 3,
                backdropFilter: theme ? "none" : "blur(8px)",
                border: theme ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="h6">Wind</Typography>
                <Typography variant="body2">
                  Speed: {weather.wind.speed} m/s
                </Typography>
              </Box>

              <motion.div variants={rotatingFan} animate="animate">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/17433/17433096.png"
                  alt="Rotating fan"
                  style={{ width: 50, height: 50 }}
                />
              </motion.div>
              <Box>
                <Typography variant="h6">Humidity</Typography>
                <Typography variant="body2">
                  {weather.main.humidity} %
                </Typography>
</Box>
                <motion.div
                  
                  animate="animate"
                  style={{ width: 50, height: 50 }}
                >
                  <WaterDroplets />
                </motion.div>
            </Box>

            <Grid container spacing={2} mt={4} display={"flex"} justifyContent={"space-between"}>
              {[
                {
                  label: "Pressure",
                  value: `${weather.main.pressure} hPa`,
                  icon: (
                    <CompressIcon
                      sx={{ mr: 1, color: theme ? "#8d6e63" : "#a1887f" }}
                    />
                  ),
                },
                {
                  label: "Ground Level",
                  value: `${weather.main.grnd_level} hPa`,
                  icon: (
                    <CompressIcon
                      sx={{ mr: 1, color: theme ? "#6d4c41" : "#bcaaa4" }}
                    />
                  ),
                },
                {
                  label: "Cloudiness",
                  value: `${weather.clouds.all} %`,
                  icon: (
                    <FilterDramaIcon
                      sx={{ mr: 1, color: theme ? "#90a4ae" : "#b0bec5" }}
                    />
                  ),
                },
              ].map((item, index) => (
                <Grid item xs={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      {item.icon} {item.label}: {item.value}
                    </Typography>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default WeatherApp;
