import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Button from 'Components/Button';

import Input from './search';
import SuggestionOption from './suggestion-option';

import { Draggable } from 'react-drag-and-drop'

import styles from './styles.scss';

const getSuggestions = (data, filter) => {
  return data.filter(d => (d.fullName).indexOf(filter) !== -1)
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
      <Input 
        placeholder="Search"
        value={filter}
        onChange={setFilter} 
        onCancel={() => setFilter("")}
      />
      <div className={styles["suggestion-list"]}>
        {
          getSuggestions(data, filter).map((d) => (
            <Draggable key={d.projectUserId} type="stakeholder" data={d.projectUserId} >
              <SuggestionOption 
                name={d.fullName} 
                description={`${d.organisation} / ${d.team}`}
              />
            </Draggable>
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