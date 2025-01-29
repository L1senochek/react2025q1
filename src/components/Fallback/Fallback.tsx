import { Component } from 'react';
import './fallback.module.scss';

interface FallbackProps {
  error: Error | null;
  onReset: () => void;
}

type FallbackState = object;

class Fallback extends Component<FallbackProps, FallbackState> {
  private handleReloadClick = (): void => {
    this.props.onReset();
  };

  public render() {
    const { error } = this.props;
    return (
      <div className={'error-boundary'}>
        <h2 className={'error-boundary__title'}>Something went wrong!</h2>
        <p className={'error-boundary__message'}>{error?.message}</p>
        <button onClick={this.handleReloadClick}>Back</button>
      </div>
    );
  }
}

export default Fallback;
