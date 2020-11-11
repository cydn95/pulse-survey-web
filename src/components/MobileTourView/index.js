import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";

import SlideNavigator from "Components/SlideNavigator";
import { createMarkup } from "Util/Utils";

import styles from "./styles.scss";
import classnames from "classnames";

const MobileTourView = ({ tour, length, index, onBack, onNext, onSelect }) => {
  const imgBackgroundStyle = {
    background: `url('${tour.img}') center/contain no-repeat`,
  };
  return (
    <div className={classnames(styles.root)}>
      <div className={styles.header}>
        {index > 0 && (
          <FontAwesomeIcon
            className={styles.back}
            icon={faChevronLeft}
            onClick={(e) => onBack(e)}
          />
        )}
      </div>
      <div className={styles.body}>
        <div
          className={styles["img-container"]}
          style={imgBackgroundStyle}
        ></div>
        <h1>{tour.title}</h1>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={createMarkup(tour.content)}
        />
      </div>
      <div className={styles.footer}>
        <Button
          type="button"
          className={styles.next}
          onClick={(e) => onNext(e)}
        >
          NEXT
        </Button>
        <div className={styles.space}></div>
        <SlideNavigator
          onSelect={(position) => onSelect(position)}
          cnt={length}
          position={index}
        />
      </div>
    </div>
  );
};

export default MobileTourView;
