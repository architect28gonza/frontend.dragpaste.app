import { FC, createElement, lazy, Suspense } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// import { Layout } from 'antd';
// import Header from './layout/Header/Header';
// import Sider from './layout/SideBar/Sider';
// import Content from './layout/Content/Content';
// import Login from './pages/LoginPage/Login';

const generateNavItems = (count: number, prefix = 'Configuracion') => {
   return Array.from({ length: count }, (_, index) => ({
      key: `${prefix}${index + 1}`,
      label: `${prefix} ${index + 1}`,
   }));
};

const generateSubMenuItems = (count: number, prefix = 'formulario') => {
   return Array.from({ length: count }, (_, index) => ({
      key: `${prefix}${index + 1}`,
      icon: createElement([UserOutlined, LaptopOutlined, NotificationOutlined][index]),
      label: `${prefix} ${index + 1}`,
      children: generateNavItems(4, `menus ${index * 4 + 1}`),
   }));
};

const Login = lazy(() => import('./pages/LoginPage/Login'));

const App: FC = () => {

   const navItems = generateNavItems(4);
   const subMenuItems = generateSubMenuItems(3);

   return (
      // <Layout>
      //    <Header lstHeaderItems={navItems} />
      //    <Layout>
      //       <Sider lstSiderItems={subMenuItems} />
      //       <Content />
      //    </Layout>
      // </Layout>
      <Suspense fallback={<div>Cargando vista de login, Espere un momento</div>}>
         <Login />
      </Suspense>

   );
};

export default App;
