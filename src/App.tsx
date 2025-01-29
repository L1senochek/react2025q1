import { Component } from 'react';
import './App.css';

type AppProps = object;
type AppState = object;

class App extends Component<AppProps, AppState> {
  render() {
    if (Math.random() > 0.9) throw new Error('new error');

    return (
      <>
        <div>App</div>
      </>
    );
  }
}

export default App;
