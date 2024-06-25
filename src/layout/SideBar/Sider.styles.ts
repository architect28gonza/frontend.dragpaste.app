import React from "react";


export const SiderLayoutCss = (colorBgContainer: any) => {
    return {
        background: colorBgContainer,
        height: '100vh',
        overflow: 'auto'
    };
};

export const MenuLayoutCss = { height: '100vh', borderRight: 0 };

export const FlexContainer: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#001529'
}