import React, { useState } from 'react';

import Slider from 'Components/Slider';
import Checkbox from 'Components/Checkbox';
import Radio from 'Components/Radio';
import Donut from 'Components/Donut';
import LineGraph from 'Components/LineGraph';

import styles from './styles.scss';

function Test() {
  const [percent, setPercent] = useState(0);
  const [sel, setsel] = useState(false);
  const [sel2, setsel2] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [r2, setr2] = useState(false);
  const [data, setData] = useState(
    [
      { name: "Pie1", count: 15 },
      { name: "Pie2", count: 20 },
      { name: "Pie3", count: 80 }
    ]
  )

  const handleClick = (datum) => {
    setData(data.filter(d => d.name !== datum.name));
  };

  return (
    <div>
    <h2>Components</h2>
    <Slider percent={percent} onChange={setPercent} />
    <Checkbox checked={sel} onChange={setsel}>OK</Checkbox>
    <Checkbox checked={sel2} onChange={setsel2}>Compartmentalize</Checkbox>
    <Radio name="a" value="1" checked={radioValue === "1"} onChange={setRadioValue}>Option 1</Radio>
    <Radio name="a" value="2" checked={radioValue === "2"} onChange={setRadioValue}>Option 2</Radio>
    <button onClick={() => setData([...data, { name: "Pie" + data.length + 1, count: Math.random() * 50 + 10 }])}>Add</button>
    <div className={styles['linegraph-container']}>
      <LineGraph 
        keySelector={d => d.name}
        data={data}
      />
    </div>
    <button onClick={() => setData([...data, { name: "Pie" + data.length + 1, count: Math.random() * 50 + 10 }])}>Add</button>
    <div className={styles['donut-container']}>
      <Donut 
        label="Total questions answered"
        value={"80%"}
        onClick={handleClick} 
        keySelector={d => d.name}
        data={data}
      />
    </div>
    
    </div>
  );
}

export default Test;
