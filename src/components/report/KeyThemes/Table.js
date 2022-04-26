import React, {useState, useRef, useCallback} from "react";
import { connect } from "react-redux";
import ReactTags from 'react-tag-autocomplete';

import classnames from "classnames";
import styles from "./styles_table.scss";

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

const KeyThemesTable = ({ title = "", data = [], onVote, className, projectId, projectList }) => {
  const total = data.reduce((a, b) => ({ freq: a.freq + b.freq }));
  const totalFreq = total ? total.freq : 0;
  const [open, setOpen] = useState(-1)
  const [tags, setTags] = useState([])
  const [suggestions, setSuggestions] = useState([
    { id: 1, name: "Apples" },
    { id: 2, name: "Pears" },
    { id: 3, name: "Bananas" },
    { id: 4, name: "Mangos" },
    { id: 5, name: "Lemons" },
    { id: 6, name: "Apricots" }
  ])
  const reactTags = useRef()

  const onDelete = useCallback((tagIndex) => {
    setTags(tags.filter((_, i) => i !== tagIndex))
  }, [tags])

  const onAddition = useCallback((newTag) => {
    setTags([...tags, newTag])
  }, [tags])

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
        {projectList.filter(p => p.id.toString() === projectId)[0].projectAdmin && <div
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
                {projectList.filter(p => p.id.toString() === projectId)[0].projectAdmin && <div
                  style={{ width: "12%", justifyContent: 'center', position: 'relative', zIndex: '2' }}
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
                  <span>{d.downvoteCount}</span>
                </div>}
              </div>
            </React.Fragment>
          );
        })}
        {open >= 0 &&
          <div
            style={{
              position: 'absolute', 
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
                width: '80%',
                maxWidth: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ReactTags
                ref={reactTags}
                tags={tags}
                suggestions={suggestions}
                // suggestionsFilter={(suggestion, query) => {
                //   console.log(tags)
                //   return suggestion.name.includes(query) && !(tags.length > 0 && tags.filter(tag => tag.name === suggestion.name))
                // }}
                suggestionComponent={({ item, query }) =>
                  <span id={item.id} className={item.name === query ? 'match' : 'no-match'} onClick={() => onAddition(item)}>
                    {item.name}
                  </span>}
                onDelete={onDelete}
                onAddition={onAddition}
                allowNew={true}
              />  
            </div>
          </div>
          }
      </div>
    </div>
  );
};

const mapStateToProps = ({ settings, authUser }) => {
  const { projectList } = settings;
  const { projectId } = authUser;

  return {
    projectId,
    projectList,
  };
};

export default connect(mapStateToProps, null)(KeyThemesTable);
