import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Error en la aplicación:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            background: '#f8fafc',
            color: '#0f172a',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: '720px',
              width: '100%',
              background: '#ffffff',
              border: '1px solid #fecaca',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
            }}
          >
            <h1 style={{ marginTop: 0, color: '#991b1b' }}>No se pudo cargar el sistema</h1>
            <p>
              La aplicación encontró un error al iniciar. Recargue la página. Si el problema
              continúa, abra la consola del navegador (F12) o reinicie con{' '}
              <strong>npm run dev</strong>.
            </p>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                background: '#fff1f2',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '13px',
              }}
            >
              {String(this.state.error?.message || this.state.error)}
            </pre>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                marginTop: '16px',
                padding: '10px 18px',
                border: 'none',
                borderRadius: '10px',
                background: '#06244d',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Recargar
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
