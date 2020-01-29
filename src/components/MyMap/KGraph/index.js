import React, { Component } from 'react';
import KeyLinesController from './klControllers/KeyLinesController';

export default class KGraph extends Component {

    /**
     * @constructor
     * Initiate state and create an instance of KeyLinesContainer
     */
    constructor(props) {
        super(props);
        // console.log('************************');
        // console.log(props);
        // console.log('************************');
        this.state = {};
        // (changes) => { this.props.setParentState(changes);}
        this.keyLinesController = new KeyLinesController(
            (changes) => { this.props.setParentState(changes);},
            (id) => { this.props.onClickNode(id) },
            props.apList,
            props.esList
        );
    }

    /**
     * Create KeyLines chart once data and DOM is ready
     */
    async componentDidMount() {
        this.keyLinesController.createChart(this.chartContainer, this.props.viewMode);
    }

    /**
     * Update chart according to changes in props/state
     */
    async componentDidUpdate(prevProps) {
        let {
            newStakeholder,
            layout,
            viewMode,
            layoutUpdated
        } = this.props;

        if (Object.keys(newStakeholder).length > 0) {
            await this.keyLinesController.endDrag(newStakeholder);
        }

        if (layoutUpdated) {
            layout = layout === 'standard' ? 'organic' : layout;
            await this.keyLinesController.runLayout(layout);
        }

        if (viewMode !== prevProps.viewMode) {
            await this.keyLinesController.updateVisualisationMode(viewMode);
        }
    }


    render() {
        return (
            <div className="kl-wrapper">
                <div className="chart-wrapper demo-cols">
                    <div ref={el => this.chartContainer = el} className="kl-chart-container" id='kl'>
                    </div>
                </div>
            </div>
        );
    }
}
