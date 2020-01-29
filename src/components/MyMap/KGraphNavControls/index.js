import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, ButtonGroup, Button, Form, FormGroup, Input, Label } from 'reactstrap';

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

    if(selectedViewMode.length>1){
        displayedViewMode='Org/ Team/ SH';
    }else if (selectedViewMode.length===1){
        if(selectedViewMode[0]==='Org'){
            displayedViewMode='Org/ SH';
        }else{
            displayedViewMode='Team/ SH';
        }
    }else{
        displayedViewMode='SH only';
    }

    return (
        <div className='mapButtonGroup'>
            <Row>
                <Col> 
                    <a className="waves-effect waves-light btn btn-danger active" 
                        onClick={e => saveGraph(e)} disabled={saveLoading ? "disabled" : "" } >Save</a>&nbsp;&nbsp;
                </Col>
                <Col> 
                    <ButtonDropdown isOpen={viewDropDownOpen} toggle={() => updateViewDisplay()} id='viewMode'>
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
                </Col>
                <Col>
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
                </Col>
            </Row>
        </div>
    );
}

export default KGraphNavControls;