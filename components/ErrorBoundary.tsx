'use client';

import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: 'var(--bg)' }} className="min-h-[50vh] flex items-center justify-center py-20 px-4">
          <div className="drk-card max-w-lg text-center">
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Ein Fehler ist aufgetreten
            </h2>
            <p className="mb-4" style={{ color: 'var(--text-light)' }}>
              Bitte laden Sie die Seite neu. Falls das Problem bestehen bleibt, löschen Sie die Browserdaten für diese Seite.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="drk-btn-primary"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
