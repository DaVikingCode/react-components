import React, { useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResultList from '../components/ResultList';

export default {
  title: 'Components/ResultList',
  component: ResultList,
} as ComponentMeta<typeof ResultList>;

const Template: ComponentStory<typeof ResultList> = (args) => <ResultList {...args} />

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
}

export const NoResult = Template.bind({});
NoResult.args = {
  Results: []
}

export const Results = Template.bind({});
Results.args = {
  Results: ['Banana', 'Lemon', 'Grape'].map(f => <div>{f}</div>)
}