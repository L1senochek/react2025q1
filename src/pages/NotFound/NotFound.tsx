import { FC, ReactElement } from 'react';
import Link from 'next/link';

import styles from './not-found.module.css';

const NotFound: FC = (): ReactElement => {
  return (
    <div className={styles['not-found']}>
      <h2 className={styles['not-found__title']}>Page not found!</h2>
      <h2 className={styles['not-found__message']}>404</h2>
      <Link className={styles['not-found__btn']} href="/main?page=1">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
