import WebFont from "webfontloader";
import "keylines";
import DataStore from "../DataStore";
const fontsLoaded = new Promise((resolve) => {
  WebFont.load({
    custom: {
      families: ["Font Awesome 5 Free"],
      urls: [
        "https://use.fontawesome.com/releases/v5.8.1/css/fontawesome.css",
        "https://use.fontawesome.com/releases/v5.8.1/css/solid.css",
      ],
    },
    active: resolve,
    inactive: resolve,
    timeout: 3000,
  });
});

const KeyLines = window.KeyLines;

// Configure KeyLines to use JavaScript Promise object for async functions (instead of callbacks)
KeyLines.promisify();

class BaseController {
  constructor(setState, clickNodeListener, apList, esList) {
    // for access through console
    let chart;
    let container;
    let overElem;
    let highLevelNodes;
    let viewMode;
    let layoutName;
    let comboMap;
    this.dataStore = new DataStore(apList, esList);
    window.keyLinesController = this;
    this.setContainerState = setState;
    this.clickNodeListener = clickNodeListener;
  }

  enableLayoutOptions = () => {
    let enable = this.chart.selection().length > 0;
    this.setContainerState({
      enableLayout: enable,
      layoutUpdated: false,
    });
  };

  constructNode = (node) => {
    return {
      id: node.id,
      type: "node",
      c: "#ffffffff",
      b: false,
      bw: 0,
      t: node.name || "",
      fi: node.icon
        ? {
            t: KeyLines.getFontIcon(node.icon),
            c: node.iconColor || "#414b57",
          }
        : {},
      parentId: node.parentId || "",
      e: !node.icon && !node.name ? 0.1 : node.e || 1,
      d: {
        ...node,
      },
    };
  };

  constructDonuts = async (data) => {
    let props = [];
    // create the donuts
    this.chart.each({ type: "node", items: "underlying" }, (item) => {
      if (item.d.survey_completion) {
        let percentage = Math.abs(parseFloat(item.d.survey_completion).toFixed(2));
        console.log(percentage);
        // let segment = Math.abs(percentage - 50) * 2;
        let segmentColor = percentage <= 50 ? "#ff5500" : "#1f45b8";
        props.push({
          id: item.id,
          donut: {
            v: [percentage, 100 - percentage],
            c: [segmentColor, "#c0c0c0"],
            b: "#3b4f81",
            w: 5,
            bw: 0,
          },
        });
      }
    });
    await this.chart.setProperties(props);
  };

  recalculateGlyphs = async (baseId, newItems, action = "add") => {
    // if a new element has been added
    let selectedSH = this.chart.getItem(baseId);
    let propsToUpdate = [];
    if (action === "add") {
      // increate the value of the glyph of the baseId node
      let currentGlyph = selectedSH.g;
      if (currentGlyph) {
        propsToUpdate.push({
          id: baseId,
          g: [{ ...currentGlyph[0], t: parseInt(currentGlyph[0].t, 10) + 1 }],
        });
      } else {
        propsToUpdate.push({
          id: baseId,
          g: [
            {
              b: "#00000000",
              c: "#1d1d1d",
              e: 1.1,
              fc: "#f3f5f9",
              ff: "sans-serif",
              p: 45,
              r: 25,
              t: 1,
              w: true,
            },
          ],
          d: {
            ...selectedSH.d,
            individualCount: 1,
            expanded: true,
          },
        });
      }
      await this.chart.animateProperties(propsToUpdate);
    }
    // if the chart has expanded or
    if (selectedSH.d.expanded) {
      newItems.forEach((item) => {
        if (this.chart.combo().isCombo(item.id)) {
          let currentComboGlyph = this.chart.getItem(item.id).g;
          item.g[0].t =
            parseInt(currentComboGlyph[0].t, 10) + parseInt(item.g[0].t, 10);
        }
      });
    }
  };

