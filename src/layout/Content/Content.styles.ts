
export const ContentLayoutCss = (color: any, border: any) => {
    return {
        padding: 24,
        margin: 0,
        background: color,
        borderRadius: border
    }
}

export const ContentDiv: React.CSSProperties = {
    overflowY: 'scroll',
    overflowX: 'hidden',
    width: '100%',
    height: '93vh',
    margin: 20
}