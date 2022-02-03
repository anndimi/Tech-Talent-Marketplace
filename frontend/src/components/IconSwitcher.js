import React from "react";
import analyticsIcon from "../assets/icons/analytics-icon.png";
import appIcon from "../assets/icons/app-icon.png";
import backendIcon from "../assets/icons/backend-icon.png";
import chatbotIcon from "../assets/icons/chatbot-icon.png";
import designIcon from "../assets/icons/design-icon.png";
import financialIcon from "../assets/icons/financial-icon.png";
import frontendIcon from "../assets/icons/frontend-icon.png";
import fullstackIcon from "../assets/icons/fullstack-icon.png";
import gameIcon from "../assets/icons/game-icon.png";
import lawIcon from "../assets/icons/law-icon.png";
import leadIcon from "../assets/icons/lead-icon.png";
import qaIcon from "../assets/icons/qa-icon.png";

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
