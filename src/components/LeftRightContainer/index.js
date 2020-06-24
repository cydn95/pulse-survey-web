import React from "react";

import styles from "./styles.scss";

function LeftRightContainer(props) {
  const { children } = props;

  return (
    <div className={styles.main}>
      <div className="login-container__left">
        <div className="login-container__left__logo">
          <img
            className="login-container__left__logo--img"
            src="/assets/img/login/collective-insight.png"
            alt="collective-insight"
          />
          <h1 className="login-container__left__logo--title">
            Collective Insight
          </h1>
          <p className="login-container__left__logo--description">
            Pulse by ProjectAI helps project managers make
            <br />
            sense of people’s collective insights for better project outcomes.
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <div className="login-container__right--login-panel">{children}</div>
      </div>
    </div>
  );
}

export default LeftRightContainer;
