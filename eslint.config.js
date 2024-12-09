import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import { config as eslintConfig } from 'eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '.next', 'build', 'out'] },  // Add common folders to ignore
  {
    extends: [
      'eslint:recommended', // Use ESLint's recommended rules
      'plugin:react/recommended', // React-specific linting rules
      'plugin:react-hooks/recommended', // React Hooks rules
      'plugin:@typescript-eslint/recommended', // TypeScript specific linting rules
      'plugin:prettier/recommended', // Prettier integration
      ...tseslint.configs.recommended, // TypeScript linting
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module', // Enable module syntax (import/export)
      globals: {
        ...globals.browser, // Global variables for browser environment
        React: 'writable', // React global variable, adjustable
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      prettier,
      '@typescript-eslint': tseslint,
    },
    parser: '@typescript-eslint/parser', // Use TypeScript parser
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // Enable JSX syntax
      },
      project: './tsconfig.json', // Reference your TypeScript configuration
      tsconfigRootDir: __dirname, // Ensure correct project directory resolution
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
        pragma: 'React', // Specify the React pragma if using React.createElement
      },
    },
    rules: {
      // React and Hooks specific rules
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/prop-types': 'off', // Disable PropTypes, since we use TypeScript
      'react/react-in-jsx-scope': 'off', // Next.js doesn't require React in scope
      'react/jsx-uses-react': 'off', // JSX automatically uses React when required

      // TypeScript specific rules
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable requiring return types for functions
      '@typescript-eslint/no-explicit-any': 'warn', // Warn about usage of 'any'
      '@typescript-eslint/ban-ts-comment': 'warn', // Warn about unnecessary ts-comments
      '@typescript-eslint/no-non-null-assertion': 'warn', // Warn about non-null assertion operator

      // Code quality and style
      'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }], // Prettier formatting rules
      'no-console': 'warn', // Warn for console logs (useful in production)
      'no-debugger': 'warn', // Warn for debugger statements
      'eqeqeq': ['error', 'always'], // Ensure strict equality
      'consistent-return': 'error', // Enforce consistent return statements

      // Possible Errors
      'no-throw-literal': 'error', // Disallow throwing literals as exceptions
      'no-unsafe-finally': 'error', // Disallow unsafe 'finally' blocks

      // Performance optimizations
      'no-unused-vars': 'warn', // Warn about unused variables
      '@typescript-eslint/no-unused-vars': ['warn'], // Use TypeScript's linting for unused vars

      // Miscellaneous rules
      'no-magic-numbers': 'warn', // Warn against magic numbers (unexplained numeric values)
      'complexity': ['warn', 10], // Limit complexity of functions/methods
      'max-lines': ['warn', 300], // Warn if file has too many lines

      // React specific best practices
      'react/jsx-key': 'error', // Ensure each JSX element has a key prop
      'react/jsx-no-duplicate-props': 'error', // Prevent duplicate props in JSX
      'react/jsx-uses-vars': 'warn', // Warn about unused variables in JSX
    },
    overrides: [
      {
        files: ['**/*.tsx'], // Apply different settings for TypeScript JSX files
        rules: {
          '@typescript-eslint/explicit-function-return-type': 'warn', // Encourage return types for functions
          'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }], // Only allow JSX in .tsx files
        },
      },
      {
        files: ['**/*.ts'], // Apply specific settings for regular TypeScript files
        rules: {
          '@typescript-eslint/no-var-requires': 'off', // Allow require statements in TypeScript files
        },
      },
    ],
  }
);
