import React from 'react'
import Input from '../Input'
import { render, screen } from '@testing-library/react'

describe('work properly', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });
    test('Input works correctly', () => {
        const handleClick = jest.fn()
        render(<Input onChange={handleClick} />)
        fireEvent.change(input, {target: {value: '24/05/2020'}})
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})


// test('hello world', () => {
//     render(<p>Hello Jest!</p>);
//     expect(screen.getByText('Hello Jest!')).toBeInTheDocument();
// });

// const sum = require('./sum');
