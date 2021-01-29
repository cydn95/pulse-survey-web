import React from "react";
import WordCloud from "react-d3-cloud";

const data = [
  { text: "Hey", value: 1000 },
  { text: "lol", value: 200 },
  { text: "first impression", value: 800 },
  { text: "very cool", value: 1000000 },
  { text: "duck", value: 10 },
  { text: "Safety", value: 400 },
  { text: "Communication", value: 4300 },
  { text: "Busy", value: 2723 },
  { text: "Project", value: 1090 },
  { text: "Members", value: 6410 },
  { text: "Agile", value: 8000 },
];

const fontSizeMapper = (word) => Math.log2(word.value) * 15;
const rotate = (word) => word.value % 360;

const ReportWordCloud = ({ chartWidth, data }) => {
  return (
    <div>
      <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        rotate={0}
        width={chartWidth}
        height={chartWidth * 0.75}
      />
    </div>
  );
};

export default ReportWordCloud;
