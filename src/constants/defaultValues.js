export const defaultMainMenuClassName = "dashboard";
export const defaultSubMenuClassName = "dashboard";

export const defaultStartPath = "/app/help/how-to-use-pulse";

export const defaultPassword = "p#vh#@3jkda3$";

export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English" },
  { id: "es", name: "Español" },
];

export const apiUrl = process.env.API_URL;
export const serverUrl = process.env.SERVER_URL;

export const controlType = {
  TEXT: 1,
  SLIDER: 2,
  TWO_OPTIONS: 3,
  MULTI_OPTIONS: 4,
  SMART_TEXT: 5,
  MULTI_TOPICS: 6,
};

export const controlTypeText = (type) => {
  if (type === 1) {
    return "TEXT";
  } else if (type === 2) {
    return "SLIDER";
  } else if (type === 3) {
    return "TWO_OPTIONS";
  } else if (type === 4) {
    return "MULTI_OPTIONS";
  } else if (type === 5) {
    return "SMART_TEXT";
  } else if (type === 6) {
    return "MULTI_TOPICS";
  }
};

export const controlTypeTag = (type) => {
  if (type === 1) {
    return "Text";
  } else if (type === 2) {
    return "Slider";
  } else if (type === 3) {
    return "Two Options";
  } else if (type === 4) {
    return "Multi Options";
  } else if (type === 5) {
    return "Smart Text";
  } else if (type === 6) {
    return "Multi Topics";
  }
};

export const controlTypeByTag = {
  "Text": 1,
  "Slider": 2,
  "Two Options": 3,
  "Multi Options": 4,
  "Smart Text": 5,
  "Multi Topics": 6,
}

export const loginErrorType = {
  AUTH_SUCCESS: 9999,
  USERNAME: 1,
  PASSWORD: 2,
  INVALID_PASSWORD: 3,
};

export const loginErrorTypeText = (type) => {
  if (type === loginErrorType.AUTH_SUCCESS) {
    return "";
  } else if (type === loginErrorType.USERNAME) {
    return "Username is required";
  } else if (type === loginErrorType.PASSWORD) {
    return "Password is required";
  } else if (type === loginErrorType.INVALID_PASSWORD) {
    return "The ID and password do not match. Please try again";
  } else {
    return "Unknown Error";
  }
};

export const replaceQuestionTextKeyWord = (questionText, user, projectName) => {
  if (user == null || user === undefined) {
    return questionText;
  }

  if (projectName == null || projectName === undefined) {
    projectName = "Project";
  }

  var str = questionText;

  str = str.replace("{{{PROJECTNAME}}}", projectName);
  str = str.replace("{{{TEAMNAME}}}", user.team);
  str = str.replace("{{{FULLNAME}}}", user.fullName);
  str = str.replace("{{{STAKEHOLDERNAME}}}", user.fullName);

  str = str.replace("{{PROJECTNAME}}", projectName);
  str = str.replace("{{TEAMNAME}}", user.team);
  str = str.replace("{{FULLNAME}}", user.fullName);
  str = str.replace("{{STAKEHOLDERNAME}}", user.fullName);

  return str;
};

export const SURVEY_NOT_STARTED = 0;
export const SURVEY_IN_PROGRESS = 1;
export const SURVEY_COMPLETED = 2;

export const SH_CATEGORY_TYPE = {
  MY_MAP: 2,
  PROJECT_MAP: 3,
};

export const TOPIC_LIMIT = 10;
// export const MOBILE_TOUR_CONTENT = [
//   {
//     background: "#004a7c",
//     img: "/assets/img/tour/mobile/1.png",
//     title: `Welcome To Pulse​`,
//     content:
//       "Pulse gathers and measures team sentiment​ to help projects make better decisions ​and build a culture of clarity.​",
//   },
//   {
//     background: "#c44c3e",
//     img: "/assets/img/tour/mobile/2.png",
//     title: `Help Us Make​ Bravo Expansion​ Successful​`,
//     content: "Play the video above for a welcome​ message from John Doe.​",
//   },
//   {
//     background: "#243444",
//     img: "/assets/img/tour/mobile/3.png",
//     title: `About Me​`,
//     content:
//       "Answer a few questions to tell us  what you think of the project: ​How is it going? Will it succeed?​",
//   },
//   {
//     background: "#528378",
//     img: "/assets/img/tour/mobile/4.png",
//     title: `About Others​`,
//     content:
//       "How do you think other people are​ feeling about the project?​ Who are the people that need to be​ on board for the project to succeed?​",
//   },
//   {
//     background: "#4d3a78",
//     img: "/assets/img/tour/mobile/5.png",
//     title: `Dashboards​`,
//     content:
//       "Gain new insights into the ​things that matter and finds areas​ we can improve.​",
//   },
//   {
//     background: "#33599b",
//     img: "/assets/img/tour/mobile/6.png",
//     title: `Relax. ​It’s safe to speak.​`,
//     content:
//       "There’s no finger-pointing here. ​We explore key themes and concepts ​while keeping your feedback anonymous. ​.​",
//   },
// ];

export const HELP_HEADER = "Pulse is more than a survey"
export const HELP_DESC = "This platform has been taught many of the important concepts​ involved in this project. This questionnaire is not designed to point fingers or find people to blame - but only to improve how we communicate and collaborate. ​Your responses will be anonymised and combined with others to guide managers on new focus areas to improve team/stakeholder engagement and project performance.​"
export const ABOUT_ME = "About Me"
export const ABOUT_ME_DESC = "What you think / feel about the project.​"
export const ABOUT_OTHERS = "About Others"
export const ABOUT_OTHERS_DESC = "What you assume other people are thinking​ or feeling about the project.​​"
