import React, {useState, useRef, useCallback, useEffect} from "react";
import { connect } from "react-redux";
import ReactTags from 'react-tag-autocomplete';
import Button from 'Components/Button'
import { setKeyThemeTags } from 'Redux/actions'

import classnames from "classnames";
import styles from "./styles_table.scss";
import { getAllTagsBySurvey } from "../../../redux/report/actions";

const PercentBar = ({ value, className = "" }) => {
  return (
    <div
      className={classnames(
        className,
        styles["keythemes-table-percent-container"]
      )}
    >
      <div
        style={{ width: `${value}%` }}
        className={classnames(className, styles["keythemes-table-percent-bar"])}
      ></div>
    </div>
  );
};

const KeyThemesTable = ({ title = "", data = [], setData, onVote, className, projectId, projectList, setKeyThemeTags, getAllTagsBySurvey, surveyId }) => {
  const [totalFreq, setTotalFreq] = useState(0)
  const [open, setOpen] = useState(-1)
  const [tags, setTags] = useState([])
  const [suggestions, setSuggestions] = useState([])
  
  useEffect(() => {
    const total = data.reduce((a, b) => ({ freq: a.freq + b.freq }));
    setTotalFreq(total ? total.freq : 0);
    getAllTagsBySurvey(surveyId, callback1)
  }, [data])
  useEffect(() => {
    setTags((data[open] || {}).tags || [])
  }, [open])
  const reactTags = useRef()

  const onDelete = useCallback((tagIndex, idx) => {
    let temp = [...tags]
    temp = temp.map(d => {
      if (d.topicName === temp[idx].topicName)
      {
        return {
          ...d,
          tags: d.tags.filter((_, i) => i !== tagIndex)
        }
      } else {
        return d
      }
    })
    // temp[idx].tags = temp[idx].tags.filter((_, i) => i !== tagIndex)
    setTags(temp)
  }, [tags])

  const onAddition = useCallback((newTag, idx) => {
    let temp = [...tags]
    temp = temp.map(d => {
      if (d.topicName === temp[idx].topicName)
      {
        return {
          ...d,
          tags: [...d.tags, newTag]
        }
      } else {
        return d
      }
    })
    // temp[idx].tags = [...temp[idx].tags, newTag]
    setTags(temp)
  }, [tags])

  const callback1 = useCallback((success, data) => {
   if (success) {
     setSuggestions(data)
   } 
  })

  const callback = useCallback((success) => {
    if (success) {
      let temp = [...data]
      temp[open].tags = tags
      setData(temp)
      setOpen(-1)
    }
    else
      console.log('something went wrong')
  })

  return (
    <div className={classnames(styles["keythemes-table-root"], className)}>
      <div className={styles["keythemes-table-header"]}>
        <div
          className={styles["keythemes-table-header-item"]}
          style={{ width: "25%" }}
        >
          FREQUENCY
        </div>
        <div
          className={styles["keythemes-table-header-item"]}
          style={{ width: "39%" }}
        >
          THEME
        </div>
        <div
          className={styles["keythemes-table-header-item"]}
          style={{ width: "12%", justifyContent: 'center' }}
        >
          LIKE(UPVOTE)
        </div>
        <div
          className={styles["keythemes-table-header-item"]}
          style={{ width: "12%", justifyContent: 'center' }}
        >
          DISLIKE(DOWNVOTE)
        </div>
        {/* {console.log('projectList', projectList)}
        {console.log('projectId', projectId)} */}
        {(projectList.filter(p => p.id.toString() === projectId.toString())[0] || {}).projectAdmin && <div
          className={styles["keythemes-table-header-item"]}
          style={{ width: "12%", justifyContent: 'center' }}
        >
          TAGS
        </div>}
      </div>
      <div className={styles["keythemes-table-content"]}>
        {data.map((d, index) => {
          const voteValue =
            d.myStatus && d.myStatus.length > 0 ? d.myStatus[0].voteValue : "0";
          const id =
            d.myStatus && d.myStatus.length > 0 ? d.myStatus[0].id : null;
          return (
            <React.Fragment key={`keythemes-table-${title}-${index}`}>
              {/* Mobile View start */}
              <div className={styles["keythemes-table-content-mobile"]}>
                <div className={styles["keythemes-table-content-mobile-key"]}>
                  {d.key}
                </div>
                <div
                  className={styles["keythemes-table-content-mobile-percent"]}
                >
                  <PercentBar
                    className={styles["keythemes-table-content-mobile-bar"]}
                    value={totalFreq === 0 ? 0 : (d.freq / totalFreq * 100)}
                  />
                </div>
                <div
                  className={styles["keythemes-table-content-mobile-action"]}
                >
                  <div className={styles["keythemes-table-percent-text"]}>
                    {totalFreq === 0 ? 0 : Math.round(d.freq / totalFreq * 100)}%
                  </div>
                  <div
                    className={styles["keythemes-table-content-mobile-vote"]}
                  >
                    <img
                      src={
                        voteValue == 1
                          ? "/assets/img/report/like_on.png"
                          : "/assets/img/report/like_off.png"
                      }
                      width="16"
                      onClick={(e) => onVote(d.key, 1, id, voteValue)}
                    />
                    <span>{d.upvoteCount}</span>
                  </div>
                  <div
                    className={styles["keythemes-table-content-mobile-vote"]}
                  >
                    <img
                      src={
                        voteValue === -1
                          ? "/assets/img/report/dislike_on.png"
                          : "/assets/img/report/dislike_off.png"
                      }
                      width="16"
                      onClick={(e) => onVote(d.key, -1, id, voteValue)}
                    />
                    <span>{d.downvoteCount}</span>
                  </div>
                  {(projectList.filter(p => p.id.toString() === projectId.toString())[0] || {}).projectAdmin && <div
                    className={styles["keythemes-table-content-mobile-vote"]}
                    onClick={() => setOpen(index)}
                  >
                    <svg style={{marginRight: '10px'}} width={20} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
                      <g>
                        <g>
                          <path d="m121.5,64.2c-31.7,0-57.3,25.7-57.3,57.3 0,31.7 25.7,57.3 57.3,57.3 31.7,0 57.3-25.7 57.3-57.3 0.1-31.7-25.6-57.3-57.3-57.3zm0,94.3c-20.4,0-37-16.6-37-37s16.6-37 37-37c20.4,0 37,16.6 37,37s-16.5,37-37,37z"/>
                          <path d="m244.5,29.8c-10.4-11.5-25-17.7-40.7-17.7l-107.3-1.1c-22.9,0-44.8,8.3-60.5,25-16.7,15.7-25,37.6-25,60.5l1,107.4c1,14.6 6.3,29.2 17.7,40.7l256.5,256.4 214.8-214.8-256.5-256.4zm40.7,442l-241.9-241.9c-7.3-7.3-11.5-16.7-11.5-27.1l-1-106.3c0-16.7 7.3-33.4 18.8-45.9 12.5-12.5 29.2-19.8 46.9-19.8l106.3,1c10.4,0 19.8,4.2 27.1,11.5l241.9,241.9-186.6,186.6z"/>
                        </g>
                      </g>
                    </svg>
                    <span>{(d.tags.filter(tag => (tag.tags || []).length > 0) || []).length}</span>
                  </div>}
                </div>
              </div>
              {/* Mobile View end */}
              <div className={styles["keythemes-table-content-row"]}>
                <div
                  style={{
                    width: "25%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                  className={styles["keythemes-table-content-col"]}
                >
                  <div className={styles["keythemes-table-percent-text"]}>
                    {totalFreq === 0 ? 0 : Math.round(d.freq / totalFreq * 100)}%
                  </div>
                  <PercentBar value={totalFreq === 0 ? 0 : Math.round(d.freq / totalFreq * 100)} />
                </div>
                <div
                  style={{ width: "39%" }}
                  className={styles["keythemes-table-content-col"]}
                >
                  {d.key}
                </div>
                <div
                  style={{ width: "12%", justifyContent: 'center' }}
                  className={styles["keythemes-table-content-col"]}
                >
                  <img
                    src={
                      voteValue == 1
                        ? "/assets/img/report/like_on.png"
                        : "/assets/img/report/like_off.png"
                    }
                    width="16"
                    onClick={(e) => onVote(d.key, 1, id, voteValue)}
                  />
                  <span>{d.upvoteCount}</span>
                </div>
                <div
                  style={{ width: "12%", justifyContent: 'center' }}
                  className={styles["keythemes-table-content-col"]}
                >
                  <img
                    src={
                      voteValue === -1
                        ? "/assets/img/report/dislike_on.png"
                        : "/assets/img/report/dislike_off.png"
                    }
                    width="16"
                    onClick={(e) => onVote(d.key, -1, id, voteValue)}
                  />
                  <span>{d.downvoteCount}</span>
                </div>
                {(projectList.filter(p => p.id.toString() === projectId.toString())[0] || {}).projectAdmin && <div
                  style={{ width: "12%", justifyContent: 'center', position: 'relative', cursor: 'pointer' }}
                  className={styles["keythemes-table-content-col"]}
                  onClick={() => setOpen(index)}
                >
                  <svg style={{marginRight: '12px'}} width={16} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
                    <g>
                      <g>
                        <path d="m121.5,64.2c-31.7,0-57.3,25.7-57.3,57.3 0,31.7 25.7,57.3 57.3,57.3 31.7,0 57.3-25.7 57.3-57.3 0.1-31.7-25.6-57.3-57.3-57.3zm0,94.3c-20.4,0-37-16.6-37-37s16.6-37 37-37c20.4,0 37,16.6 37,37s-16.5,37-37,37z"/>
                        <path d="m244.5,29.8c-10.4-11.5-25-17.7-40.7-17.7l-107.3-1.1c-22.9,0-44.8,8.3-60.5,25-16.7,15.7-25,37.6-25,60.5l1,107.4c1,14.6 6.3,29.2 17.7,40.7l256.5,256.4 214.8-214.8-256.5-256.4zm40.7,442l-241.9-241.9c-7.3-7.3-11.5-16.7-11.5-27.1l-1-106.3c0-16.7 7.3-33.4 18.8-45.9 12.5-12.5 29.2-19.8 46.9-19.8l106.3,1c10.4,0 19.8,4.2 27.1,11.5l241.9,241.9-186.6,186.6z"/>
                      </g>
                    </g>
                  </svg>
                  <span>{(d.tags.filter(tag => (tag.tags || []).length > 0) || []).length}</span>
                </div>}
              </div>
            </React.Fragment>
          );
        })}
        {open >= 0 &&
          <div
            style={{
              position: 'fixed', 
              zIndex: '1000',
              width: '100%', 
              height: '100%', 
              background: 'rgba(0,0,0,0.3)', 
              top: '0', 
              left: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setOpen(-1)}
          >
            <div
              style={{
                background: 'white',
                padding: '20px',
                width: '60%',
                minWidth: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxHeight: '80%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {tags.length > 0 ? 
              <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '15px', overflow: 'hidden'}}>
                <div style={{display: 'flex', gap: '15px'}}>
                  <h5 style={{flex: '1', maxWidth: '140px'}}>Response</h5>
                  <h5 style={{flex: '2'}}>Tags</h5>
                </div>
                <div style={{overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                  {tags.map((tag, idx) => 
                    <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                      <span style={{flex: '1', maxWidth: '140px'}}>{tag.topicName}</span>
                      <span style={{flex: '2'}}>
                        <ReactTags
                          ref={reactTags}
                          tags={(tag.tags || [])}
                          suggestions={suggestions}
                          // suggestionsFilter={(suggestion, query) => {
                          //   console.log(tags)
                          //   return suggestion.name.includes(query) && !tags.filter(tag => tag.name === suggestion.name)
                          // }}
                          onDelete={(tagIndex) => onDelete(tagIndex, idx)}
                          onAddition={(newTag) => onAddition(newTag, idx)}
                          allowNew={true}
                        />  
                      </span>
                    </div>
                  )}
                </div>
              </div> : <h2>No data</h2>}
              {/* <h3 style={{width: '100%', marginBottom: '16px'}}>Response: {data[open].key}</h3>
              <ReactTags
                ref={reactTags}
                tags={tags}
                suggestions={suggestions}
                // suggestionsFilter={(suggestion, query) => {
                //   console.log(tags)
                //   return suggestion.name.includes(query) && !tags.filter(tag => tag.name === suggestion.name)
                // }}
                onDelete={onDelete}
                onAddition={onAddition}
                allowNew={true}
              />   */}
              <div
                style={{
                  width: '100%',
                  marginTop: '10px',
                  paddingTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '20px',
                }}
              >
                <span onClick={() => setOpen(-1)} style={{cursor: 'pointer'}}>Cancel</span>
                <Button className="btn"
                  onClick={() => {
                    setKeyThemeTags(data[open].key, tags, callback)
                  }}>Save</Button>
              </div>
            </div>
          </div>
          }
      </div>
    </div>
  );
};

const mapStateToProps = ({ settings, authUser }) => {
  const { projectList } = settings;
  const { projectId, surveyId } = authUser;

  return {
    projectId,
    projectList,
    surveyId,
  };
};

export default connect(mapStateToProps, {
  setKeyThemeTags,
  getAllTagsBySurvey
})(KeyThemesTable);
