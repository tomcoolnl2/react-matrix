import { describe, it, expect } from 'vitest';
import { render, screen, expect } from '@testing-library/react';
import '@testing-library/jest-dom';

import { App } from './App';

describe('App', () => {
    it('should render the title', () => {
        render(<App />);
        expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    });
});
