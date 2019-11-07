import React from "react";

import '@fortawesome/fontawesome-free/css/fontawesome.css';
// import '@fortawesome/fontawesome-free/css/solid.css';

import { Chart, FontLoader } from 'regraph';
import { neighbors } from 'regraph/analysis';

let nodeIdCounter = 0;
let targetId = null;
let originId = null;

class KGraph extends React.Component {

  constructor(props) {
    super(props);

    const { chart } = props;

    this.state = {
      style: {
        flex: 1, 
        width: '100%',
        height: '100%'
      },
      items: chart,
      options: {
        iconFontFamily: 'Font Awesome 5 Free'
      },
      layout: {
          name: 'organic'
      },
      positions: {},
      selection: {},
      animation: {
          animate: false
      },
      openCombos: {},
    }
  }

  createLink = async (nodeId, newLinkId, positions) => {
      let { items } = this.state;
      // find out if the selected node already has links that need to be
      // retargeted
      const existingLinks = await neighbors(items, nodeId);
      // create the new dummy node based on the one that is being dragged
      let newDummyNodeId = `node${nodeIdCounter}`;
      const newLinkStyle = {
          [newLinkId]: {
              id1: nodeId,
              id2: newDummyNodeId,
              end1: {
                  arrow: true
              },
              color: 'rgb(255, 127, 127)',
              width: 5
          }
      };
      // copy the node attributes to the dummy and update the node to be moved
      const newDummyNode = {
          [newDummyNodeId]: {
              ...items[nodeId],
              size: 1,
          },
          [nodeId]: {
              ...items[nodeId],
              label: {
                  text: 'New Node'
              },
              fontIcon: {},
              color: 'rgb(255, 127, 127)',
              size: 0.3
          }
      }
      // set the originId global variable
      originId = newDummyNodeId;
      let newItems = { ...items };
      // retarget the neighbouring links
      Object.keys(existingLinks).forEach(id => {
          if (existingLinks[id].id1) {
              delete newItems[id];
              const link = existingLinks[id];
              link[link.id1 === nodeId ? 'id1' : 'id2'] = newDummyNodeId
              newItems[`link_${Math.random()}`] = link;
          }
      })
      // set the positions of the dummy node
      let newNodePositions = {
        [newDummyNodeId]: {
            x: positions[nodeId].x,
            y: positions[nodeId].y
        },
        [nodeId]: {
          x: positions[nodeId].x + 24,
          y: positions[nodeId].y - 15
        }
      }
      this.setState({ items: { ...newItems, ...newDummyNode, ...newLinkStyle }, positions: { ...positions, ...newNodePositions }, selection: { ...newDummyNode } });
  }

  startLinkCreation = async (type, id, x, y, sub) => {
    
    if (type === 'move' && this.dragging === false) {
        const linkId = `${id}-node${++nodeIdCounter}`;
        await this.createLink(id, linkId, this.state.positions);
        // return true in this case to prevent default behaviour
        return true;
    }
    // otherwise just drag the node...
    return false;
  }

  handleChange = (changes) => {
      this.setState({
          positions: changes.positions || this.state.positions,
          selection: changes.selection || this.state.selection
      })
  }

  componentWillReceiveProps(props) {
    const { chart } = props;
    
    this.setState({
      items: chart
    });
  }

  combineNodesHandler = ({ id, nodes, combo }) => {
    console.log(combo);
    const { openCombos } = this.state;
    return {
      open: !!openCombos[id],
      label: { text: "Team " + combo.group },
    };
  };

  doubleClickHandler = id => {
    /*
      Toggle the value on the openCombos object,
      this value is used to set the open state of the combo node.

      Also create a new 'combine' object. This forces ReGraph to
      do a re-render. Once that happens, the 'onCombineNodes' function
      is called and we can set the open value of the combo node.
    */
    const { openCombos, combine } = this.state;
    this.setState({
      openCombos: { ...openCombos, [id]: !openCombos[id] },
      combine: { ...combine },
    });
  };


  dragComplete = (type, id, x, y) => {

    if (this.dragging === true) {
      this.dragging = false;
      return true;
    }

    let { items } = this.state;
    if (type === 'move') {
        let newItems = { ...items };
        Object.keys(newItems).forEach(itemId => {
            const newItem = newItems[itemId];
            if ([itemId, newItem.id1, newItem.id2].includes(id)) {
                if (newItem.id1) {
                    let newLinkId = `${originId}-${targetId}`
                    newItems[newLinkId] = {
                        ...newItem,
                        id1: targetId
                    }
                    delete newItems[itemId];
                } else {
                    delete newItems[itemId];
                }
            }
        })
        targetId = null;
        originId = null;
        this.setState({ items: newItems });
    }
  }

  checkGlyphDown = (id, x, y, b, sub) => {
    
    if (sub !== null && sub !== 't') {
      console.log("plus");
      this.dragging = false;
    } else {
      this.dragging = true;
    }
  }

  setTarget = (id, x, y) => {
    if (id) {
        targetId = id;
    }
  }

  render() {
    const { items, layout, options, positions, selection, animation } = this.state;

    return (
      <div className="div-regraph">
        <FontLoader config={{ custom: { families: ['Font Awesome 5 Free'] } }}>
        <Chart
          style={this.state.style}
          options={options}
          {...{ animation, items, positions, selection, layout }}
          combine={{
            properties: ['group'],
            level: 1,
          }}
          onChartDragComplete={this.dragComplete}
          onChartChange={this.handleChange}
          onChartDragOver={this.setTarget}
          onChartDragStart={this.startLinkCreation}
          onChartMouseDown={this.checkGlyphDown}
          onChartDoubleClick={this.doubleClickHandler}
          onCombineNodes={this.combineNodesHandler} />
        </FontLoader>
      </div>
    )
  }
}

export default KGraph;