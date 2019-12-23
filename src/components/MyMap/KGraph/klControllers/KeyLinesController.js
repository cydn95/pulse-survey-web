import WebFont from 'webfontloader';
import 'keylines';
import DataStore from '../DataStore';
import { nodeMoveStarted, nodeOverElement, combineByDrag, resetVariables, setValidDrag } from './DragDropFunctionality';
const fontsLoaded = new Promise(resolve => {
    WebFont.load({
        custom: {
            families: ['Font Awesome 5 Free'],
            urls: [
                'https://use.fontawesome.com/releases/v5.8.1/css/fontawesome.css',
                'https://use.fontawesome.com/releases/v5.8.1/css/solid.css'
            ]
        },
        active: resolve,
        inactive: resolve,
        timeout: 3000
    });
});


const KeyLines = window.KeyLines;

// Configure KeyLines to use JavaScript Promise object for async functions (instead of callbacks)
KeyLines.promisify();



class BaseController {

    constructor(setState) {

        // for access through console
        let chart;
        let draggableArea;
        let container;
        // used for item creation
        let nodeIdCounter;
        let dragIcon;
        // let clone;
        let dragStartCoords;
        let mode;
        let idBeingDragged;
        let currentTargetCombo;
        let createComboWithId;
        let dragStartX;
        let dragStartY;
        let validDrag;
        let propsToReset;
        let isCombining;
        let overElem;
        let highLevelNodes;
        this.dataStore = new DataStore();
        window.keyLinesController = this;
        this.setContainerState = setState;
    }


    addPlusIcon = (id) => {
        this.overElem = id;
    }

    enableLayoutOptions = () => {
        let enable = this.chart.selection().length > 0;
        this.setContainerState({
            enableLayout: enable,
            layoutUpdated: false
        });
    }


    createNode = (node, mouseViewCoords) => {
        // mouseViewCoords gives the position of the
        // mouseup event, relative to the top-left corner of the
        // this.chart container.
        const x = (mouseViewCoords.x);
        const y = (mouseViewCoords.y);
        const pos = this.chart.worldCoordinates(x, y);
        let id = node.id;
        // create the node
        this.chart.setItem({
            type: 'node',
            id,
            c: node.color,
            x: pos.x,
            y: pos.y,
            fi: {
                t: KeyLines.getFontIcon(node.icon),
                c: node.iconColor
            },
            t: node.name,
        }).then(() => {
            // if (this.overElem) {

            //     nodeMoveStarted.bind(this)('move', id, x, y);
            //     nodeOverElement.bind(this)(null, this.overElem);
            //     combineByDrag.bind(this)('move', id);
            //     setValidDrag.bind(this)('move', id, x, y);
            //     resetVariables.bind(this)(id);
            // }
        })

    }

    endDrag = (data) => {
        // check whether we have dropped the element within the this.chart area
        const klRect = this.container.getBoundingClientRect();
        let { viewCoordinates, ...node } = data;
        const mouseViewCoords = {
            x: viewCoordinates.clientX - klRect.left,
            y: viewCoordinates.clientY - klRect.top,
        };
        const withinChartX = mouseViewCoords.x >= 0 && mouseViewCoords.x <= klRect.width;
        const withinChartY = mouseViewCoords.y >= 0 && mouseViewCoords.y <= klRect.height;
        const mouseIsOverChart = withinChartX && withinChartY;
        if (mouseIsOverChart) {
            this.createNode(node, mouseViewCoords);
        }
        this.chart.selection([]);
    }

    handleHover = (id) => {
        this.addPlusIcon(id);
    }

    handleMouseDown = (id, x, y, btn, sub) => {
        resetVariables.bind(this)(id);
    }

    handleDragStart = (type, id, x, y) => {
        return nodeMoveStarted.bind(this)(type, id, x, y);
    }

    handleDragOver = (id, x, y, sub) => {
        nodeOverElement.bind(this)(id);
    }

    handleDragEnd = (type, id, x, y) => {
        setValidDrag.bind(this)(type, id, x, y);
    }

    handleDragComplete = (type, id) => {
        combineByDrag.bind(this)(type, id);
    }

    handleSelectionChange = () => {
        this.enableLayoutOptions();
    }

    setupUI() {
        this.container = document.getElementById('kl');
        this.chart.bind('hover', this.handleHover);
        this.chart.bind('mousedown,touchdown', this.handleMouseDown);
        this.chart.bind('selectionchange', this.handleSelectionChange);
        // combo drag events
        this.chart.bind('dragstart', this.handleDragStart);
        this.chart.bind('dragover', this.handleDragOver);
        this.chart.bind('dragend', this.handleDragEnd);
        this.chart.bind('dragcomplete', this.handleDragComplete);
    }

    setMode() {
        this.mode = {
            arrange: false,
            transfer: true,
        };

        // update selected open combos
        const updateRe = this.chart.selection().filter(id => this.chart.combo().isOpen(id)).map(id => ({
            id,
            oc: {
                re: this.mode.arrange,
            },
        }));
        this.chart.setProperties(updateRe);
    }



    constructDonuts = () => {
        let props = [];
        this.chart.each({ type: 'node', items: 'underlying' }, (item) => {
            // console.log(item.d);
            if (item.d.survey_completion) {
                let percentage = item.d.survey_completion;
                let segment = Math.abs(percentage - 50) * 2;
                let segmentColor = percentage <= 50 ? 'red' : 'green';
                props.push({
                    id: item.id,
                    donut: {
                        v: [segment, 100 - segment],
                        c: [segmentColor, 'white'],
                        b: "#3b4f81"
                    }

                })
            }
        })
        this.chart.setProperties(props)
    }

