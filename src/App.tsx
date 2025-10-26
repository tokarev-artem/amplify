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
            <div className="content-container">
              <div className="info-section">
                <h2>About TechCorp</h2>
                <p>We're a leading technology company specializing in cloud solutions and AI-powered applications. Our AI assistant can help you with:</p>
                <ul>
                  <li>Information about our services</li>
                  <li>Business hours and contact details</li>
                  <li>Technical capabilities and pricing</li>
                  <li>General questions about our company</li>
                </ul>
              </div>
              <div className="chat-section">
                <ChatInterface />
              </div>
            </div>
          </main>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
