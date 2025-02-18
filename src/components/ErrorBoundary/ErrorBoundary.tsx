import { Component } from 'react';

import {
  IErrorBoundaryProps,
  IErrorBoundaryState,
} from '@/model/ErrorBoundary';
import { ErrorBoundaryFallback } from '@/pages/Fallback';

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  private resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          onReset={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
