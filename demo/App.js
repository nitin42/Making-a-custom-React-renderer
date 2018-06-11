import React, { Component } from 'react';

import { Text, render } from '../src';

class App extends Component {
	render() {
		return <Text>Congrats! You've successfully completed the tutorial. I'm excited to see what you build</Text>;
	}
}

// This will create a file 'text.docx' in the current directory!
render(<App />, `${__dirname}/text.docx`);
