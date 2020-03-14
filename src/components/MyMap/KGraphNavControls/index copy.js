import React from 'react';
import { 
    ButtonDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem, 
    Row, 
    Col, 
    ButtonGroup, 
    Form, 
    FormGroup, 
    Input, 
    Label 
} from 'reactstrap';

import DropDown from "Components/dropdown";
import Button from 'Components/Button';

import styles from './styles.scss';

const KGraphNavControls = (props) => {
    const {
        viewDropDownOpen,
        layoutDropDownOpen,
        updateViewDisplay,
        updateLayoutDisplay,
        updateMap,
        selectedLayout,
        selectedViewMode,
        enableLayout,
        saveGraph,
        saveLoading
    } = props

    let displayedViewMode;

    if(selectedViewMode.length > 1){
        displayedViewMode='Org/ Team/ SH';

    } else if (selectedViewMode.length === 1){
        if (selectedViewMode[0] === 'Org') {
            displayedViewMode = 'Org/ SH';
        } else {
            displayedViewMode = 'Team/ SH';
        }
    } else {
        displayedViewMode = 'SH only';
    }

    return (
        <div className={styles.root}>
            <Button onClick={e => saveGraph(e)} disabled={saveLoading ? "disabled" : "" }>Save</Button>
            
            <div className="mapButtonGroup">
                
                <ButtonDropdown 
                    id='viewMode'
                    isOpen={viewDropDownOpen} 
                    toggle={() => updateViewDisplay()} 
                    >
                    <DropdownToggle caret>
                        {displayedViewMode}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Selected View</DropdownItem>
                        <DropdownItem active={displayedViewMode==='Org/ Team/ SH'} onClick={(e) => { updateMap(['Org','Team'], 'viewMode') }}>Org/ Team/ SH</DropdownItem>
                        <DropdownItem active={displayedViewMode==='SH only'} onClick={(e) => { updateMap([], 'viewMode') }}>SH Only</DropdownItem>
                        <DropdownItem active={displayedViewMode==='Org/ SH'} onClick={(e) => { updateMap(['Org'], 'viewMode') }}>Org/ SH</DropdownItem>
                        <DropdownItem active={displayedViewMode==='Team/ SH'} onClick={(e) => { updateMap(['Team'], 'viewMode') }}>Team/ SH</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                &nbsp;&nbsp;
                <ButtonGroup>
                    <Button onClick={(e) => { updateMap(selectedLayout, 'layout') }} disabled={['Radial','Sequential'].includes(selectedLayout) && !enableLayout}>{selectedLayout}</Button>
                    <ButtonDropdown isOpen={layoutDropDownOpen} toggle={(e) => updateLayoutDisplay(e)}>
                        <DropdownToggle caret>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Layout Options</DropdownItem>
                            <DropdownItem id='standard' active={selectedLayout === 'Standard'} onClick={(e) => { updateMap('Standard', 'layout') }}>Standard</DropdownItem>
                            <DropdownItem id='radial' active={selectedLayout === 'Radial'} onClick={(e) => { updateMap('Radial', 'layout') }} disabled={!enableLayout}>Radial</DropdownItem>
                            <DropdownItem id='sequential' active={selectedLayout === 'Sequential'} onClick={(e) => { updateMap('Sequential', 'layout') }} disabled={!enableLayout}>Sequential</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </ButtonGroup>
                
            </div>
        </div>
    );
}

export default KGraphNavControls;