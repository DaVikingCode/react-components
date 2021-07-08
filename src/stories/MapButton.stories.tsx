import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MapButton from '../components/MapButton';
import AppIcon from '../components/AppIcon';

export default {
    title: 'Example/MapButton',
    component: MapButton,
} as ComponentMeta<typeof MapButton>;

const Template: ComponentStory<typeof MapButton> = (args) => <MapButton {...args} />

export const Icon = Template.bind({});
Icon.args = {
    children: <AppIcon name='map'/>,
    tooltip: 'Does nothing'
}