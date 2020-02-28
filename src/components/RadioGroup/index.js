import React, { useState } from "react";
import Radio from "Components/Radio";

function RadioGroup(props) {
  const {
    className,
    data,
    valueSelector,
    selectedValue,
    labelSelector,
    onChange,
  } = props;

  const [value, setValue] = useState(selectedValue)
  const [name] = useState(Date.now() + "")

  const handleChange = (value) => {
    setValue(value)
    onChange(value)
  }

  return (
    <div className={className}>
      {
        data.map(d => (
          <Radio
            key={valueSelector(d)}
            name={name}
            value={valueSelector(d)}
            checked={valueSelector(d) === value}
            onChange={handleChange}
          >
            {labelSelector(d)}
          </Radio>
        ))
      }
    </div>
  )
}

RadioGroup.propTypes = {
  onChange: () => null,
}

export default RadioGroup