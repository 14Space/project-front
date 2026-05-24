import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return <div style={{color:'red', background:'black', padding: '20px', zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
        <h1>CRASH</h1>
        <pre>{String(this.state.error?.stack || this.state.error)}</pre>
      </div>;
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
