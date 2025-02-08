import { Outlet } from 'react-router';
import { FC, ReactElement } from 'react';

const Layout: FC = (): ReactElement => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
