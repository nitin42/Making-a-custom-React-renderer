import React, { Component } from 'react';

import { Document, Text, render } from '../build';

class App extends Component {
  render () {
    return (
      <Document>
        <Text>Congrats! You've successfully completed the tutorial. I'm excited to see what you build</Text>
      </Document>
    );
  }
}

// This will create a file 'text.docx' in the current directory!
render(<App />, `${__dirname}/text.docx`);