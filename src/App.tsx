import React from 'react';
import { Layout } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Header from './layout/Header/Header';
import Sider from './layout/SideBar/Sider';
import Content from './layout/Content/Content';

const generateNavItems = (count: number, prefix = 'Configuracion') => {
   return Array.from({ length: count }, (_, index) => ({
      key: `${prefix}${index + 1}`,
      label: `${prefix} ${index + 1}`,
   }));
};

const generateSubMenuItems = (count: number, prefix = 'formulario') => {
   return Array.from({ length: count }, (_, index) => ({
      key: `${prefix}${index + 1}`,
      icon: React.createElement([UserOutlined, LaptopOutlined, NotificationOutlined][index]),
      label: `${prefix} ${index + 1}`,
      children: generateNavItems(4, `menus ${index * 4 + 1}`),
   }));
};

const App: React.FC = () => {

   const navItems = generateNavItems(4);
   const subMenuItems = generateSubMenuItems(3);

   return (
      <Layout>
         <Header lstHeaderItems={navItems} />
         <Layout>
            <Sider lstSiderItems={subMenuItems} />
            <Content />
         </Layout>
      </Layout>
   );
};

export default App;
