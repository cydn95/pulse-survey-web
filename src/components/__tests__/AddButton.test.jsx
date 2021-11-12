import AddButton from '../AddButton'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

test('addButton works correctly', () => {
    const handleClick = jest.fn()
    render(<AddButton onClick={handleClick} text="hello" content={() => <div>Modal</div>} />)
    expect(screen.getByText('Add New hello')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add New hello'))
    expect(handleClick).toHaveBeenNthCalledTimes(1)
    expect(screen.getByText('Modal')).toBeInTheDocument();
})
