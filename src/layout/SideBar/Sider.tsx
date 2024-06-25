import { Menu, Layout, theme } from 'antd';
import { FC } from 'react'
import { FlexContainer, MenuLayoutCss, SiderLayoutCss } from './Sider.styles';

import imgHeader from '../../assets/images/img-header.png'

const { Sider: SiderLayout } = Layout;

const Sider: FC<SiderListType> = ({ lstSiderItems }) => {
    const { token: { colorBgContainer } } = theme.useToken();

    return <SiderLayout width={240} style={SiderLayoutCss(colorBgContainer)}>
        <div className='container-img-header' style={FlexContainer}>
            <img src={imgHeader} className='img-fluid' style={{width: '55%'}} alt="img-sider" />
        </div>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1', '2']}
            defaultOpenKeys={['formulario1']}
            style={MenuLayoutCss}
            items={lstSiderItems}
        />
    </SiderLayout>
}
export default Sider;