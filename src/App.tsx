import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import ChatInterface from './components/ChatInterface';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

// Import the generated config (created after deployment)
try {
  const outputs = require('../amplify_outputs.json');
  Amplify.configure(outputs);
} catch (error) {
  console.log('Amplify config not found - using demo mode');
}

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <header className="App-header">
            <div className="header-content">
              <h1>TechCorp AI Assistant</h1>
              <div className="user-info">
                <span>Welcome, {user?.username || 'User'}</span>
                <button onClick={signOut} className="sign-out-btn">
                  Sign Out
                </button>
              </div>
            </div>
          </header>
          <main className="App-main">
            <ChatInterface />
          </main>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
