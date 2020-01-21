import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
// import theme from '/imports/lib/theme'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import AppRouter from '../imports/ui/routes';

const Mount: React.FC = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <AppRouter />
    </ThemeProvider>
  )
}

Meteor.startup(() => {
  render(<Mount />, document.getElementById('react-target'));
});
