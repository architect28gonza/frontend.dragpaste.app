import { FC } from 'react'
import { Layout, Menu } from 'antd';
import { HeaderLayoutCss, HeaderMenuCss, ImgStyleHeader } from './Header.styles';
import imgAvatar from '../../assets/images/img-avatar.svg'

const { Header: HeaderLayout } = Layout;

const Header: FC<HeaderListType> = ({ lstHeaderItems }) => {

    return (
        <HeaderLayout style={HeaderLayoutCss}>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={lstHeaderItems}
                style={HeaderMenuCss}
            />
            <img src={imgAvatar} className='img-fluid' style={ImgStyleHeader} alt="img-header" />
        </HeaderLayout>
    );
}

export default Header;