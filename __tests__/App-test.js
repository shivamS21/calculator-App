/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  const home = renderer.create(<App />).toJSON();
  expect(home).toMatchSnapshot();
  // console.log(home);
});
