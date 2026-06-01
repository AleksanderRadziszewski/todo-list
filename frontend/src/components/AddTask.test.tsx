import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTask from './AddTask';

describe('AddTask Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('should render input field with placeholder', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const input = screen.getByPlaceholderText('Add new task');
      expect(input).toBeInTheDocument();
    });

    it('should render submit button', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const button = screen.getByRole('button', { name: /add/i });
      expect(button).toBeInTheDocument();
    });

    it('should render form element', () => {
      const mockOnAdd = jest.fn();
      const { container } = render(<AddTask onAdd={mockOnAdd} />);
      const form = container.querySelector('form');
      expect(form).toHaveClass('addTask');
    });
  });

  describe('User Input', () => {
    it('should update input value when user types', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const input = screen.getByPlaceholderText('Add new task') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'Test Task' } });
      expect(input.value).toBe('Test Task');
    });

    it('should call onAdd callback when form is submitted', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const input = screen.getByPlaceholderText('Add new task');

      fireEvent.change(input, { target: { value: 'New Task' } });
      const button = screen.getByRole('button', { name: /add/i });
      fireEvent.click(button);

      expect(mockOnAdd).toHaveBeenCalledWith('New Task');
      expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });

    it('should clear input after form submission', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const input = screen.getByPlaceholderText('Add new task') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'Test Task' } });
      fireEvent.click(screen.getByRole('button', { name: /add/i }));

      expect(input.value).toBe('');
    });

    it('should not call onAdd when input is empty', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);

      fireEvent.click(screen.getByRole('button', { name: /add/i }));
      expect(mockOnAdd).not.toHaveBeenCalled();
    });

    it('should call onAdd on Enter key press', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const input = screen.getByPlaceholderText('Add new task');

      fireEvent.change(input, { target: { value: 'Task via Enter' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(mockOnAdd).toHaveBeenCalledWith('Task via Enter');
    });

    it('should not trigger on other key press', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const input = screen.getByPlaceholderText('Add new task');

      fireEvent.change(input, { target: { value: 'Task' } });
      fireEvent.keyDown(input, { key: 'Escape' });

      expect(mockOnAdd).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should disable input when loading is true', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} loading={true} />);
      const input = screen.getByPlaceholderText('Add new task') as HTMLInputElement;

      expect(input.disabled).toBe(true);
    });

    it('should enable input when loading is false', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} loading={false} />);
      const input = screen.getByPlaceholderText('Add new task') as HTMLInputElement;

      expect(input.disabled).toBe(false);
    });

    it('should show spinner in button when loading is true', () => {
      const mockOnAdd = jest.fn();
      const { container } = render(<AddTask onAdd={mockOnAdd} loading={true} />);
      const spinner = container.querySelector('.spinner');

      expect(spinner).toBeInTheDocument();
    });

    it('should show "Add" text when loading is false', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} loading={false} />);
      expect(screen.getByRole('button', { name: /add/i })).toHaveTextContent('Add');
    });

    it('should default loading to false', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const input = screen.getByPlaceholderText('Add new task') as HTMLInputElement;

      expect(input.disabled).toBe(false);
    });
  });

  describe('Form Submission', () => {
    it('should prevent default form submission', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const form = screen.getByPlaceholderText('Add new task').closest('form');
      const input = screen.getByPlaceholderText('Add new task');

      // Set a non-empty value first
      fireEvent.change(input, { target: { value: 'Test Task' } });

      // Submit the form
      fireEvent.submit(form as HTMLFormElement);

      // The onAdd callback should be called with the task title
      expect(mockOnAdd).toHaveBeenCalledWith('Test Task');
    });
  });

  describe('Props Validation', () => {
    it('should accept onAdd prop', () => {
      const mockOnAdd = jest.fn();
      expect(() => {
        render(<AddTask onAdd={mockOnAdd} />);
      }).not.toThrow();
    });

    it('should accept optional loading prop', () => {
      const mockOnAdd = jest.fn();
      expect(() => {
        render(<AddTask onAdd={mockOnAdd} loading={true} />);
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible input', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const input = screen.getByPlaceholderText('Add new task');

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should have accessible button', () => {
      const mockOnAdd = jest.fn();
      render(<AddTask onAdd={mockOnAdd} />);
      const button = screen.getByRole('button', { name: /add/i });

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
    });
  });
});
