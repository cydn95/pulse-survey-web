import React, { useState } from 'react';

import Slider from 'Components/Slider';
import Checkbox from 'Components/Checkbox';
import Radio from 'Components/Radio';
import MultiTopic from 'Components/multi-topic';
import DriverPanel from "Components/driver";
import AssessmentSummary from "Components/assessment";
import AvatarList from "Components/avatar";
import SearchBar from "Components/search-bar";
import Accordion from "Components/accordion";
import DropDown from "Components/dropdown";

import { ResponsiveDonut as Donut } from 'Components/Donut';
import SurveyLineGraph from 'Components/SurveyLineGraph';

import styles from './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const driverdata = [
    {
      driverId: 2,
      driverName: "Engagement",
      percentage: 20,
      progress: 0,
      icon: "plus",
    },
    {
      driverId: 3,
      driverName: "Influence",
      percentage: 90,
      progress: 2,
      icon: "user",
    }, 
    {
      driverId: 4,
      driverName: "Interest",
      percentage: 50,
      progress: 1,
      icon: "comment",
    },
    {
      driverId: 3,
      driverName: "Influence",
      percentage: 90,
      progress: 2,
      icon: "user",
    }, 
    {
      driverId: 4,
      driverName: "Interest",
      percentage: 50,
      progress: 1,
      icon: "comment",
    },
    {
      driverId: 3,
      driverName: "Influence",
      percentage: 90,
      progress: 2,
      icon: "user",
    }, 
    {
      driverId: 4,
      driverName: "Interest",
      percentage: 50,
      progress: 1,
      icon: "comment",
    },
    {
      driverId: 3,
      driverName: "Influence",
      percentage: 90,
      progress: 2,
      icon: "user",
    }, 
    {
      driverId: 4,
      driverName: "Interest",
      percentage: 50,
      progress: 1,
      icon: "comment",
    }
  ]

  const user_info = [
    { 
      username: "Jane Doe", 
      description: "Topsides Delivery Manager​ Topsides Team BP",
      profilePicUrl: "/assets/img/profile-pic-l-2.jpg" ,
    },
    { 
      username: "Uttam Khanal", 
      description: "I am a software engineer.",
      profilePicUrl: "/assets/img/profile-pic-l-2.jpg",
    },
  ]

  const [search, setSearch] = useState("")

  const searchKey = "oh";
  const search_data = [
    { firstName: "John", lastName: "Doe", description: "Topsides Delivery Manager " },
    { firstName: "James", lastName: "Doe", description: "Topsides Delivery Manager " },
  ];

  return (
    <div>
      <h2>Components</h2>
      <Slider percent={percent} onChange={setPercent} />
      <Checkbox checked={sel} onChange={setsel}>OK</Checkbox>
      <Checkbox checked={sel2} onChange={setsel2}>Compartmentalize</Checkbox>
      <Radio name="a" value="1" checked={radioValue === "1"} onChange={setRadioValue}>Option 1</Radio>
      <Radio name="a" value="2" checked={radioValue === "2"} onChange={setRadioValue}>Option 2</Radio>
      <DropDown
        data={[
          { key: 1, title: "Option 1" },
          { key: 2, title: "Option 2" },
          { key: 3, title: "Option 3" }
        ]}
        keySelector={d => d.key}
        valueSelector={d => d.title}
        onSelect={d => alert(JSON.stringify(d))}
      >
        SH Only
      </DropDown>
      <SearchBar 
        searchKey={searchKey} 
        data={search_data} 
        addNewStakeholder={() => alert('add new stakeholder')}
      />
      <Accordion
        keySelector={d => d.title}  
        headerSelector={d => d.title}  
        componentSelector={d => d.component}  
        iconSelector={d => d.icon}
        data={
          [
            { title: "Engagement", component: (<div>Engagement panel<div>another component</div></div>), icon: "comment" },
            { title: "Influence", component: (<div>Influence panel<div>hello component</div></div>), icon: "plus" }
          ]
        }
      />
      <MultiTopic
        title="Key Themes"
        options={topicData}
        addNewTopic={(topic, comment) => setTopicData([...topicData, { topic, comment}])}
      />
      <DriverPanel 
        className={styles.panel} 
        data={driverdata} 
      />
      <AssessmentSummary 
        className={styles.panel} 
        data={driverdata} 
      />
      <AvatarList 
        className={styles.panel} 
        data={user_info} 
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
