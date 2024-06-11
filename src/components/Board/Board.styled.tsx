import styled from 'styled-components'


export const Container = styled.div<{ isDragging?: boolean }>`
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   justify-content: flex-start;
   align-items: flex-start;
   position: relative;
   width: 100%;
   height: 100vh;
   margin-top: 10px;
   overflow-x: hidden;
   overflow-y: hidden;
   white-space: nowrap;
   box-sizing: border-box;
   padding: 10px 20px;
   ${({ isDragging }) => isDragging && 'opacity: 0.6;'}
`;


type DropshadowProps = {
   height: number
}

export const Dropshadow = styled.div<DropshadowProps>`
   border-radius: 3px;
   background-color: #ddd;
   width: 302px;
   height: ${({ height }) => height}px;
   z-index: 1;
`

type ColumnDropshadowProps = {
   marginLeft: number
}

export const ColumnDropshadow = styled(Dropshadow) <ColumnDropshadowProps>`
   margin-left: ${({ marginLeft }) => marginLeft - 1}px;
   position: absolute;
`
