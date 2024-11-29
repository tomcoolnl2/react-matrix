import type { Meta, StoryObj } from '@storybook/react';
import { Stripes, StripesVariant, ColorVariant } from './stripes';

const meta: Meta<typeof Stripes> = {
  component: Stripes,
  title: 'Components/Stripes',
  argTypes: {
    amount: {
      control: { type: 'number', min: 1, max: 18, step: 1 },
    },
    size: {
      options: ['xs', 's', 'm'],
      control: { type: 'select' },
    },
    variant: {
      options: Object.values(StripesVariant),
      control: { type: 'select' },
    },
    color: {
      options: Object.values(ColorVariant),
      control: { type: 'select' },
    },
    gradient: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stripes>;

export const Default: Story = {
  args: {
    amount: 15,
    size: 'm',
    variant: StripesVariant.STRAIGHT,
    color: ColorVariant.PRIMARY,
    gradient: false,
  },
};