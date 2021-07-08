import React, { useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SearchBar from '../components/SearchBar';
import { AppBar, Box, FormControlLabel, FormGroup, Switch, Toolbar, Typography } from '@material-ui/core';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => {
  const [value, setValue] = useState('');
  return <AppBar>
    <Toolbar>
      <SearchBar
        value={value}
        onChange={e => setValue(e.target.value)}
        onClear={() => setValue('')}
        style={{ width: 'max-width' }}
        {...args} />
    </Toolbar>
  </AppBar>
};

export const WithoutForm = Template.bind({});
WithoutForm.args = {
  placeholder: 'Chercher quelque chose...'
}

export const WithForm = Template.bind({});
WithForm.args = {
  placeholder: 'Chercher quelque chose...',
  FilterForm: <Box p={2}>
    <Typography variant='overline'>Formulaire</Typography>
    <FormGroup row>
      <FormControlLabel
        control={<Switch name="checkedA" />}
        label="Secondary"
      />
    </FormGroup>
    </Box>
}