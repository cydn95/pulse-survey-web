import React from "react";
import Input from 'Components/Input';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import styles from './styles.scss';

function SearchInput(props) {
  const {
    placeholder,
    value,
    onChange,
    onCancel,
  } = props;

  return (
    <label className={styles.main}>
      <FontAwesomeIcon className={styles["search-icon"]} icon={faSearch} />
      <Input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {value !== "" && <FontAwesomeIcon
        onClick={onCancel}
        className={styles["cross-icon"]}
        icon={faTimes}
      />
      }
    </label>
  )
}

export default SearchInput;
