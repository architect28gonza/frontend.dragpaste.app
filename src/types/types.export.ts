export type TaskType = {
    id: any
    key: string
    content: any
}

export type ColumnType = {
    id: string
    title: any
    tasks: TaskType[]
}

export type TaskBoardType = {
    columns: ColumnType[]
}


export type PositionType = {
    previous_row: number
    previous_column: number
    final_row: number
    final_column: number
    name_element: string
}


export type ElementComponentType = {
    title: string
    element: PositionType[]
}