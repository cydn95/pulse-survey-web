import React, { useState } from 'react';

import Slider from 'Components/Slider';
import Checkbox from 'Components/Checkbox';
import Radio from 'Components/Radio';
import MultiTopic from 'Components/multi-topic';

import { ResponsiveDonut as Donut } from 'Components/Donut';
import SurveyLineGraph from 'Components/SurveyLineGraph';

import styles from './styles.scss';

function Test() {
  const [percent, setPercent] = useState(0);
  const [sel, setsel] = useState(false);
  const [sel2, setsel2] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [r2, setr2] = useState(false);
  const [sentiment, setSentiment] = useState("happy");
  const [data, setData] = useState(
    [
      { name: "Pie1", count: 15 },
      { name: "Pie2", count: 20 },
      { name: "Pie3", count: 80 }
    ]
  )

  const [survey_data] = useState(
    [
      { name: "Question 1", yourAnswer: 15, teamAnswer: 20 },
      { name: "Question 2", yourAnswer: 20, teamAnswer: 80 },
      { name: "A very long Question, must break at 200px ", yourAnswer: 80, teamAnswer: 45 }
    ]
  )

  const handleClick = (datum) => {
    setData(data.filter(d => d.name !== datum.name));
  };

  const toggle = () => {
    setSentiment(sentiment === 'sad' ? 'happy' : 'sad')
  }

  const [topicData, setTopicData] = useState(
    [
      { topic: "Topic 1", comment: "I am worried about our approach to hazard identification" },
      { topic: "Topic 2", comment: "I don’t think that the earthworks guys are going to deliver on time" },
    ]
  )

  return (
    <div>
      <h2>Components</h2>
      <Slider percent={percent} onChange={setPercent} />
      <Checkbox checked={sel} onChange={setsel}>OK</Checkbox>
      <Checkbox checked={sel2} onChange={setsel2}>Compartmentalize</Checkbox>
      <Radio name="a" value="1" checked={radioValue === "1"} onChange={setRadioValue}>Option 1</Radio>
      <Radio name="a" value="2" checked={radioValue === "2"} onChange={setRadioValue}>Option 2</Radio>
      <MultiTopic
        title="Key Themes"
        options={topicData}
        addNewTopic={(topic, comment) => setTopicData([...topicData, { topic, comment}])}
      />
      <button onClick={() => setData([...data, { name: "Pie" + data.length + 1, count: Math.floor(Math.random() * 50 + 10) }])}>Add</button>
      <div className={styles['linegraph-container']}>
        <SurveyLineGraph
          keySelector={d => d.name}
          questionNameSelector={d => d.name}
          yourAnswerSelector={d => d.yourAnswer}
          teamsAnswerSelector={d => d.teamAnswer}
          data={survey_data}
        />
      </div>
      <button onClick={toggle}>Toggle Sentiment</button>
      <div className={styles['donut-container']}>
        <Donut
          className={styles.donut}
          keySelector={d => d.name}
          valueSelector={d => d.count}
          sentiment={sentiment}
          onClick={handleClick}
          data={data}
        />
        <div className={styles.info}>
          <h3>Total Questions Answered</h3>
          <h2>80%</h2>
        </div>
      </div>

    </div>
  );
}

export default Test;
