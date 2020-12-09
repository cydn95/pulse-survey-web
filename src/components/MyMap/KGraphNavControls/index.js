import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import DropDown from "Components/dropdown";

import styles from "./styles.scss";

const KGraphNavControls = (props) => {
  const {
    updateMap,
    saveGraph,
    saveLoading,
  } = props;

  const [selectedViewMode, setSelectedViewMode] = useState({
    key: 2,
    title: "SH only",
  });
  const [selectedLayoutMode, setSelectedLayoutMode] = useState(null);

  useEffect(() => {
    if (selectedViewMode) {
      if (selectedViewMode.title === "Org/ Team/ SH") {
        updateMap(["Org", "Team"], "viewMode");
      } else if (selectedViewMode.title === "SH only") {
        updateMap([], "viewMode");
      } else if (selectedViewMode.title === "Org/ SH") {
        updateMap(["Org"], "viewMode");
      } else if (selectedViewMode.title === "Team/ SH") {
        updateMap(["Team"], "viewMode");
      }
    }
  }, [selectedViewMode]);

  useEffect(() => {
    if (selectedLayoutMode) {
      if (selectedLayoutMode.title === "Standard") {
        updateMap("Standard", "layout");
      } else if (selectedLayoutMode.title === "Radial") {
        updateMap("Radial", "layout");
      } else if (selectedLayoutMode.title === "Hierarchy") {
        updateMap("Sequential", "layout");
      }
    }
  }, [selectedLayoutMode]);

  return (
    <div className={styles.root}>
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        disabled={saveLoading ? true : false}
        onClick={(e) => saveGraph(e)}
      >
        Save
      </Button>
      <div className={styles.dropdown}>
        <DropDown
          data={[
            { key: 1, title: "Org/ Team/ SH" },
            { key: 2, title: "SH only" },
            { key: 3, title: "Org/ SH" },
            { key: 4, title: "Team/ SH" },
          ]}
          keySelector={(d) => d.key}
          valueSelector={(d) => d.title}
          selectedItem={selectedViewMode}
          onSelect={setSelectedViewMode}
        >
          {selectedViewMode ? selectedViewMode.title : "SH only"}
        </DropDown>
      </div>
      <div className={styles.dropdown}>
        <DropDown
          data={[
            { key: 1, title: "Standard" },
            { key: 2, title: "Radial" },
            { key: 3, title: "Hierarchy" },
          ]}
          keySelector={(d) => d.key}
          valueSelector={(d) => d.title}
          selectedItem={selectedLayoutMode}
          onSelect={setSelectedLayoutMode}
        >
          {selectedLayoutMode ? selectedLayoutMode.title : "Standard"}
        </DropDown>
      </div>
    </div>
  );
};

export default KGraphNavControls;
