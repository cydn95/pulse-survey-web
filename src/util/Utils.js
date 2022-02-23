export const prevMonth = (str) => {
  let month = new Date(Date.parse(str.split(' ')[0] +" 1, 2012")).getMonth()
  let year = str.split(' ')[1]
  if (month === 0) {
    month = 12;
    year = parseInt(year) - 1
  }
  return `${MONTH(month)} ${year}`
}

export const getPrevMonthData = (trend, key) => {
  let data = []
  let newKey = prevMonth(key)
  if(!trend[newKey] || arrayAverage([...trend[newKey]]) === 0) {
    data = getPrevMonthData(trend, newKey)
    return data
  } else {
    return trend[newKey];
  }
}

export const mapOrder = (array, order, key) => {
  array.sort(function (a, b) {
    var A = a[key],
      B = b[key];
    if (order.indexOf(A + "") > order.indexOf(B + "")) {
      return 1;
    } else {
      return -1;
    }
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "." + mm + "." + yyyy;
};

export const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes();
};

export const getCurrentYear = () => {
  const now = new Date();
  return now.getFullYear();
}

export const getCurrentMonth = () => {
  const now = new Date();
  return now.getMonth() + 1;
}

export const addCommas = (nStr) => {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
};

export const createMarkup = (html) => {
  return { __html: html };
};

export const MONTH = (month) => {
  switch (month) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "";
  }
}

export const getAverage = (nums) => {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b) / nums.length;
}

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomFloat = (min, max) => {
  return (Math.random() * (max - min) + min);
};

export const arrayAverage = (nums) => {
  if (!nums) return 0;
  if (nums.length === 0) return 0;

  return nums.reduce((a, b) => (a + b)) / nums.length;
}

export const getRandomSubArray = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

// export const getColorFromValue = (val) => {
//   if (val < 2.5) {
//     return '#a9709c';
//   } else if (val < 4) {
//     return '#8a86b8';
//   } else if (val < 5) {
//     return '#838db8';
//   } else if (val < 6) {
//     return '#60adb6';
//   } else if (val < 7) {
//     return '#52bab5';
//   } else if (val < 8) {
//     return '#62bea3';
//   } else if (val < 9) {
//     return '#75c290';
//   } else {
//     return '#87c67d';
//   }
// }

export const getColorFromValue = (val) => {
  // if (val < 2.5) {
  //   return '#a9709c';
  // } else if (val < 4) {
  //   return '#8a86b8';
  // } else if (val < 5) {
  //   return '#838db8';
  // } else if (val < 6) {
  //   return '#2b5770';
  // } else if (val < 7) {
  //   return '#a0409d';
  // } else if (val < 8) {
  //   return '#aa984b';
  // } else if (val < 9) {
  //   return '#66931f';
  // } else {
  //   return '#14b0bf';
  // }

  // if (val < 4) {
  //   return "#c00000"; // dark red
  // }

  // if (val < 5) {
  //   return "#e56965"; // lighter red
  // }

  // if (val < 7) {
  //   return "#4da9ef"; // blue
  // }

  // if (val < 8) {
  //   return "#8acbc1"; // lighter green
  // }

  if (val <= 1) {
    return "#e56965";
  }

  if (val <= 2) {
    return "#c0788a";
  }

  if (val <= 3) {
    return "#a185a8";
  }

  if (val <=4) {
    return "#8296c6";
  }

  if (val <= 5) {
    return "#659fe2";
  }

  if (val <= 6) {
    return "#4ba8ed";
  }

  if (val <= 7) {
    return "#3bacdd";
  }

  if (val <= 8) {
    return "#2aaecc";
  }

  if (val <= 9) {
    return "#19b2bb";
  }

  if (val <= 10) {
    return "#24beb3";
  }

  return "#24beb3"; // solid green
}

export const isJSONObject = (obj) => {
  if (obj === null) {
    return false;
  }

  if (obj === undefined) {
    return false;
  }

  try {
    const json = JSON.parse(obj);

    const stringConstructor = "test".constructor;
    const arrayConstructor = [].constructor;
    const objectConstructor = ({}).constructor;

    if (json.constructor === stringConstructor) {
      return false;
    }
    if (json.constructor === arrayConstructor) {
      return false;
    }
    if (json.constructor === objectConstructor) {
      return true;
    }

  } catch (e) {
    return false;
  }

  return false;
}
