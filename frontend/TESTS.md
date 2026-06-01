# Frontend Tests Documentation

## Setup

### Install Dependencies

```bash
npm install
```

This will install all testing dependencies including:

- **jest** - Testing framework
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom jest matchers for DOM assertions
- **ts-jest** - TypeScript support for Jest

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run tests with coverage report

```bash
npm run test:coverage
```

## Test Coverage

### AppTitle Component Tests

Located in: `src/components/AppTitle/AppTitle.test.tsx`

#### Test Groups

1. **Rendering (3 tests)**
   - Component renders without crashing
   - Renders an h1 element
   - Renders correct title text

2. **Version Display (3 tests)**
   - Displays correct version number (v0.1.2)
   - Version element has 'version' class
   - Version is positioned as superscript

3. **DOM Structure (4 tests)**
   - Correct hierarchy: h1 > sup
   - Contains text content in h1
   - Only one h1 element
   - Only one sup element

4. **Accessibility (3 tests)**
   - Semantic heading structure
   - Heading is visible and queryable
   - Text content is readable

5. **Styling (2 tests)**
   - Version element has correct class
   - h1 renders with proper styling

6. **Component Props (2 tests)**
   - Is a valid React.FC component
   - Does not require any props

7. **Content Verification (3 tests)**
   - Displays "Todo List" as main text
   - Version starts with "v"
   - Complete text is correct

**Total: 20 comprehensive tests**

## Test Statistics

- **Test file**: `src/components/AppTitle/AppTitle.test.tsx`
- **Total tests**: 20
- **Coverage**: Rendering, DOM structure, accessibility, styling, props, content

## Configuration Files

- **jest.config.js** - Jest configuration
- **src/setupTests.ts** - Jest setup and global test utilities

## Adding New Tests

When adding new components, follow this pattern:

1. Create a `ComponentName.test.tsx` file next to your component
2. Import testing utilities:

   ```typescript
   import { render, screen } from "@testing-library/react";
   import "@testing-library/jest-dom";
   ```

3. Write tests using describe and it blocks:
   ```typescript
   describe('ComponentName', () => {
     it('should render', () => {
       render(<ComponentName />);
       // assertions
     });
   });
   ```

## Best Practices

- Use semantic queries when possible (`getByRole`, `getByLabelText`)
- Test user behavior, not implementation details
- Group related tests with `describe` blocks
- Use meaningful test descriptions
- Test accessibility features
- Keep tests focused and isolated

## Troubleshooting

### Tests not found

Ensure test files end with `.test.tsx` or `.test.ts` and are in `src/` directory.

### Import errors

Run `npm install` to ensure all dependencies are installed.

### CSS import errors

Jest is configured to mock CSS imports. Check `jest.config.js` if issues persist.
