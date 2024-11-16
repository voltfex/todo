import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';

const Layout = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
