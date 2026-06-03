import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });

    it('should render div with spinner class', () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector('.spinner');
      expect(spinner).toHaveClass('spinner');
    });

    it('should render single div element', () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector('.spinner');
      expect(spinner?.children.length).toBe(0);
    });
  });

  describe('Default Props', () => {
    it('should use default size of 10 if not provided', () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe('10px');
      expect(spinner.style.height).toBe('10px');
    });

    it('should use default color if not provided', () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.borderTopColor).toBe('transparent');
    });

    it('should set border based on default size', () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      // Default size is 10, so border should be 10/5 = 2px
      expect(spinner.style.borderWidth).toBe('2px');
    });
  });

  describe('Custom Size Prop', () => {
    it('should use custom size when provided', () => {
      const { container } = render(<Spinner size={20} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe('20px');
      expect(spinner.style.height).toBe('20px');
    });

    it('should calculate border based on custom size', () => {
      const { container } = render(<Spinner size={50} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      // Border should be 50/5 = 10px
      expect(spinner.style.borderWidth).toBe('10px');
    });

    it('should handle size of 0', () => {
      const { container } = render(<Spinner size={0} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe('0px');
      expect(spinner.style.height).toBe('0px');
      expect(spinner.style.borderWidth).toBe('0px');
    });

    it('should handle small size', () => {
      const { container } = render(<Spinner size={1} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe('1px');
      expect(spinner.style.height).toBe('1px');
    });

    it('should handle large size', () => {
      const { container } = render(<Spinner size={100} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe('100px');
      expect(spinner.style.height).toBe('100px');
      expect(spinner.style.borderWidth).toBe('20px');
    });

    it('should handle decimal size', () => {
      const { container } = render(<Spinner size={15.5} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe('15.5px');
      expect(spinner.style.height).toBe('15.5px');
    });
  });

  describe('Custom Color Prop', () => {
    it('should use custom color when provided', () => {
      const { container } = render(<Spinner color="red" />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.borderColor).toBe('red');
    });

    it('should use hex color', () => {
      const { container } = render(<Spinner color="#FF0000" />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      // Browsers normalize hex colors to lowercase
      expect(spinner.style.borderColor.toLowerCase()).toBe('#ff0000');
    });

    it('should use rgb color', () => {
      const { container } = render(<Spinner color="rgb(255, 0, 0)" />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.borderColor).toBe('rgb(255, 0, 0)');
    });

    it('should use rgba color', () => {
      const { container } = render(<Spinner color="rgba(0, 0, 0, 0.8)" />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.borderColor).toBe('rgba(0, 0, 0, 0.8)');
    });

    it('should always have transparent top border', () => {
      const { container } = render(<Spinner color="blue" />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.borderTopColor).toBe('transparent');
    });

    it('should use default color #333 when not provided', () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.borderColor).toBe('#333');
    });
  });

  describe('Combined Props', () => {
    it('should apply both size and color', () => {
      const { container } = render(<Spinner size={25} color="green" />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe('25px');
      expect(spinner.style.height).toBe('25px');
      expect(spinner.style.borderColor).toBe('green');
    });

    it('should work with custom size and color together', () => {
      const { container } = render(<Spinner size={30} color="purple" />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe('30px');
      expect(spinner.style.height).toBe('30px');
      expect(spinner.style.borderColor).toBe('purple');
      expect(spinner.style.borderWidth).toBe('6px');
    });
  });

  describe('CSS Properties', () => {
    it('should have square dimensions', () => {
      const { container } = render(<Spinner size={40} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe(spinner.style.height);
    });

    it('should be circular due to border', () => {
      const { container } = render(<Spinner size={20} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      // Aspect ratio should be 1:1 for circular appearance
      expect(spinner.style.width).toBe(spinner.style.height);
    });

    it('should have border style property', () => {
      const { container } = render(<Spinner size={15} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      const style = spinner.getAttribute('style') || '';
      expect(style).toContain('border');
      expect(style).toContain('border-top');
    });
  });

  describe('Props Interface', () => {
    it('should accept size prop as optional', () => {
      expect(() => {
        render(<Spinner />);
      }).not.toThrow();
    });

    it('should accept color prop as optional', () => {
      expect(() => {
        render(<Spinner size={10} />);
      }).not.toThrow();
    });

    it('should accept both props', () => {
      expect(() => {
        render(<Spinner size={20} color="blue" />);
      }).not.toThrow();
    });
  });

  describe('Animation Class', () => {
    it('should have spinner class for animation', () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector('.spinner');

      // The CSS class should be there for animation
      expect(spinner).toHaveClass('spinner');
    });

    it('should maintain spinner class with custom props', () => {
      const { container } = render(<Spinner size={25} color="orange" />);
      const spinner = container.querySelector('.spinner');

      expect(spinner).toHaveClass('spinner');
    });
  });

  describe('Edge Cases', () => {
    it('should handle negative size', () => {
      const { container } = render(<Spinner size={-10} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe('-10px');
    });

    it('should handle very large size', () => {
      const { container } = render(<Spinner size={999999} />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      expect(spinner.style.width).toBe('999999px');
    });

    it('should handle empty color string', () => {
      const { container } = render(<Spinner color="" />);
      const spinner = container.querySelector('.spinner') as HTMLElement;

      // Should still render with border
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render as div element', () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector('.spinner');

      expect(spinner?.tagName).toBe('DIV');
    });

    it('should be displayed on page', () => {
      const { container } = render(<Spinner />);
      const spinner = container.querySelector('.spinner');

      expect(spinner).toBeVisible();
    });
  });
});
