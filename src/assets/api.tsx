import { v4 } from 'uuid'
import { ElementComponentType, TaskBoardType } from '../types/types.export'

import InInputText from '../components/Inputs/Inputs'
import InPassword from '../components/Inputs/Password'
import InInputDate from '../components/Inputs/Date'
import InNumber from '../components/Inputs/Number'
import InTimer from '../components/Inputs/Timer'
import InSelect from '../components/Inputs/Select'
import InputLevel from '../components/Inputs/InputLevel'
import InUploadOut from '../components/Inputs/Upload'
import InTextArea from '../components/Inputs/TextArea'
import InCheckbox from '../components/Inputs/Checkbox'
import InRadio from '../components/Inputs/Radio'
import InLabel from '../components/Inputs/Label'
import InSwitch from '../components/Inputs/Switch'


export const api: TaskBoardType = {
   columns: [
      {
         id: v4(),
         title: <span><b>COMPONENTES PARA CREAR FORMULARIO</b></span>,
         tasks: [
            // { id: v4(), key: 'input:text', content: () => <InInputText /> },
            { id: v4(), key: 'input:password', content: <InInputText /> },
            { id: v4(), key: 'input:password', content: <InPassword /> },
            { id: v4(), key: 'input:date', content: <InInputDate /> },
            { id: v4(), key: 'input:number', content: <InNumber /> },
            { id: v4(), key: 'input:timer', content: <InTimer /> },
            { id: v4(), key: 'input:select', content: <InSelect /> },
            { id: v4(), key: 'input:level', content: <InputLevel /> },
            { id: v4(), key: 'input:upload', content: <InUploadOut /> },
            { id: v4(), key: 'input:textarea', content: <InTextArea /> },
            { id: v4(), key: 'input:checkbox', content: <InCheckbox /> },
            { id: v4(), key: 'input:radio', content: <InRadio /> },
            { id: v4(), key: 'input:label', content: <InLabel /> },
            { id: v4(), key: 'input:switch', content: <InSwitch /> }
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
