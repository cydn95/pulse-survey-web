import React, { useState } from 'react';

import Slider from 'Components/Slider';

function Test() {
  const [percent, setPercent] = useState(0);
  return <Slider percent={percent} onChange={setPercent} />;
}

export default Test;
