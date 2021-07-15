import React, { useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NoResultIcon from '../assets/no_result.svg';
import DataLoadingIcon from '../assets/data_loading.svg';

import ResultList from '../components/ResultList';
import { SplashHint } from '../components/SplashHint';

export default {
  title: 'Components/ResultList',
  component: ResultList,
} as ComponentMeta<typeof ResultList>;

const Template: ComponentStory<typeof ResultList> = (args) => <ResultList {...args} />

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  LoadingSplash: <SplashHint Img={<img src={DataLoadingIcon} />} headline="Les données arrivent..." subline="Soyez patient :)" />,
  NoResultSplash: <div>No result found</div>,
}

export const NoResult = Template.bind({});
NoResult.args = {
  Results: [],
  NoResultSplash: <SplashHint Img={<img src={NoResultIcon} />} headline="Aucun résultat..." subline="Peut être avec d'autre mot clef ?" />,
}

export const Results = Template.bind({});
Results.args = {
  Results: ['Banana', 'Lemon', 'Grape'].map(f => <button>{f}</button>)
}