import { ErrorBoundary } from 'react-error-boundary'
import { Error } from './components/Error'
import { Home } from './views/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ErrorBoundary FallbackComponent={Error}>
          <Home />
        </ErrorBoundary>
      </header>
    </div>
  );
}

export default App;
