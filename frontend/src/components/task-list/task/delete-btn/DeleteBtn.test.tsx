import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteBtn from './DeleteBtn';

describe('DeleteBtn Component', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<DeleteBtn id={1} onDelete={mockOnDelete} />);
      expect(screen.getByRole('button', { name: 'x' })).toBeInTheDocument();
    });

    it('should display delete button with correct text', () => {
      render(<DeleteBtn id={1} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });
      expect(button).toHaveTextContent('x');
    });

    it('should be a button element', () => {
      render(<DeleteBtn id={1} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Click Handler', () => {
    it('should call onDelete when button is clicked', () => {
      render(<DeleteBtn id={1} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      fireEvent.click(button);

      expect(mockOnDelete).toHaveBeenCalledWith(1);
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    it('should pass correct id to onDelete callback', () => {
      render(<DeleteBtn id={42} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      fireEvent.click(button);

      expect(mockOnDelete).toHaveBeenCalledWith(42);
    });

    it('should call onDelete with different ids', () => {
      const { rerender } = render(<DeleteBtn id={1} onDelete={mockOnDelete} />);

      const button1 = screen.getByRole('button', { name: 'x' });
      fireEvent.click(button1);

      expect(mockOnDelete).toHaveBeenCalledWith(1);

      mockOnDelete.mockClear();

      rerender(<DeleteBtn id={99} onDelete={mockOnDelete} />);
      const button2 = screen.getByRole('button', { name: 'x' });
      fireEvent.click(button2);

      expect(mockOnDelete).toHaveBeenCalledWith(99);
    });

    it('should handle multiple clicks', () => {
      render(<DeleteBtn id={5} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockOnDelete).toHaveBeenCalledTimes(3);
      expect(mockOnDelete).toHaveBeenLastCalledWith(5);
    });
  });

  describe('Props Validation', () => {
    it('should accept id and onDelete props', () => {
      expect(() => {
        render(<DeleteBtn id={1} onDelete={mockOnDelete} />);
      }).not.toThrow();
    });

    it('should handle numeric ids', () => {
      render(<DeleteBtn id={12345} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      fireEvent.click(button);
      expect(mockOnDelete).toHaveBeenCalledWith(12345);
    });

    it('should handle id of 0', () => {
      render(<DeleteBtn id={0} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      fireEvent.click(button);
      expect(mockOnDelete).toHaveBeenCalledWith(0);
    });

    it('should handle negative ids', () => {
      render(<DeleteBtn id={-1} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      fireEvent.click(button);
      expect(mockOnDelete).toHaveBeenCalledWith(-1);
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible via click', () => {
      render(<DeleteBtn id={1} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      // Native button handles keyboard, test that click works
      fireEvent.click(button);
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });

    it('should have proper button role', () => {
      render(<DeleteBtn id={1} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      expect(button.tagName).toBe('BUTTON');
    });

    it('should be visible to screen readers', () => {
      render(<DeleteBtn id={1} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      expect(button).toBeVisible();
    });
  });

  describe('Styling', () => {
    it('should render without inline styles', () => {
      render(<DeleteBtn id={1} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      expect(button.style.cssText).toBe('');
    });

    it('should be a standalone button without extra elements', () => {
      const { container } = render(<DeleteBtn id={1} onDelete={mockOnDelete} />);
      const children = container.querySelector('button')?.children;

      expect(children?.length).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large ids', () => {
      const largeId = Number.MAX_SAFE_INTEGER;
      render(<DeleteBtn id={largeId} onDelete={mockOnDelete} />);
      const button = screen.getByRole('button', { name: 'x' });

      fireEvent.click(button);
      expect(mockOnDelete).toHaveBeenCalledWith(largeId);
    });

    it('should be usable in loops', () => {
      const { container } = render(
        <div>
          {[1, 2, 3].map((id) => (
            <DeleteBtn key={id} id={id} onDelete={mockOnDelete} />
          ))}
        </div>
      );

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(3);

      buttons.forEach((button, index) => {
        fireEvent.click(button);
        expect(mockOnDelete).toHaveBeenNthCalledWith(index + 1, index + 1);
      });
    });
  });
});