  createNode = async (node, mouseViewCoords) => {
    // mouseViewCoords gives the position of the
    const x = mouseViewCoords.x;
    const y = mouseViewCoords.y;
    const pos = this.chart.worldCoordinates(x, y);
    // find the element on top of which it has landed
    this.chart.each({ type: "node", items: "all" }, (item) => {
      if (
        item.x <= pos.x + 15 &&
        item.x > pos.x - 15 &&
        item.y <= pos.y + 15 &&
        item.y > pos.y - 15 &&
        !item.hi
      ) {
        this.overElem = item.id;
      }
    });
    // create the node
    if (this.overElem) {
      // the element should be created if it is over an sh category
      // or its current organisation
      let currentOverElement = this.chart.getItem(this.overElem);
      let itemExists = this.chart.getItem(node.individuals[0].id);
      let animate = true;
      // check if there are already elements with that id in the vis and that you are over an sh category
      if (currentOverElement.d.coreEntity && !itemExists) {
        // if the sh category has not been expanded yet, expand it before adding the element
        if (
          currentOverElement.d.individualCount > 0 &&
          !currentOverElement.d.expanded
        ) {
          await this.expandChart(currentOverElement.id);
          animate = false;
        } // if the sh category is shrunk, show it before adding
        else if (
          currentOverElement.d.individualCount > 0 &&
          currentOverElement.d.shrunk
        ) {
          await this.toggleChart(currentOverElement.id);
          animate = false;
        }

        node.individuals[0].sh_category = {
          current: currentOverElement.id,
          changeable: false,
        };

        let { newItems, highLevelNodes } = await this.dataStore.structurizeData(
          node,
          "ap1",
          "entities",
          this.viewMode
        );
        this.highLevelNodes = { ...this.highLevelNodes, ...highLevelNodes };
        // adjust the parentIds of the newly addded elements
        if (Object.keys(this.comboMap).length > 0) {
          newItems.forEach((item, index) => {
            if (!item.hi) {
              // check if it is an underlying node or a combo
              if (this.comboMap[item.id]) {
                item.id = this.comboMap[item.id];
              }
              if (this.comboMap[item.parentId]) {
                item.parentId = this.comboMap[item.parentId];
              }
            }
          });
        }
        const newItemsExisting = this.chart.getItem(
          newItems.map(({ id }) => id)
        );
        newItems.forEach((item, i) => {
          if (newItemsExisting[i]) {
            if (item.parentId !== newItemsExisting[i].parentId) {
              item.parentId = newItemsExisting[i].parentId;
            }
          }
        });
        // ammend the glyph count of the existing elements
        await this.recalculateGlyphs(this.overElem, newItems);
        await this.chart.expand(newItems, {
          animate,
          layout: {
            name: this.layoutName,
            fix: "all",
            top: ["radial", "sequential"].includes(this.layoutName)
              ? this.overElem
              : "",
            tightness: 3,
          },
          arrange: { name: "concentric" },
        });
        // add donuts in the underlying nodes
        await this.constructDonuts(newItems);
        // ping the newly added element
        await this.chart.ping(node.individuals[0].id);
      }
    }
  };

  endDrag = async (data) => {
    // check whether we have dropped the element within the this.chart area
    const klRect = this.container.getBoundingClientRect();
    let viewCoordinates = data.individuals[0].viewCoordinates;
    const mouseViewCoords = {
      x: viewCoordinates.clientX - klRect.left,
      y: viewCoordinates.clientY - klRect.top,
    };
    const withinChartX =
      mouseViewCoords.x >= 0 && mouseViewCoords.x <= klRect.width;
    const withinChartY =
      mouseViewCoords.y >= 0 && mouseViewCoords.y <= klRect.height;
    const mouseIsOverChart = withinChartX && withinChartY;
    if (mouseIsOverChart) {
      await this.createNode(data, mouseViewCoords);
    }
    this.chart.selection([]);
  };

  expandChart = async (clickedId) => {
    let { newItems, highLevelNodes } = await this.dataStore.getEntityNetwork(
      clickedId,
      "ap1",
      this.viewMode
    );
    this.highLevelNodes = { ...this.highLevelNodes, ...highLevelNodes };
    // ammend the glyph count of the existing elements
    await this.recalculateGlyphs(clickedId, newItems, "expand");
    await this.chart.expand(newItems, {
      layout: {
        name: this.layoutName,
        fix: "all",
        top: ["radial", "sequential"].includes(this.layoutName)
          ? clickedId
          : "",
        tightness: 3,
      },
      arrange: { name: "concentric" },
    });
    // add donuts in the underlying nodes
    await this.constructDonuts(newItems);
    // the element has expanded so set the expanded flag
    let clickedElement = this.chart.getItem(clickedId);
    await this.chart.setProperties({
      id: clickedElement.id,
      d: {
        ...clickedElement.d,
        expanded: true,
      },
    });
  };

