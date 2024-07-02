import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Column from '../Column/Column'
import { useDragDrop } from '../DragDropProvider'
import { ColumnDropshadow } from './Board.styled'
import { Col, Row, Divider } from 'antd'
import { ColumnType } from '../../types/types.export'


const Board: React.FC = () => {
   const { handleDragEnd, handleDragStart, handleDragUpdate, colDropshadowProps, columns } =
      useDragDrop()

   const dividerElement = () => {
      return <Divider type='horizontal' orientation='left' >
         <b style={{ fontSize: 14 }}>CREAR FORMULARIO</b>
      </Divider>
   }

   const firstColumnGrid = (columnContent: ColumnType, columnIndex: number) => <Col className="gutter-row" span={columnIndex === 0 ? 24 : 6}>
      <Column key={columnContent.id} column={columnContent} columnIndex={columnIndex} />
      {columnIndex === 0 ? dividerElement() : null}
   </Col>


   return (
      <DragDropContext
         onDragEnd={handleDragEnd}
         onDragStart={handleDragStart}
         onDragUpdate={handleDragUpdate}
      >
         <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided, snapshot) => (
               <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 10 }}>
                  {columns.map((columnContent, columnIndex) => firstColumnGrid(columnContent, columnIndex))}
                  {provided.placeholder}
                  {snapshot.isDraggingOver && (
                     <ColumnDropshadow
                        marginLeft={colDropshadowProps.marginLeft}
                        height={colDropshadowProps.height}
                     />
                  )}
               </Row>
            )}
         </Droppable>
      </DragDropContext>
   )
}

export default Board