import React from 'react';
import { Text } from '../src/';
import render from '../src/testRenderer';

it('sanity check', () => {
  const App = () => (
    <Text>Hello World!</Text>
  )
  expect(render(<App />)).toMatchSnapshot();
});

it('should render the children', () => {
  const App = () => (
    <Text>
      Hello ! This is a test for rendering the children!
    </Text>
  )

  expect(render(<App />)).toMatchSnapshot();
});
