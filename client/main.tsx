import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
// import theme from '/imports/lib/theme'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import AppRouter from '/imports/ui/routes';
import * as serviceWorker from '/imports/ui/serviceWorker'

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


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
