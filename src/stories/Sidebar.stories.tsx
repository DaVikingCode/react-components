import React, { useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Sidebar from '../components/Sidebar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ResultList from '../components/ResultList';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />

export const Default = Template.bind({});
Default.args = {
  open: true,
  title: 'Actuellement sur la carte',
  children: <Box p={2}><Typography>Some data in your sidebar</Typography></Box>,
  onClose: () => console.log('test')
}

export const WithResultList = Template.bind({});
WithResultList.args = {
  open: true,
  title: 'Actuellement sur la carte',
  children: <ResultList loading={false} Results={['Banana', 'Grape', 'Melon'].map(f => <Box p={2}><Typography>{f}</Typography></Box>)} />,
  onClose: () => console.log('test')
}