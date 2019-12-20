function isCombo(id) {
    return this.chart.combo().isCombo(id);
}

function getComboNodeItem(id) {
    const item = this.chart.getItem(id);
    if (item && item.type === 'node') {
        if (isCombo.bind(this)(id)) {
            return item;
        }
        const comboId = item.parentId;
        if (comboId) {
            return this.chart.getItem(comboId);
        }
    }
    return null;
}

function resetDragVariables() {
    this.currentTargetCombo = null;
    this.createComboWithId = null;
    this.dragStartX = null;
    this.dragStartY = null;
    this.validDrag = true;
    this.propsToReset = [];
}

export function resetVariables(id) {
    resetDragVariables.bind(this)();

    if (isCombo.bind(this)(id)) {
        this.chart.setProperties({
            id,
            oc: {
                re: this.mode.arrange,
            },
        });
    }
}

function styleOverCombo(props) {
    const oc = this.currentTargetCombo.oc;
    this.propsToReset.push({
        id: this.currentTargetCombo.id,
        oc: {
            b: oc.b
        },
    });
    props.push({
        id: this.currentTargetCombo.id,
        oc: {
            b: oc.b
        },
    });
}

function styleInvalidTransfer(props) {
    this.propsToReset.push({
        id: this.idBeingDragged,
        bg: false,
    });
    props.push({
        id: this.idBeingDragged,
        bg: true,
    });
}

function addGlyphToNode(props) {
    this.propsToReset.push({
        id: this.createComboWithId,
        g: [],
    });
    props.push({
        id: this.createComboWithId
    });
}

async function makeNewCombo(idsToCombine) {
    const style = {
        c: 'red',
        e: 1.4
    };
    const openStyle = {
        bw: 2
    };
    const [combo] = await this.chart.combo().combine({
        ids: idsToCombine,
        open: true,
        style,
        openStyle,
        label: '',
    }, {
        arrange: this.mode.arrange ? 'none' : 'lens',
    });
    return combo;
}

// get an array of all the nested combos that contain a given node (starting at innermost)
function orderedParentCombos(nodeId) {
    const ancestors = [];
    let ancestor = this.chart.getItem(nodeId).parentId;
    while (ancestor) {
        ancestors.push(ancestor);
        ancestor = this.chart.getItem(ancestor).parentId;
    }
    return ancestors;
}

// check whether a combo contains some node (at any nested level within)
function contains(comboId, nodeId) {
    if (nodeId === null) return false;
    return orderedParentCombos.bind(this)(nodeId).includes(comboId);
}

function containsAll(comboId, nodeIds) {
    return nodeIds.every(nodeId => contains.bind(this)(comboId, nodeId));
}

// check whether an array of node ids includes
// the id of any combo which contains the given child node
function includesContainingCombo(nodeIds, childNodeId) {
    return nodeIds.some((nodeId) => {
        return contains.bind(this)(nodeId, childNodeId)
    });
}

// find the innermost combo that contains all of the given nodes
function innermostContainingCombo(nodeIds) {
    const ancestors = orderedParentCombos.bind(this)(nodeIds[0]);
    for (let i = 0; i < ancestors.length; i++) {
        if (containsAll.bind(this)(ancestors[i], nodeIds)) {
            return this.chart.getItem(ancestors[i]);
        }
    }
    return null;
}

