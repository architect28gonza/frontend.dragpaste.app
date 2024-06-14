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
    key: string,
    label: string
    body: any
}

export type ElementComponentType = {
    title: string
    element: PositionType[]
}

export type InputType = {
    label: string
}

export interface PropsIGeneric {
    propsComponent?: {
        label: {
            value: string;
        };
        body: any;
        row: number;
        column: number;
    };
}

export interface PositionElementI {
    row: number;
    column: number;
}