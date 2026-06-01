import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppTitle from './AppTitle';

describe('AppTitle Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<AppTitle />);
    });

    it('should render an h1 element', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should render the correct title text', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Todo List');
    });

    it('should render version as superscript', () => {
      render(<AppTitle />);
      const superscript = screen.getByRole('heading', { level: 1 }).querySelector('sup');
      expect(superscript).toBeInTheDocument();
    });
  });

  describe('Version Display', () => {
    it('should display the correct version number', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('v0.1.2');
    });

    it('should have version class applied to sup element', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      const superscript = heading.querySelector('sup');
      expect(superscript).toHaveClass('version');
    });

    it('version should be positioned as superscript', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      const superscript = heading.querySelector('sup');
      expect(superscript?.tagName).toBe('SUP');
    });
  });

  describe('DOM Structure', () => {
    it('should have correct hierarchy: h1 > sup', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      const superscript = heading.querySelector('sup');
      expect(superscript?.parentElement).toBe(heading);
    });

    it('should contain text content in h1', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toContain('Todo List');
      expect(heading.textContent).toContain('v0.1.2');
    });

    it('should render only one h1 element', () => {
      render(<AppTitle />);
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
    });

    it('should render only one sup element inside h1', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      const superscripts = heading.querySelectorAll('sup');
      expect(superscripts).toHaveLength(1);
    });
  });

  describe('Accessibility', () => {
    it('should have semantic heading structure', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.tagName).toBe('H1');
    });

    it('heading should be visible and queryable by role', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeVisible();
    });

    it('should have text content that is readable', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      const text = heading.textContent || '';
      expect(text.length).toBeGreaterThan(0);
      expect(text).not.toBeNull();
    });
  });

  describe('Styling', () => {
    it('version element should have version class', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      const superscript = heading.querySelector('sup.version');
      expect(superscript).toBeInTheDocument();
    });

    it('h1 should be in the document and visible', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toBeVisible();
    });
  });

  describe('Component Props', () => {
    it('should be a React.FC component', () => {
      expect(AppTitle).toBeDefined();
      expect(typeof AppTitle).toBe('function');
    });

    it('should not require any props', () => {
      expect(() => render(<AppTitle />)).not.toThrow();
    });
  });

  describe('Content Verification', () => {
    it('should display "Todo List" as main heading text', () => {
      render(<AppTitle />);
      expect(screen.getByText(/Todo List/)).toBeInTheDocument();
    });

    it('should display version starting with "v"', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      const versionText = heading.querySelector('sup')?.textContent;
      expect(versionText).toMatch(/^v\d+\.\d+\.\d+/);
    });

    it('complete text should be "Todo Listv0.1.2"', () => {
      render(<AppTitle />);
      const heading = screen.getByRole('heading', { level: 1 });
      const completeText = heading.textContent || '';
      expect(completeText).toBe('Todo Listv0.1.2');
    });
  });
});
