import React from 'react';
import { Layout, Menu, Breadcrumb, theme } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { DragDropProvider, Board } from './components';
import { api } from './assets';
import './styles.css';

const { Header, Content, Sider } = Layout;

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
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const navItems = generateNavItems(4);
   const subMenuItems = generateSubMenuItems(3);

   return (
      <Layout>
         <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
               theme="dark"
               mode="horizontal"
               defaultSelectedKeys={['1']}
               items={navItems}
               style={{ flex: 1, minWidth: 0 }}
            />
         </Header>
         <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
               <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['formulario1']}
                  style={{ height: '100%', borderRight: 0 }}
                  items={subMenuItems}
               />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
               <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>principal</Breadcrumb.Item>
                  <Breadcrumb.Item>generacion</Breadcrumb.Item>
                  <Breadcrumb.Item>formularios</Breadcrumb.Item>
               </Breadcrumb>
               <Content
                  style={{
                     padding: 24,
                     margin: 0,
                     background: colorBgContainer,
                     borderRadius: borderRadiusLG,
                  }}>
                  <div className="App">
                     <DragDropProvider data={api.columns}>
                        <Board />
                     </DragDropProvider>
                  </div>
               </Content>
            </Layout>
         </Layout>
      </Layout>
   );
};

export default App;
