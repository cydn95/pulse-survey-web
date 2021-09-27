import React, { Component } from "react";
import KeyLinesController from "./klControllers/KeyLinesController";

import styles from "./styles.scss";

export default class KGraph extends Component {
  /**
   * @constructor
   * Initiate state and create an instance of KeyLinesContainer
   */
  constructor(props) {
    super(props);
    this.state = { changed: false };
    // console.log('apList', this.props.apList)
    // console.log('esList', this.props.esList)
    // (changes) => { this.props.setParentState(changes);}
    this.keyLinesController = new KeyLinesController(
      (changes) => {
        this.props.setParentState(changes);
      },
      (id) => {
        this.props.onClickNode(id);
      },
      props.apList,
      props.esList
    );
  }

  /**
   * Create KeyLines chart once data and DOM is ready
   */
  async componentDidMount() {
    this.keyLinesController.createChart(
      this.chartContainer,
      this.props.viewMode
    );
  }

  async componentWillReceiveProps(props) {
    await this.keyLinesController.updatedNode(props.apList, props.esList, props.categoryChanged, props.viewMode)
  }

  /**
   * Update chart according to changes in props/state
   */
  async componentDidUpdate(prevProps) {
    let { newStakeholder, layout, viewMode, layoutUpdated } = this.props;

    if (Object.keys(newStakeholder).length > 0 && newStakeholder != prevProps.newStakeholder) {
      await this.keyLinesController.endDrag(newStakeholder);
    }

    if (layoutUpdated) {
      layout = layout === "standard" ? "organic" : layout;
      await this.keyLinesController.runLayout(layout);
    }

    if (viewMode !== prevProps.viewMode) {
      await this.keyLinesController.updateVisualisationMode(viewMode);
    }
  }

  render() {
    return (
      <div className={styles["kl-wrapper"]}>
        <div className={styles["chart-wrapper"]}>
          <div
            ref={(el) => (this.chartContainer = el)}
            className={styles["kl-chart-container"]}
            id="kl"
          ></div>
        </div>
      </div>
    );
  }
}
