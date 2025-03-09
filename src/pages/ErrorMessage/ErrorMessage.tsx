import { FC, ReactElement } from 'react';
import { Link, useRouteError } from 'react-router';

import styles from './error-message.module.scss';

const ErrorMessage: FC = (): ReactElement => {
  const error = useRouteError() as Error;

  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>Error message:</h2>
      <h3 className={styles.error__message}>{error.message}</h3>
      <Link className={styles.error__btn} to="/">
        Home
      </Link>
    </div>
  );
};

export default ErrorMessage;
