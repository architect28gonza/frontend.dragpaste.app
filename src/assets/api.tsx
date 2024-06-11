import { v4 } from 'uuid'
import { ElementComponentType, TaskBoardType } from '../types/types.export'
import { InputText } from '../components/Inputs/Inputs'
import { InputDate } from '../components/Inputs/Date'
import { ILabel } from '../components/Inputs/Label'
import InNumber from '../components/Inputs/Number'
import InSwitch from '../components/Inputs/Switch'
import InCheckbox from '../components/Inputs/Checkbox'
import InTimer from '../components/Inputs/Timer'
import InRadio from '../components/Inputs/Radio'
import InUploadOut from '../components/Inputs/Upload'
import InSelect from '../components/Inputs/Select'
import InPassword from '../components/Inputs/Password'
import InTextArea from '../components/Inputs/TextArea'
import InputLevel from '../components/Inputs/InputLevel'

export const api: TaskBoardType = {
   columns: [
      {
         id: v4(),
         title: <span><b>COMPONENTES PARA CREAR FORMULARIO</b></span>,
         tasks: [
            { content: <InputText />, id: v4() },
            { content: <InPassword />, id: v4() },
            { content: <InputDate />, id: v4() },
            { content: <InNumber />, id: v4() },
            { content: <InTimer />, id: v4() },
            { content: <InSelect />, id: v4() },
            { content: <InputLevel />, id: v4() },
            { content: <InUploadOut />, id: v4() },
            { content: <InTextArea />, id: v4() },
            { content: <InCheckbox />, id: v4() },
            { content: <InRadio />, id: v4() },
            { content: <ILabel />, id: v4() },
            { content: <InSwitch />, id: v4() },
         ],
      },
      {
         id: v4(),
         title: '',
         tasks: [

         ],
      },
      {
         id: v4(),
         title: '',
         tasks: [

         ],
      },
      {
         id: v4(),
         title: '',
         tasks: [

         ],
      },
      {
         id: v4(),
         title: '',
         tasks: [

         ],
      }
   ],
}


export const lstElements: ElementComponentType[] = [
   {
      title: 'columna_0',
      element: [

      ],
   },
   {
      title: 'columna_1',
      element: [

      ],
   },
   {
      title: 'columna_2',
      element: [

      ],
   },
   {
      title: 'columna_3',
      element: [

      ],
   },
   {
      title: 'columna_4',
      element: [

      ],
   }
]