    /**
     * Create chart and load data
     * @param {String|HTMLDivElement} chartContainer Container div element or id for KeyLines chart
     */
    async createChart(chartContainer, defaultView) {
        await fontsLoaded;
        const imageAlignment = {
            [KeyLines.getFontIcon('fa-project-diagram')]: { e: 0.85 },
            [KeyLines.getFontIcon('fa-sitemap')]: { e: 0.85 },
        };
        const chartOptions = {
            drag: {
                links: false,
            },
            hover: 5,
            iconFontFamily: 'Font Awesome 5 Free',
            defaultStyles: {
                comboGlyph: null,
            },
            imageAlignment
        };
        let data = await this.dataStore.getEntityNetwork();
        this.chart = await KeyLines.create([{ container: chartContainer, options: chartOptions, type: 'chart' }]);
        this.chart.load({ type: 'LinkChart', items: data });
        // add donuts in the underlying nodes
        this.constructDonuts();
        this.chart.zoom('fit');
        this.runLayout();
        window.chart = this.chart;
        this.validDrag = true;
        this.propsToReset = [];
        this.isCombining = false;
        this.dragIcon = '';
        this.highLevelNodes = {};
        this.setMode();
        this.setupUI();
    }

    /**
     * Positions nodes on the chart according to the given layout
     * @param {String} layoutName One of the KeyLines chart layouts
     */
    async runLayout(layoutName = "organic") {
        let options = {
            tightness: 3,
            top: ['radial', 'sequential'].includes(layoutName) ? this.chart.selection() : []
        }
        this.chart.layout(layoutName, options);
    }


    async updateVisualisationMode(visMode) {
        let toUncombine = [];

        this.chart.each({ type: 'node', items: 'all' }, (node) => {
            if (this.chart.combo().isCombo(node.id)) {
                this.highLevelNodes[node.id] = this.highLevelNodes[node.id] || { ...node.d };
                toUncombine.push(node.id)
            }
        });
        await this.chart.filter(() => true, { type: 'node', items: 'underlying', animate: false });
        await this.chart.combo().uncombine(toUncombine, { full: true, select: false, animate: true });


        const combineByProperty = async (property, level) => {
            let count = {};
            let newCombos = {};
            let data = {};
            let comboDefs = [];
            this.chart.each({ type: 'node', items: level }, (node) => {
                if (node.d[property]) {
                    let propertyId = node.d[property].current;
                    newCombos[propertyId] = newCombos[propertyId] || [];
                    newCombos[propertyId].push(node.id);
                    count[propertyId] = count[propertyId] || 0;
                    if (node.d.icon || node.d.name) {
                        count[propertyId] += 1;
                    }
                    if (!data[propertyId]) {
                        // store the d property for future reference
                        data[propertyId] = { ...node.d };
                    }
                }
            });

            Object.keys(newCombos).forEach(id => {
                let style = {
                    fi: {
                        t: KeyLines.getFontIcon(this.highLevelNodes[id].icon),
                        c: this.highLevelNodes[id].iconColor || "#414b57"
                    },
                    c: this.highLevelNodes[id].color || "#d8d8d8",
                    b: this.highLevelNodes[id].border || "#3b4f81",
                    bw: 1,
                    d: { ...data[id] },
                    g: count[id] === 0 ? []
                        : [{
                            b: "#4a5c89",
                            c: "#4966ac",
                            e: 1.2,
                            fc: "#f3f5f9",
                            ff: "sans-serif",
                            p: 45,
                            r: 35,
                            t: count[id],
                            w: true
                        }],
                    donuts: {}
                }
                comboDefs.push({ ids: newCombos[id], style, label: this.highLevelNodes[id].name });
            });
            await this.chart.combo().combine(comboDefs, { select: false });
        }

        if (visMode.length === 0) {
            //remove the fakeNode
            await this.chart.filter((node) => { return node.d.name || node.d.icon }, { type: 'node', items: 'underlying', animate: false });
        } else if (visMode.length === 1) {
            if (visMode[0] === 'Org') {
                // group by organisation
                await combineByProperty('organisation', 'underlying');
            } else {
                // group by team
                await combineByProperty('team', 'underlying');
            }

        } else {
            // group by both organisation and team
            await combineByProperty('team', 'underlying');
            await combineByProperty('organisation', 'toplevel');
        }
        await this.runLayout();
    }
}

/**
 * Helper function to normalize all values in an object between a given range
 * @param {Object} scores Object with key-value pairs where values need to be normalized
 * @param {Number} minOut Minimum normalized output value
 * @param {Number} maxOut Maximum normalized output value
 */
function normalize(scores, minOut = 1, maxOut = 5) {
    const values = Object.values(scores);
    const minIn = Math.min(...values);
    const maxIn = Math.max(...values);
    const normalizeValue = (() => {
        if (minIn === maxIn || maxIn === maxOut) {
            return () => minOut;
        }
        const scale = (maxOut - minOut) / (maxIn - minIn);
        return val => (val - minIn) * scale + minOut;
    })();

    const normalized = {};
    Object.keys(scores).forEach(key => normalized[key] = normalizeValue(scores[key]));
    return normalized;
}


export default class KeyLinesController extends BaseController { };