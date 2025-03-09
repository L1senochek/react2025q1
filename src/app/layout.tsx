import React, { PropsWithChildren, ReactElement, memo } from 'react';

import '../App.css';
import '../index.css';

const RootLayout: React.FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default memo(RootLayout);
