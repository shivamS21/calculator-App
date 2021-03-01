import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Splash from '../Splash';

it('checking test once again',()=>{
    const home = renderer.create(<Splash/>).toJSON();
    expect(home).toMatchSnapshot();
})