// App.jsx - Main application component
import React from 'react';
import Button from './components/Button';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  const handleDangerClick = () => {
    // This will throw an error to demonstrate the error boundary
    throw new Error('This is a test error!');
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <header>
          <h1>MERN-BUG-TRACKER Bug Tracking Application</h1>
          <p>A comprehensive bug tracking solution built with the MERN stack</p>
        </header>
        
        <main>
          <section>
            <h2>Button Examples</h2>
            <div className="button-examples">
              <Button onClick={handleButtonClick}>
                Primary Button
              </Button>
              
              <Button variant="secondary" onClick={handleButtonClick}>
                Secondary Button
              </Button>
              
              <Button variant="danger" onClick={handleDangerClick}>
                Danger Button (Will Error)
              </Button>
              
              <Button size="sm" onClick={handleButtonClick}>
                Small Button
              </Button>
              
              <Button size="lg" onClick={handleButtonClick}>
                Large Button
              </Button>
              
              <Button disabled onClick={handleButtonClick}>
                Disabled Button
              </Button>
            </div>
          </section>
          
          <section>
            <h2>Bug Reports</h2>
            <div data-testid="posts-list">
              <div data-testid="post-item" className="post-item">
                <h3>Sample Post Title</h3>
                <p>This is a sample post content...</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;