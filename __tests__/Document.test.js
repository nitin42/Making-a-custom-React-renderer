import React from 'react';
import { Document, Text } from '../src/';
import render from '../src/testRenderer';

it('sanity check', () => {
  expect(render(<Document />)).toMatchSnapshot();
})

it('should render the children type string', () => {
  expect(render(<Document>Hello!</Document>)).toMatchSnapshot();
})

it('should render the children component', () => {
  const App = () => (
    <Document>
      <Text>Hmm...</Text>
    </Document>
  )

  expect(render(<App />)).toMatchSnapshot();
})