  toggleChart = async (clickedId) => {
    let clickedElement = this.chart.getItem(clickedId);
    let elementsToMove = [];
    let props = [];
    let neighbours = this.chart.graph().neighbours(clickedId, { all: true });
    neighbours.nodes.forEach((nodeId) => {
      let node = this.chart.getItem(nodeId);
      if (!node.d.coreEntity) {
        elementsToMove.push(nodeId);
      }
    });

    // animate the elements to move to the position of the core entity
    elementsToMove.forEach((id) => {
      props.push({ id, x: clickedElement.x, y: clickedElement.y });
    });

    // shrink the element
    if (!clickedElement.d.shrunk) {
      await this.chart.animateProperties(props, { time: 400 });
      // hide the elements to move
      await this.chart.hide(elementsToMove);
      // set the shrunk flag to true
      await this.chart.setProperties({
        id: clickedId,
        d: { ...clickedElement.d, shrunk: true },
      });
    } else {
      // set the fixed nodes for the layout
      const fixed = [];
      const toArrange = [];
      this.chart.each(
        { type: "node", items: "toplevel" },
        ({ id, hi }) => hi || fixed.push(id)
      );
      // set the new coordinates of the hidden elements to be those of their sh category
      await this.chart.setProperties(props);
      // show the previously shrunk elements
      await this.chart.show(elementsToMove, true);
      // arrange combo nodes included in elements to move
      elementsToMove.forEach((nodeId) => {
        if (this.chart.combo().isCombo(nodeId)) {
          toArrange.push(nodeId);
          const underlyingElems = this.chart.combo().info(nodeId).nodes;
          underlyingElems.forEach(({ id }) => {
            const parentComboId = this.chart
              .combo()
              .find(id, { parent: "first" });
            if (parentComboId && !toArrange.includes(parentComboId)) {
              toArrange.push(parentComboId);
            }
          });
        }
      });
      await this.chart.combo().arrange(toArrange, { name: "concentric" });
      // run the selected layout against the new visible nodes
      await this.runLayout(this.layoutName, true, { fixed });
      // set the shrunk flag to false
      await this.chart.setProperties({
        id: clickedId,
        d: { ...clickedElement.d, shrunk: false },
      });
    }
  };

  handleSelectionChange = () => {
    this.enableLayoutOptions();
  };

  handleDblClick = (id) => {
    let clickedElement = this.chart.getItem(id);
    if (
      clickedElement.d.coreEntity &&
      !clickedElement.d.expanded &&
      clickedElement.d.individualCount > 0
    ) {
      this.expandChart(id);
    } else if (clickedElement.d.coreEntity && clickedElement.d.expanded) {
      this.toggleChart(id);
    }

    if (this.chart.combo().isCombo(id)) {
      let elems = this.chart.combo().info(id);
      if (
        elems.nodes.length === 1 &&
        !elems.nodes[0].d.icon &&
        !elems.nodes[0].d.name
      ) {
        return true;
      }
    }
  };

  handleClick = (id) => {
    if (id != null) {
      this.clickNodeListener(id);
    }
  };

  setupUI() {
    this.container = document.getElementById("kl");
    this.chart.bind("dblclick", this.handleDblClick);
    this.chart.bind("click", this.handleClick);
  }

  /**
   * Create chart and load data
   * @param {String|HTMLDivElement} chartContainer Container div element or id for KeyLines chart
   */
  async createChart(chartContainer, defaultView) {
    await fontsLoaded;
    const imageAlignment = {
      [KeyLines.getFontIcon("fa-project-diagram")]: { e: 0.85 },
      [KeyLines.getFontIcon("fa-sitemap")]: { e: 0.85 },
    };
    const chartOptions = {
      drag: {
        links: false,
      },
      hover: 5,
      iconFontFamily: "Font Awesome 5 Free",
      defaultStyles: {
        comboGlyph: null,
      },
      handMode: true,
      imageAlignment,
    };

    let { newItems, highLevelNodes } = await this.dataStore.getCoreStructure();
    this.chart = await KeyLines.create([
      { container: chartContainer, options: chartOptions, type: "chart" },
    ]);
    this.chart.load({ type: "LinkChart", items: newItems });
    this.chart.zoom("fit");
    this.runLayout();
    window.chart = this.chart;
    this.highLevelNodes = {};
    this.comboMap = {};
    this.viewMode = [];  // ["Org", "Team"];
    this.setupUI();
  }

