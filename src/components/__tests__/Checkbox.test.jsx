import React from 'react'
import CheckBox from '../Checkbox'
import { render, screen } from '@testing-library/react'

describe('work properly', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });
    test('CheckBox works correctly', () => {
        const handleClick = jest.fn()
        render(<CheckBox onClick={handleClick}>Click Me</CheckBox>)
        fireEvent.click(screen.getByText(/click me/i))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})


// test('hello world', () => {
//     render(<p>Hello Jest!</p>);
//     expect(screen.getByText('Hello Jest!')).toBeInTheDocument();
// });

// const sum = require('./sum');
