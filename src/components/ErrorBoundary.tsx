import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Nikke Modding Wiki:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#090a0f] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#12141c] border border-rose-500/30 p-8 rounded-2xl shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h2 className="font-sans font-bold text-xl text-white">
              Rendering Interrupted
            </h2>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              An unexpected runtime error occurred while rendering the page component:
            </p>

            <pre className="p-3 rounded-lg bg-black/60 text-rose-300 font-mono text-[11px] overflow-x-auto text-left">
              {this.state.error?.message || 'Unknown error'}
            </pre>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

