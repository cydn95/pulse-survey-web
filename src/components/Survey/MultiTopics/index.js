import React from "react";
import { isMobile } from "react-device-detect";

import DesktopComponent from "./desktop/DesktopComponent";
import MobileComponent from "./mobile/MobileComponent";

const MultiTopics = (props) =>
  isMobile ? <MobileComponent {...props} /> : <DesktopComponent {...props} />;

export default MultiTopics;
