import React from "react";
import { styled, keyframes } from "@mui/material/styles";

const drip = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
  70% {
    opacity: 1;
    transform: translateY(15px) scaleY(1.5);
  }
  100% {
    opacity: 0;
    transform: translateY(30px) scaleY(0.5);
  }
`;

const SvgDroplet = styled("svg")(({ theme }) => ({
  width: 14,
  height: 24,
  fill: theme.palette.mode === "dark" ? "#81d4fa" : "#0288d1",
  opacity: 0.8,
  animation: `${drip} 2s infinite ease-in-out`,
  position: "absolute",
  transformOrigin: "center top",
}));

const DropletsContainer = styled("div")({
  position: "relative",
  width: 60,
  height: 40,
  overflow: "visible",
});

export default function WaterDroplets() {
  return (
    <DropletsContainer>
      {/* Droplet 1 */}
      <SvgDroplet
        style={{ left: 0, animationDelay: "0s" }}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 2C21 15 10 30 10 44a22 22 0 0044 0C54 30 43 15 32 2z" />
      </SvgDroplet>

      {/* Droplet 2 */}
      <SvgDroplet
        style={{ left: 15, animationDelay: "0.5s" }}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 2C21 15 10 30 10 44a22 22 0 0044 0C54 30 43 15 32 2z" />
      </SvgDroplet>

      {/* Droplet 3 */}
      <SvgDroplet
        style={{ left: 30, animationDelay: "1s" }}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 2C21 15 10 30 10 44a22 22 0 0044 0C54 30 43 15 32 2z" />
          </SvgDroplet>
          
    </DropletsContainer>
  );
}