  /**
   * Positions nodes on the chart according to the given layout
   * @param {String} layoutName One of the KeyLines chart layouts
   */
  async runLayout(layoutName = "organic", consistent = false, extra = {}) {
    this.layoutName = layoutName;
    const options = {
      tightness: 3,
      top: ["radial", "sequential"].includes(layoutName)
        ? this.chart.selection()
        : [],
      consistent,
      ...extra,
    };
    this.chart.layout(layoutName, options);
  }

  async updateVisualisationMode(visMode) {
    let toUncombine = [];
    this.viewMode = visMode;
    this.comboMap = {};
    this.chart.each({ type: "node", items: "all" }, (node) => {
      if (this.chart.combo().isCombo(node.id)) {
        toUncombine.push(node.id);
      }
    });
    await this.chart
      .combo()
      .uncombine(toUncombine, { full: true, select: false, animate: true });

    const combineByProperty = async (property, level) => {
      let count = {};
      let newCombos = {};
      let data = {};
      let comboDefs = [];
      this.chart.each({ type: "node", items: level }, (node) => {
        if (node.d[property]) {
          let propertyId =
            visMode.length > 1 && property === "team"
              ? `${node.d.sh_category.current}_${node.d.organisation.current}_${node.d[property].current}`
              : `${node.d.sh_category.current}_${node.d[property].current}`;
          newCombos[propertyId] = newCombos[propertyId] || [];
          newCombos[propertyId].push(node.id);
          count[propertyId] = count[propertyId] || 0;
          if (node.d.icon || node.d.name) {
            count[propertyId] +=
              level === "toplevel" ? parseInt(node.g[0].t, 10) : 1;
          }
          if (!data[propertyId]) {
            // store the d property for future reference
            data[propertyId] = { ...node.d, comboProperty: propertyId };
          }
        }
      });
      Object.keys(newCombos).forEach((id) => {
        if (this.highLevelNodes[id]) {
          let style = {
            fi: {
              t: this.highLevelNodes[id].d.icon
                ? KeyLines.getFontIcon(this.highLevelNodes[id].d.icon)
                : "",
              c: this.highLevelNodes[id].d.iconColor || "#414b57",
            },
            c: this.highLevelNodes[id].color || "#d8d8d8",
            b: this.highLevelNodes[id].border || "#3b4f81",
            bw: 1,
            d: { ...data[id] },
            g:
              count[id] === 0
                ? []
                : [
                    {
                      b: "#4a5c89",
                      c: "#4966ac",
                      e: 1.2,
                      fc: "#f3f5f9",
                      ff: "sans-serif",
                      p: 45,
                      r: 35,
                      t: count[id],
                      w: true,
                    },
                  ],
            donuts: {},
          };
          comboDefs.push({
            ids: newCombos[id],
            style,
            label: this.highLevelNodes[id].d.name,
          });
        }
      });
      const comboIds = await this.chart
        .combo()
        .combine(comboDefs, { select: false, arrange: "concentric" });
      comboIds.forEach((comboId) => {
        this.comboMap[this.chart.getItem(comboId).d.comboProperty] = comboId;
      });
    };

    if (visMode.length === 1) {
      if (visMode[0] === "Org") {
        await combineByProperty("organisation", "underlying");
      } else {
        // group by team
        await combineByProperty("team", "underlying");
      }
    } else if (visMode.length > 1) {
      // group by both organisation and team
      await combineByProperty("team", "underlying");
      await combineByProperty("organisation", "toplevel");
    }

    // only run the layout for the viewUpdate and not when intialising/ fetching elements
    if (Object.keys(this.highLevelNodes).length > 0) {
      let fixed = [];
      this.chart.each({ type: "node", items: "toplevel" }, (item) => {
        if (item.d.coreEntity && (!item.d.expanded || item.d.shrunk)) {
          fixed.push(item.id);
        }
      });
      await this.runLayout(this.layoutName, true, { fixed });
    }
  }
}

export default class KeyLinesController extends BaseController {}
