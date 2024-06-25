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
import InSwitch from '../components/Inputs/Switch'

export const api: TaskBoardType = {
   columns: [
      {
         id: v4(),
         title: <span><b>COMPONENTES PARA CREAR FORMULARIO</b></span>,
         tasks: [
            { id: v4(), key: 'input:text', content: (props: any) => <InInputText {...props} /> },
            { id: v4(), key: 'input:password', content: (props: any) => <InPassword {...props} /> },
            { id: v4(), key: 'input:date', content: (props: any) => <InInputDate {...props} /> },
            { id: v4(), key: 'input:number', content: (props: any) => <InNumber {...props} /> },
            { id: v4(), key: 'input:timer', content: (props: any) => <InTimer {...props} /> },
            { id: v4(), key: 'input:select', content: (props: any) => <InSelect {...props} /> },
            { id: v4(), key: 'input:level', content: (props: any) => <InputLevel {...props} /> },
            { id: v4(), key: 'input:upload', content: (props: any) => <InUploadOut {...props} /> },
            { id: v4(), key: 'input:textarea', content: (props: any) => <InTextArea {...props} /> },
            { id: v4(), key: 'input:checkbox', content: (props: any) => <InCheckbox {...props} /> },
            { id: v4(), key: 'input:radio', content: (props: any) => <InRadio {...props} /> },
            { id: v4(), key: 'input:switch', content: (props: any) => <InSwitch {...props} /> }
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
