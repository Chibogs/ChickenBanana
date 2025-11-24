import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h1>🚨 Oops! Something went wrong</h1>
            <h2>We encountered an unexpected error</h2>
            <p>
              We're sorry for the inconvenience. The game encountered an error and couldn't continue.
            </p>
            
            <div className="error-actions">
              <button 
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                🔄 Reload Game
              </button>
              
              <button 
                className="home-button"
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                  window.location.hash = '';
                }}
              >
                🏠 Start Over
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="error-details">
                <summary>Technical Details (Development Only)</summary>
                <pre className="error-stack">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>

          <style jsx>{`
            .error-boundary {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: radial-gradient(ellipse at center, #1a0033 0%, #0d001a 50%, #000000 100%);
              color: #ffffff;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              padding: 2rem;
            }

            .error-content {
              text-align: center;
              max-width: 600px;
              background: rgba(255, 255, 255, 0.05);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 215, 0, 0.3);
              border-radius: 16px;
              padding: 3rem;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }

            .error-content h1 {
              font-size: 2.5rem;
              margin-bottom: 1rem;
              background: linear-gradient(45deg, #ff6b6b, #ee5a24);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }

            .error-content h2 {
              font-size: 1.5rem;
              color: #ffd700;
              margin-bottom: 1rem;
            }

            .error-content p {
              font-size: 1.1rem;
              color: #cccccc;
              margin-bottom: 2rem;
              line-height: 1.6;
            }

            .error-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              flex-wrap: wrap;
              margin-bottom: 2rem;
            }

            .retry-button,
            .home-button {
              padding: 0.75rem 1.5rem;
              border: none;
              border-radius: 12px;
              font-size: 1rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              min-width: 140px;
            }

            .retry-button {
              background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
              color: white;
            }

            .home-button {
              background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
              color: white;
            }

            .retry-button:hover,
            .home-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            }

            .error-details {
              text-align: left;
              margin-top: 2rem;
              padding: 1rem;
              background: rgba(0, 0, 0, 0.3);
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .error-details summary {
              cursor: pointer;
              color: #ffd700;
              font-weight: 600;
              margin-bottom: 1rem;
            }

            .error-stack {
              font-family: 'Courier New', monospace;
              font-size: 0.85rem;
              color: #ff6b6b;
              white-space: pre-wrap;
              overflow-x: auto;
            }

            @media (max-width: 768px) {
              .error-content {
                padding: 2rem 1.5rem;
              }

              .error-content h1 {
                font-size: 2rem;
              }

              .error-actions {
                flex-direction: column;
              }

              .retry-button,
              .home-button {
                width: 100%;
              }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
