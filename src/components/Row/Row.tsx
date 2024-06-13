import React from 'react'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { TaskType } from '../../types/types.export'


const Container = styled.div`
   text-align : left
   border-radius: 4px;
   width: 100%;
   border-radius : 10px;
   padding: 3px;
`

type Props = {
   task: TaskType
   index: number
}

const Row: React.FC<Props> = ({ task, index }) => (
   <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided) => (
         <Container
            id={`row_${index}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            {/* {(typeof task.content === 'function') ? task.content() : task.content} */}
            {task.content}

         </Container>
      )}
   </Draggable>
)

export default Row
