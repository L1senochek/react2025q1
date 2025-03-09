import { FC, ReactElement } from 'react';
import Link from 'next/link';

import styles from './error-message.module.scss';

const ErrorMessage: FC = (): ReactElement => {
  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>Error message:</h2>
      <h3 className={styles.error__message}>{'Test error message'}</h3>
      <Link className={styles.error__btn} href="/">
        Home
      </Link>
    </div>
  );
};

export default ErrorMessage;
