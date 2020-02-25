import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Button from 'Components/Button';

import Input from './search';
import SuggestionOption from './suggestion-option';

import styles from './styles.scss';

const getSuggestions = (data, filter) => {
  return data.filter(d => (d.firstName + " " + d.lastName).indexOf(filter) !== -1)
}

function SearchBar(props) {
  const { 
    data, 
    searchKey,
    addNewStakeholder,
  } = props;

  const [filter, setFilter] = useState(searchKey)

  useEffect(() => {
    setFilter(searchKey)
  }, [searchKey])

  return (
    <div className={styles.main}>
      <h2>Search Bar</h2>
      <Input 
        placeholder="Search / Add New Placeholder"
        value={filter}
        onChange={setFilter} 
        onCancel={() => setFilter("")}
      />
      <div className={styles["suggestion-list"]}>
        {
          getSuggestions(data, filter).map((d, i) => (
            <SuggestionOption 
              key={i}
              name={d.firstName + " " + d.lastName} 
              description={d.description}
            />
          ))
        }
      </div>
      <Button onClick={addNewStakeholder}>Add New Stakeholder</Button>
    </div>
  )
}

SearchBar.defaultProps = {
  searchKey: "",
  data: [],
}

SearchBar.propTypes = {
  searchKey: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  addNewStakeholder: PropTypes.func.isRequired,
}

export default SearchBar;