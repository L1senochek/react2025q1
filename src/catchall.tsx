import React, { ReactElement, memo } from 'react';

import { NotFound } from '@/pages/NotFound';

const Component: React.FC = (): ReactElement => {
  return <NotFound />;
};

export default memo(Component);
