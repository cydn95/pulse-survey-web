import React from 'react'
import TopNav from '../../containers/TopNav'
import { render, screen } from '@testing-library/react'

describe('work properly', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(1 + 2).toBe(3);
    });
    test('accordion works correctly', () => {
        render(<TopNav profile={{
            avatar: '123',
            firstName: 'Mike',
            lastName: 'Smith'
        }}
        />)
        expect(screen.getByText('Mike')).toBeInTheDocument();
        expect(screen.getByText('Smith')).toBeInTheDocument();
    })
})


// test('hello world', () => {
//     render(<p>Hello Jest!</p>);
//     expect(screen.getByText('Hello Jest!')).toBeInTheDocument();
// });

// const sum = require('./sum');
