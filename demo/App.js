import React, { Component } from 'react';

import { Document, Text, render } from '../src';

class App extends Component {
  render() {
    return (
      <Document>
        <Text>Hell yeah! The new renderer api is working.</Text>
        <Text>
          Congrats! You've successfully completed the tutorial. I'm excited to
          see what you build
        </Text>
        <Text>Hell yeah! The new renderer api is working.</Text>
        <Text>
          Congrats! You've successfully completed the tutorial. I'm excited to
          see what you build
        </Text>
      </Document>
    );
  }
}

// This will create a file 'text.docx' in the current directory!
render(<App />, `${__dirname}/text.docx`);
