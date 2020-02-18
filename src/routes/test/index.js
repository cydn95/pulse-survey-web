import React, { useState } from 'react';

import Slider from 'Components/Slider';
import Checkbox from 'Components/Checkbox';

function Test() {
  const [percent, setPercent] = useState(0);
  const [sel, setsel] = useState(false);
  const [sel2, setsel2] = useState(false);
  return (
    <div>
    <h2>Components</h2>
    <Slider percent={percent} onChange={setPercent} />
    <Checkbox checked={sel} onChange={setsel}>OK</Checkbox>
    <Checkbox checked={sel2} onChange={setsel2}>Compartmentalize</Checkbox>
    </div>
  );
}

export default Test;
