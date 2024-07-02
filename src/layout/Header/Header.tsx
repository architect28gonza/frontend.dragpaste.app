import { FC, useState } from 'react'
import { Layout, Menu, Popover } from 'antd';
import { HeaderLayoutCss, HeaderMenuCss, ImgStyleHeader } from './Header.styles';
import imgAvatar from '../../assets/images/img-avatar.svg'

const { Header: HeaderLayout } = Layout;

const Header: FC<HeaderListType> = ({ lstHeaderItems }) => {

    const [username, setUsername] = useState<string>("Usuario/a")

    const getButtonSignOff = () => {
        return <div className='container-img-avatar mt-1'>
            <span className='text-white m-4'>Bienvenido {username} </span>
            <Popover
                placement="bottomRight"
                trigger="click"
                content={<>template cerrar</>}>
                <img src={imgAvatar} className='img-fluid'
                    style={ImgStyleHeader} alt="img-header" />
            </Popover>
        </div>
    }

    return (
        <HeaderLayout style={HeaderLayoutCss}>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={lstHeaderItems}
                style={HeaderMenuCss}
            />
            {getButtonSignOff()}
        </HeaderLayout>
    );
}

export default Header;