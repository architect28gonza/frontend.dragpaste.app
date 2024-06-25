import { FC } from 'react'
import { Button, Layout, theme } from 'antd';
import { ContentDiv, ContentLayoutCss } from './Content.styles';
import { Board, DragDropProvider } from '../../components';
import { ContentLogic } from './Content.logic';
const { Content: ContentLayout } = Layout;

const Content: FC = () => {

    const { onClickForm, nameButton, columnsElement } = ContentLogic()
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    return <div style={ContentDiv}>
        <ContentLayout style={ContentLayoutCss(colorBgContainer, borderRadiusLG)}>
            <div className="App">
                <Button type="link" onClick={onClickForm}>{nameButton}</Button>
                <DragDropProvider data={columnsElement}>
                    <Board />
                </DragDropProvider>
            </div>
        </ContentLayout>
    </div>
}

export default Content;