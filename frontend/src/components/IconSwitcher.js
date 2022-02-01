import React from "react";
import analyticsIcon from "../assets/analytics-icon.png";
import appIcon from "../assets/app-icon.png";
import backendIcon from "../assets/backend-icon.png";
import chatbotIcon from "../assets/chatbot-icon.png";
import designIcon from "../assets/design-icon.png";
import financialIcon from "../assets/financial-icon.png";
import frontendIcon from "../assets/frontend-icon.png";
import fullstackIcon from "../assets/fullstack-icon.png";
import gameIcon from "../assets/game-icon.png";
import lawIcon from "../assets/law-icon.png";
import leadIcon from "../assets/lead-icon.png";
import qaIcon from "../assets/qa-icon.png";

const IconSwitcher = (category) => {
  switch (category) {
    case "Frontend":
      return frontendIcon;
    case "Backend":
      return backendIcon;
    case "Graphics and Design":
      return designIcon;
    case "Fullstack":
      return fullstackIcon;
    case "App Developer":
      return appIcon;
    case "Chatbots":
      return chatbotIcon;
    case "Project Lead":
      return leadIcon;
    case "QA":
      return qaIcon;
    case "Legal Consulting":
      return lawIcon;
    case "Financial Consulting":
      return financialIcon;
    case "Analytics":
      return analyticsIcon;
    case "Game Developer":
      return gameIcon;
    default:
      return "";
  }
};

export default IconSwitcher;
