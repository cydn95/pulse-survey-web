import React from 'react'
import Accordion from '../accordion'
import { render, screen } from '@testing-library/react'

describe('work properly', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });
    test('accordion works correctly', () => {
        render(<Accordion headerSelector={(d) => { return "Header" }} data={[1, 2, 3]} />)
        expect(screen.getByText('Header')).toBeInTheDocument();
    })
})


// test('hello world', () => {
//     render(<p>Hello Jest!</p>);
//     expect(screen.getByText('Hello Jest!')).toBeInTheDocument();
// });

// const sum = require('./sum');
