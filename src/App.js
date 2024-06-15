import React from 'react';
import ReactDOM from 'react-dom';
import XState from './XState';

const App = () => {
  return (
    <div>
      <XState />
    </div>
  );
};

export default App;

// Render the App component into the root div
ReactDOM.render(<App />, document.getElementById('root'));
