import React from 'react';
import { themes } from '@storybook/theming';
import { type Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
    parameters: {
        docs: {
            theme: themes.dark,
        },
        darkMode: {
            current: 'dark',
        },
        backgrounds: {
            default: 'dark',
            values: [
                {
                    name: 'dark',
                },
            ],
        },
    },
};

export default preview;
