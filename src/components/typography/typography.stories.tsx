import type { Meta, StoryObj } from '@storybook/react';
import { H1, H2, H3, H4, H5, H6, TextVariant } from './Headings';

const meta: Meta<typeof H1> = {
    component: H1,
    title: 'Components/Headings',
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: Object.values(TextVariant),
        },
    },
};

export default meta;
type Story = StoryObj<typeof H1>;

export const Headings: Story = {
    name: 'Headings Primary',
    render: (args) => (
        <div>
            <H1 {...args} text="This is a H1 heading" />
            <H2 {...args} text="This is a H2 heading" />
            <H3 {...args} text="This is a H3 heading" />
            <H4 {...args} text="This is a H4 heading" />
            <H5 {...args} text="This is a H5 heading" />
            <H6 {...args} text="This is a H6 heading" />
        </div>
    ),
};
