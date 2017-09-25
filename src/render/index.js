import fs from 'fs';
import path from 'path';
import createElement from '../utils/createElement';
import WordRenderer from '../reconciler/';
import parse from '../parse/';

// Renders the input component
async function render(element, filePath) {
  // Create root container instance
  const container = createElement('ROOT');

  // Returns the current fiber (flushed fiber)
  const node = WordRenderer.createContainer(container);
  
  // Schedules a top level update with current fiber and a priority level (depending upon the context)
  WordRenderer.updateContainer(element, node, null);

  // Parse the input component and return the output
  const output = await parse(container).toBuffer();

  // Officegen generates a output stream and not a file
  const stream = fs.createWriteStream(filePath);

  await new Promise((resolve, reject) => {
    // Generate a word document
    output.doc.generate(stream, Events(filePath, resolve, reject));
  });
}

// Handle docx events (optional)
function Events(filePath, resolve, reject) {
  return {
    finalize: () => {
      console.log(`✨  Word document created at ${path.resolve(filePath)}.`);
      resolve();
    },
    error: () => {
      console.log('An error occurred while generating the document.');
      reject();
    },
  };
}

export default render;
