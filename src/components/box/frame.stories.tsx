import type { Meta, StoryObj } from '@storybook/react';
 
import { Frame } from './frame';
 
//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Frame> = {
  component: Frame,
  title: 'Components/Frame',
};
 
export default meta;
type Story = StoryObj<typeof Frame>;
 
export const Default: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};