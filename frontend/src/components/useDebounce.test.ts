import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

describe('useDebounce Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Basic Functionality', () => {
    it('should return the initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('initial', 500));
      expect(result.current).toBe('initial');
    });

    it('should debounce value changes', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: string; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 500 } }
      );

      expect(result.current).toBe('initial');

      act(() => {
        rerender({ value: 'updated', delay: 500 });
      });

      // Value should still be initial before delay
      expect(result.current).toBe('initial');

      // Advance timer past the debounce delay
      act(() => {
        jest.advanceTimersByTime(501);
      });

      // Value should now be updated
      expect(result.current).toBe('updated');
    });

    it('should use default delay of 500ms', () => {
      const { result, rerender } = renderHook(
        ({ value }: { value: string }) => useDebounce(value),
        { initialProps: { value: 'initial' } }
      );

      act(() => {
        rerender({ value: 'updated' });
      });

      expect(result.current).toBe('initial');

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current).toBe('updated');
    });

    it('should use custom delay when provided', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: string; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 1000 } }
      );

      act(() => {
        rerender({ value: 'updated', delay: 1000 });
      });

      // Advance only 500ms
      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Value should still be initial
      expect(result.current).toBe('initial');

      // Advance another 600ms (total 1100ms)
      act(() => {
        jest.advanceTimersByTime(600);
      });

      // Value should now be updated
      expect(result.current).toBe('updated');
    });
  });

  describe('Value Change Behavior', () => {
    it('should reset timer on value change', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: string; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 500 } }
      );

      act(() => {
        rerender({ value: 'first', delay: 500 });
      });

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(result.current).toBe('initial');

      // Change value again - timer should reset
      act(() => {
        rerender({ value: 'second', delay: 500 });
      });

      // We're at 200ms total, debounced value hasn't changed yet
      expect(result.current).toBe('initial');

      // Advance 400ms (total 600ms, but only 400ms since last change)
      act(() => {
        jest.advanceTimersByTime(400);
      });

      // Should still be initial because timer was reset
      expect(result.current).toBe('initial');

      // Advance another 200ms (500ms total since last change)
      act(() => {
        jest.advanceTimersByTime(200);
      });

      // Now should be 'second'
      expect(result.current).toBe('second');
    });

    it('should handle multiple rapid changes', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: string; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: 'a', delay: 500 } }
      );

      // Rapid changes
      act(() => {
        rerender({ value: 'ab', delay: 500 });
        jest.advanceTimersByTime(100);
        rerender({ value: 'abc', delay: 500 });
        jest.advanceTimersByTime(100);
        rerender({ value: 'abcd', delay: 500 });
        jest.advanceTimersByTime(100);
      });

      // Initial value should remain
      expect(result.current).toBe('a');

      // Advance to beyond the last change
      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Should have the final value
      expect(result.current).toBe('abcd');
    });
  });

  describe('Different Data Types', () => {
    it('should debounce numbers', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: number; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: 1, delay: 500 } }
      );

      expect(result.current).toBe(1);

      act(() => {
        rerender({ value: 42, delay: 500 });
      });

      act(() => {
        jest.advanceTimersByTime(501);
      });

      expect(result.current).toBe(42);
    });

    it('should debounce booleans', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: boolean; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: false, delay: 500 } }
      );

      expect(result.current).toBe(false);

      act(() => {
        rerender({ value: true, delay: 500 });
      });

      act(() => {
        jest.advanceTimersByTime(501);
      });

      expect(result.current).toBe(true);
    });

    it('should debounce objects', () => {
      const obj1 = { name: 'object1' };
      const obj2 = { name: 'object2' };

      const { result, rerender } = renderHook(
        ({ value, delay }: { value: object; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: obj1, delay: 500 } }
      );

      expect(result.current).toBe(obj1);

      act(() => {
        rerender({ value: obj2, delay: 500 });
      });

      act(() => {
        jest.advanceTimersByTime(501);
      });

      expect(result.current).toBe(obj2);
    });

    it('should debounce arrays', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];

      const { result, rerender } = renderHook(
        ({ value, delay }: { value: number[]; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: arr1, delay: 500 } }
      );

      expect(result.current).toBe(arr1);

      act(() => {
        rerender({ value: arr2, delay: 500 });
      });

      act(() => {
        jest.advanceTimersByTime(501);
      });

      expect(result.current).toBe(arr2);
    });
  });

  describe('Cleanup', () => {
    it('should clean up timeout on unmount', () => {
      const { unmount } = renderHook(() => useDebounce('test', 500));

      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
      clearTimeoutSpy.mockRestore();
    });

    it('should clean up previous timeout when value changes', () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

      const { rerender } = renderHook(
        ({ value, delay }: { value: string; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: 'first', delay: 500 } }
      );

      act(() => {
        rerender({ value: 'second', delay: 500 });
      });

      // clearTimeout should have been called to clear the previous timer
      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero delay', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: string; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 0 } }
      );

      act(() => {
        rerender({ value: 'updated', delay: 0 });
      });

      // Even with 0 delay, setTimeout schedules for next tick
      act(() => {
        jest.runAllTimers();
      });

      expect(result.current).toBe('updated');
    });

    it('should handle very large delay', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: string; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 100000 } }
      );

      act(() => {
        rerender({ value: 'updated', delay: 100000 });
      });

      act(() => {
        jest.advanceTimersByTime(50000);
      });

      expect(result.current).toBe('initial');

      act(() => {
        jest.advanceTimersByTime(50001);
      });

      expect(result.current).toBe('updated');
    });

    it('should handle same value being set multiple times', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: string; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: 'same', delay: 500 } }
      );

      act(() => {
        rerender({ value: 'same', delay: 500 });
      });

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current).toBe('same');
    });

    it('should handle empty string', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }: { value: string; delay: number }) =>
          useDebounce(value, delay),
        { initialProps: { value: '', delay: 500 } }
      );

      expect(result.current).toBe('');

      act(() => {
        rerender({ value: 'not empty', delay: 500 });
      });

      act(() => {
        jest.advanceTimersByTime(501);
      });

      expect(result.current).toBe('not empty');
    });
  });

  describe('Generic Type Support', () => {
    it('should maintain type safety with strings', () => {
      const { result } = renderHook(() => useDebounce('test', 500));
      const value: string = result.current;
      expect(typeof value).toBe('string');
    });

    it('should maintain type safety with numbers', () => {
      const { result } = renderHook(() => useDebounce(42, 500));
      const value: number = result.current;
      expect(typeof value).toBe('number');
    });

    it('should work with custom types', () => {
      interface CustomType {
        id: number;
        name: string;
      }

      const customObj: CustomType = { id: 1, name: 'test' };
      const { result } = renderHook(() => useDebounce(customObj, 500));

      expect(result.current.id).toBe(1);
      expect(result.current.name).toBe('test');
    });
  });
});
