import React from 'react'
import Participation from '../report/Participation'
import { render, screen } from '@testing-library/react'

describe('work properly', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });
    test('accordion works correctly', () => {
        render(<Participation />)
        expect(screen.getByText('Team Members')).toBeInTheDocument();
        expect(screen.getByText('Stake Holders')).toBeInTheDocument();
    })
})


// test('hello world', () => {
//     render(<p>Hello Jest!</p>);
//     expect(screen.getByText('Hello Jest!')).toBeInTheDocument();
// });

// const sum = require('./sum');