export function nodeOverElement(id, sub) {
    let currentComboId = sub || id;
    this.currentTargetCombo = getComboNodeItem.bind(this)(currentComboId);
    this.createComboWithId = null;
    this.validDrag = false;
    if(this.chart.getItem(currentComboId).d.undraggable){
        return false;
    } else{
        if (currentComboId && !this.chart.getItem(currentComboId)) {
            // we're over a chart control, so just set valid drag to true and return
            this.validDrag = true;
        } else if (currentComboId === null) {
            // We've just left a node, so the drag is valid now
            this.validDrag = true;
            this.chart.setProperties(this.propsToReset);
        } else {
            this.chart.setProperties(this.propsToReset);
            const props = [];
            if (this.mode.transfer) {
                if (currentComboId && !isCombo.bind(this)(currentComboId) && (this.currentTargetCombo === null || this.currentTargetCombo !== currentComboId)) {
                    // We're over a node, meaning that if the drag ends here we can create a combo
                    this.createComboWithId = currentComboId;
                    addGlyphToNode.bind(this)(props);
                } else if (this.currentTargetCombo !== null) {
                    // we're over a combo we're allowed to move to
                    styleOverCombo.bind(this)(props);
                }
                this.validDrag = true;
            } else if (this.mode.arrange) {
                if (this.currentTargetCombo && this.chart.getItem(this.idBeingDragged).parentId === this.currentTargetCombo.id) {
                    // the dragged item is over a combo it's already in - it is allowed to be moved within its
                    // own combo
                    styleOverCombo.bind(this)(props);
                    this.validDrag = true;
                } else {
                    styleInvalidTransfer.bind(this)(props);
                }
            } else {
                // neither transferring nor arranging so normal drags
                this.validDrag = true;
            }
            this.chart.setProperties(props);
        }
    }
    
}

export function nodeMoveStarted(type, id, x, y) {
    if (this.isCombining) {
        return true;
    }
    if (type === 'move' && id) {
        this.dragStartX = x;
        this.dragStartY = y;

        if (this.chart.getItem(id)) {
            this.idBeingDragged = id;
            let currentSelection = this.chart.selection().length > 0 ? this.chart.selection() : [id];
            this.currentTargetCombo = innermostContainingCombo.bind(this)(currentSelection);
            if (this.currentTargetCombo) {
                nodeOverElement.bind(this)(this.currentTargetCombo.id);
            }
        }
        if (this.mode.arrange || this.mode.transfer) {
            // Allow combo contents to be dragged separately from the top level combo
            return { combos: false };
        }
    }
    return false;
}

export function setValidDrag(type, id, x, y) {
    if (type === 'move') {
        if (this.dragStartX === x && this.dragStartY === y) {
            // there's been no movement so cancel the drag
            this.validDrag = false;
            return true;
        }
        if (!this.validDrag) {
            return true;
        }
    }
    return false;
}

function topLevelNodes(nodeIds) {
    return nodeIds.filter(nodeId => !includesContainingCombo.bind(this)(nodeIds, nodeId));
}

export async function combineByDrag(type, id) {
    this.chart.setProperties(this.propsToReset);
    if (type === 'move' && this.validDrag) {
        const idToTransferInto = this.currentTargetCombo ? this.currentTargetCombo.id : null;
        if (this.mode.transfer && this.idBeingDragged) {
            const transferOptions = {};
            transferOptions.arrange = this.mode.arrange ? 'none' : 'lens';
            transferOptions.resize = !this.mode.arrange;
            if (this.createComboWithId) {
                // create a combo
                const idsToCombine = this.chart.selection().length > 0 ? this.chart.selection() : [id];
                idsToCombine.push(this.createComboWithId);
                this.isCombining = true;
                // Move everything from that combo and create a new one
                await this.chart.combo().transfer(idsToCombine, null, transferOptions);
                const newCombo = await makeNewCombo.bind(this)(idsToCombine);
                if (idToTransferInto && isCombo.bind(this)(idToTransferInto)) {
                    await this.chart.combo().transfer(newCombo, idToTransferInto, transferOptions);
                }
            } else {
                // exclude nodes from being transferred
                // if a combo that contains them is being transferred
                let currentNodeSelection = this.chart.selection().length > 0 ? this.chart.selection() : [id];
                const nodesToTransfer = topLevelNodes.bind(this)(currentNodeSelection);
                const transferringIntoSelf = nodesToTransfer.some(
                    (nodeId) => {
                        return nodeId === idToTransferInto || contains.bind(this)(nodeId, idToTransferInto)
                    });
                // check that we are not trying to transfer any node into itself or a child of itself
                if (!transferringIntoSelf) {
                    this.isCombining = true;
                    await this.chart.combo().open(idToTransferInto);
                    this.chart.combo().transfer(nodesToTransfer, idToTransferInto, transferOptions);
                }
            }
            this.isCombining = false;
        }
    }
}
