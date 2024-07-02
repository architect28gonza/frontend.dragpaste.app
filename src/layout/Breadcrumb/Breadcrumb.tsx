import { Breadcrumb as BreadcrumbLayout } from 'antd';
import { FC } from 'react';
import { BreadcrumbLayoutCss } from './Breadcrumb.styles';
const { Item } = BreadcrumbLayout;

const Breadcrumb: FC = () => {

    return <BreadcrumbLayout style={BreadcrumbLayoutCss}>
        <Item>Principal</Item>
        <Item>Menu</Item>
        <Item>Opciones</Item>
    </BreadcrumbLayout>
}

export default Breadcrumb;