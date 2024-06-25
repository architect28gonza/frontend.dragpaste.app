import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Button, theme } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { DragDropProvider, Board } from './components';
import { api } from './assets';
import '../public/css/styles.css';
import { ColumnType, ElementComponentType } from './types/types.export';
import { listLocalStorage } from './local.storage';
import { v4 } from 'uuid';

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

   const [columnsElement, setColumnsElement] = useState<ColumnType[]>(api.columns);

   const onClickForm = () => {
      const elements: ElementComponentType[] = listLocalStorage();
      setUpdateElementView(elements);
   };

   const setUpdateElementView = (elements: ElementComponentType[]) => {
      const updateColumns = (prevColumns: ColumnType[]) => {
         const updatedColumns = [...prevColumns];
         elements.forEach(item => updateColumnsForItem(item, updatedColumns));
         return updatedColumns;
      };

      const updateColumnsForItem = (item: ElementComponentType, updatedColumns: ColumnType[]) => {
         const filas = item.element;
         if (filas.length !== 0) {
            filas.forEach(elementItem => {
               if (elementItem !== null) {
                  updateColumnTasks(elementItem, updatedColumns);
               }
            });
         }
      };

      const updatedContent = (props: any, propsComponent: any, element: any) => element.content({ ...props, propsComponent });

      const updateColumnTasks = (elementItem: any, updatedColumns: ColumnType[]) => {
         const { final_column, final_row, key, label, body } = elementItem;
         updatedColumns[0].tasks.forEach(element => {
            if (key === element.key) {
               const propsComponent = {
                  label: { value: label },
                  body: { value: body },
                  row: final_row,
                  column: final_column
               };
               const updatedElement = {
                  ...element,
                  id: v4(),
                  content: (props:any) => updatedContent(props, propsComponent, element) 
               };
               updatedColumns[final_column].tasks.splice(final_row, 0, updatedElement);
            }
         });
      };
      setColumnsElement(prevColumns => updateColumns(prevColumns));
   };


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
                     <Button type="link" onClick={onClickForm}>Recuperar formulario</Button>
                     <DragDropProvider data={columnsElement}>
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
