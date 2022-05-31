import React from 'react'
import Sidebar from '../../containers/Sidebar'
import { render, screen, shallow } from '@testing-library/react'

// jest mock functions (mocks this.props.func)
const normalizeData = jest.fn();
const toggleModal = jest.fn();
const nextTab = jest.fn();
const onClick = jest.fn();

// defining this.props
const baseProps = {
    normalizeData,
    newResponse: {},
    THead: {},
    TBody: {},
    datasourceCatalog: {},
    toggleModal,
    nextTab,
    onClick,
}

describe('work properly', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Sidebar  {...baseProps} />));
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });
    test('accordion works correctly', () => {
        render(<Sidebar />)
        expect(screen.getByText('My Projects')).toBeInTheDocument();
        expect(screen.getByText('About Me')).toBeInTheDocument();
    })
    test('should call toggleModal and nextTab functions on button click', () => {
        // Reset info from possible previous calls of these mock functions:
        baseProps.toggleModal.mockClear();
        baseProps.nextTab.mockClear();

        // Remove props that would end up hiding the button
        wrapper.setProps({
            newResponse: null,
            datasourceCatalog: null
        });

        // Find the button and call the onClick handler
        wrapper.find('#next-btn-ready-modal').simulate('click');

        // Test to make sure prop functions were called via simulating the button click
        expect(baseProps.toggleModal).toHaveBeenCalled();
        expect(baseProps.nextTab).toHaveBeenCalled();
    })
})


// test('hello world', () => {
//     render(<p>Hello Jest!</p>);
//     expect(screen.getByText('Hello Jest!')).toBeInTheDocument();
// });

// const sum = require('./sum');
