import React from 'react'
import Button from '../Button'
import { render, screen, fireEvent } from '@testing-library/react'

describe('work properly', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });
    test('Button works correctly', () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click Me</Button>)
        fireEvent.click(screen.getByText(/click me/i))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})


// test('hello world', () => {
//     render(<p>Hello Jest!</p>);
//     expect(screen.getByText('Hello Jest!')).toBeInTheDocument();
// });

// const sum = require('./sum');
