import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Button from 'Components/Button';

import Input from './search';
import TabPanel from "Components/TabPanel";
import AvatarComponent from "../avatar/Component";

import { Draggable } from 'react-drag-and-drop'

import styles from './styles.scss';

const getSuggestions = (data, filter) => {
  return data.filter(d => (d.fullName).indexOf(filter) !== -1)
}

function SearchBar(props) {
  const { 
    decisionMakers, 
    influencers,
    searchKey,
    addNewStakeholder,
    onClickDecisionMaker
  } = props;

  const [filter, setFilter] = useState(searchKey)

  useEffect(() => {
    setFilter(searchKey)
  }, [searchKey])

  return (
    <div className={styles.main}>
      <div className={styles['input-wrapper']}>
        <Input 
          placeholder="Search"
          value={filter}
          onChange={setFilter} 
          onCancel={() => setFilter("")}
        />
      </div>
      <div className={styles["suggestion-list"]}>
        <TabPanel
          selectedTab="decision"
          data={[
            {
              title: "Decision Makers",
              name: "decision",
              content: (
                <div className={styles['tab-content']}>
                  <span className={styles.cnt}>{getSuggestions(decisionMakers, filter).length === 0 ? `No Users` : getSuggestions(decisionMakers, filter).length + ` Users`}</span>
                  {
                    getSuggestions(decisionMakers, filter).map((d, index) => (
                      <AvatarComponent
                        key={d.projectUserId} 
                        className={styles["avatar-comp"]}
                        username={d.fullName}
                        userId={d.userId}
                        onClick={userId => onClickDecisionMaker(userId)}
                        description={`${d.organisation} / ${d.team}`}
                        profilePicUrl={`/assets/img/profile-pic-l-2.jpg`}
                        userProgress={(10 + index * 10) % 100}
                      />
                    ))
                  }
                </div>
              ),
            },
            {
              title: "Influencers",
              name: "influencers",
              content: (
                <div className={styles['tab-content']}>
                  <span className={styles.cnt}>{getSuggestions(influencers, filter).length === 0 ? `No Users` : getSuggestions(influencers, filter).length + ` Users`}</span>
                  {
                    getSuggestions(influencers, filter).map((d, index) => (
                      <Draggable key={d.projectUserId} type="stakeholder" data={d.projectUserId} >
                        <AvatarComponent
                          className={styles["avatar-comp"]}
                          key={d.username}
                          username={d.fullName}
                          description={`${d.organisation} / ${d.team}`}
                          profilePicUrl={`/assets/img/profile-pic-l-2.jpg`}
                          userProgress={(10 + index * 10) % 100}
                        />
                      </Draggable>
                    ))
                  }
                </div>
              ),
            }
          ]}
        >
        </TabPanel>
      </div>
      <Button className={styles['add-stakeholder']} onClick={addNewStakeholder}>Add New Stakeholder</Button>
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