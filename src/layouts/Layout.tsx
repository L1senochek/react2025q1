import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router';

const Layout: FC = (): ReactElement => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
