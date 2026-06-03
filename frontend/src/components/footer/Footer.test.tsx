import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Footer />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should render footer div with correct class', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('.Footer');
      expect(footer).toHaveClass('Footer');
    });

    it('should render GitHub link', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /github/i });
      expect(link).toBeInTheDocument();
    });

    it('should render SVG icon', () => {
      const { container } = render(<Footer />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should display correct repository URL', () => {
      render(<Footer />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://github.com/e-Nicko/todo-app');
    });
  });

  describe('Link Attributes', () => {
    it('should open link in new tab', () => {
      render(<Footer />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should have noopener noreferrer for security', () => {
      render(<Footer />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should have correct GitHub repository path', () => {
      render(<Footer />);
      const link = screen.getByRole('link');
      const href = link.getAttribute('href') || '';

      expect(href).toContain('github.com');
      expect(href).toContain('e-Nicko');
      expect(href).toContain('todo-app');
    });
  });

  describe('SVG Icon', () => {
    it('should render SVG with correct attributes', () => {
      const { container } = render(<Footer />);
      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('height', '32');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('version', '1.1');
      expect(svg).toHaveAttribute('viewBox', '0 0 16 16');
    });

    it('should have aria-hidden attribute on SVG', () => {
      const { container } = render(<Footer />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have correct SVG classes', () => {
      const { container } = render(<Footer />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('octicon', 'octicon-mark-github', 'v-align-middle');
    });

    it('should render path element inside SVG', () => {
      const { container } = render(<Footer />);
      const path = container.querySelector('svg path');
      expect(path).toBeInTheDocument();
    });

    it('should have fill attribute set to currentColor', () => {
      const { container } = render(<Footer />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('fill', 'currentColor');
    });
  });

  describe('Path Element', () => {
    it('should have fillRule attribute', () => {
      const { container } = render(<Footer />);
      const path = container.querySelector('svg path');
      // fillRule might be present as fillRule or fill-rule depending on rendering
      const hasFillRule = path?.getAttribute('fillRule') || path?.getAttribute('fill-rule');
      expect(hasFillRule).toBe('evenodd');
    });

    it('should have non-empty d attribute', () => {
      const { container } = render(<Footer />);
      const path = container.querySelector('svg path');
      const d = path?.getAttribute('d');
      expect(d).toBeTruthy();
      expect(d?.length).toBeGreaterThan(0);
    });
  });

  describe('Link Text Content', () => {
    it('should contain GitHub repository URL text', () => {
      render(<Footer />);
      expect(screen.getByText(/github\.com\/e-Nicko\/todo-app/)).toBeInTheDocument();
    });

    it('should be displayable as link text', () => {
      render(<Footer />);
      const link = screen.getByRole('link');
      expect(link.textContent).toContain('github.com/e-Nicko/todo-app');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible via keyboard', () => {
      render(<Footer />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href');
    });

    it('should have descriptive link text', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: /github/i });
      expect(link).toBeVisible();
    });

    it('should have SVG marked as decorative with aria-hidden', () => {
      const { container } = render(<Footer />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('link should be keyboard navigable', () => {
      render(<Footer />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', expect.stringContaining('https'));
    });
  });

  describe('Data Attributes', () => {
    it('should have data-view-component attribute', () => {
      const { container } = render(<Footer />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('data-view-component', 'true');
    });
  });

  describe('Structure', () => {
    it('should have correct DOM structure', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('.Footer');
      const link = footer?.querySelector('a');
      const svg = link?.querySelector('svg');

      expect(footer).toBeInTheDocument();
      expect(link).toBeInTheDocument();
      expect(svg).toBeInTheDocument();
    });

    it('should only have one link element', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('.Footer');
      const links = footer?.querySelectorAll('a');

      expect(links?.length).toBe(1);
    });

    it('should only have one SVG element', () => {
      const { container } = render(<Footer />);
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBe(1);
    });
  });

  describe('SCSS Classes', () => {
    it('footer should have Footer class for styling', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('.Footer');
      expect(footer).toHaveClass('Footer');
    });
  });

  describe('Link Behavior', () => {
    it('should be a valid link', () => {
      render(<Footer />);
      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
    });

    it('should use HTTPS protocol', () => {
      render(<Footer />);
      const link = screen.getByRole('link');
      const href = link.getAttribute('href') || '';
      expect(href).toMatch(/^https:\/\//);
    });
  });
});
