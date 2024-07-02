import { useContext, useState, createContext, Dispatch, SetStateAction, FC, ReactNode, useMemo, useEffect } from 'react';
import { DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType, ElementComponentType, PositionType } from '../types/types.export';
import { lstElements } from '../assets';
import { addLocalStorage, addUpdateLocalStorage, isEmptyLocalStorage, listLocalStorage } from '../util/LocalStorage.util';

// Types for Drag and Drop
type DragDropProps = (source: DraggableLocation, destination: DraggableLocation) => void;
type RowDropshadowProps = (event: any, destinationIndex: number, sourceIndex: number) => void;
type ColumnDropshadowProps = (event: any, destinationIndex: number, sourceIndex: number) => void;
type RowDropshadow = { marginTop: number; height: number };
type ColDropshadow = { marginLeft: number; height: number };
type DragDropContextProps = {
    handleNewColumn: (newName: string) => void;
    handleRemoveTask: (rowIndex: number, colIndex: number) => void;
    handleDeleteColumn: (colIndex: number) => void;
    handleDragEnd: (result: DropResult) => void;
    handleDragStart: (event: any) => void;
    handleDragUpdate: (event: any) => void;
    rowDropshadowProps: RowDropshadow;
    colDropshadowProps: ColDropshadow;
    columns: ColumnType[];
    setColumns: Dispatch<SetStateAction<ColumnType[]>>;
};

const DragDropContext = createContext<DragDropContextProps | undefined>(undefined);

const getDraggedElement = (draggableId: string) => {
    const queryAttr = 'data-rbd-drag-handle-draggable-id';
    const domQuery = `[${queryAttr}='${draggableId}']`;
    return document.querySelector(domQuery);
};

const getUpdatedChildrenArray = (
    draggedElement: Element,
    destinationIndex: number,
    sourceIndex: number
) => {
    const child: Element[] = [...draggedElement!.parentNode!.children];
    if (destinationIndex === sourceIndex) return child;
    const draggedItem = child[sourceIndex];
    child.splice(sourceIndex, 1);
    child.splice(destinationIndex, 0, draggedItem);
    return child;
};

const getStyle = (
    updatedChildrenArray: Element[],
    destinationIndex: number,
    property: any,
    clientDirection: 'clientHeight' | 'clientWidth'
) =>
    updatedChildrenArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const prop = parseFloat(style[property]);
        return total + curr[clientDirection] + prop;
    }, 0);

const DragDropProvider: FC<{ children: ReactNode; data: ColumnType[] }> = ({ children, data }) => {

    const [columns, setColumns] = useState<ColumnType[]>(data);
    const [lstElementsComponent, setLstElementsComponent] = useState<ElementComponentType[]>((!isEmptyLocalStorage()) ? listLocalStorage() : lstElements);
    const [colDropshadowProps, setColDropshadowProps] = useState<ColDropshadow>({
        marginLeft: 0,
        height: 0,
    });
    const [rowDropshadowProps, setRowDropshadowProps] = useState<RowDropshadow>({
        marginTop: 0,
        height: 0,
    });

    useEffect(() => {
        const handleStorageChange = (event: CustomEvent) => {
            const { key, value } = event.detail;
            alert(`Se ha insertado ${key} en el localStorage con el valor: ${value}`);
        };

        window.addEventListener('localStorageModified', handleStorageChange as EventListener);

        return () => {
            window.removeEventListener('localStorageModified', handleStorageChange as EventListener);
        };
    }, []);

    const moveRowSameColumn: DragDropProps = (source, destination) => {
        setColumns((prev) => {
            const updated = [...prev];
            const column = updated.find(({ id }) => id === source.droppableId);
            if (column) {
                const [removed] = column.tasks.splice(source.index, 1);
                column.tasks.splice(destination.index, 0, removed);
            }
            return updated;
        });
    };

    const moveRowDifferentColumn: DragDropProps = (source, destination) => {
        setColumns((prev) => {
            const updated = [...prev];
            const sourceColumn: any = updated.find(({ id }) => id === source.droppableId);
            const destinationColumn: any = updated.find(({ id }) => id === destination.droppableId);

            const positionColumnFinal = updated.indexOf(destinationColumn);
            const positionColumn = updated.indexOf(sourceColumn);

            const previous_row = source.index;
            const final_row = destination.index;

            if (sourceColumn && destinationColumn) {
                const [removed] = sourceColumn.tasks.splice(source.index, 1);
                destinationColumn.tasks.splice(destination.index, 0, removed);
                setAddNewElementPosition0(previous_row, final_row, positionColumnFinal);
                const positionElement: PositionType = {
                    previous_row,
                    previous_column: positionColumn,
                    final_row,
                    final_column: positionColumnFinal,
                    key: '',
                    label: '',
                    body: null
                }
                setAddElementJson(destination, positionElement);
            }
            return updated;
        });
    };

    const setAddNewElementPosition0 = (indexFilaInicio: number, indexFilainicio: number, position: number) => {
        setColumns((prev) => {
            const updated = [...prev];
            const content = columns[position].tasks[indexFilainicio].content
            const key = columns[position].tasks[indexFilainicio].key

            if (content != undefined) {
                updated[0].tasks.splice(indexFilaInicio, 0, { content, key, id: uuidv4() });
            }
            return updated;
        });
    }

    const setAddElementJson = (destination: DraggableLocation, objectElement: PositionType) => {
        setLstElementsComponent((prev) => {
            const updated = [...prev]
            const lstTemp = [...columns]

            const final_row = objectElement.final_row;
            const final_column = objectElement.final_column;
            const previous_column = objectElement.previous_column;
            const previous_row = objectElement.previous_row;

            const contentElement = lstTemp.find(({ id }) => id === destination.droppableId)
            const nameElement: any = contentElement?.tasks[final_row].key;
            objectElement.key = nameElement;
            updated[final_column].element.splice(final_row, 0, objectElement)

            /* Flujo de control para eliminar el registro cuando es movido */
            if (previous_column !== 0) {
                updated[previous_column].element.splice(previous_row, 1) /* Eliminar el elemento de la columna anterior */
            }
            localStorageInsert(updated, final_row, final_column);
            return updated;
        })
    }

    const handleRowMove: DragDropProps = (source, destination) => {
        if (source.droppableId !== destination.droppableId) {
            moveRowDifferentColumn(source, destination);
        } else {
            moveRowSameColumn(source, destination);
        }
    };

    const handleColumnMove: DragDropProps = (source, destination) => {
        setColumns((prev) => {
            const updated = [...prev];
            const [removed] = updated.splice(source.index, 1);
            updated.splice(destination.index, 0, removed);
            return updated;
        });
    };

    const handleDropshadowRow: RowDropshadowProps = (event, destinationIndex, sourceIndex) => {
        const draggedElement = getDraggedElement(event.draggableId);
        if (!draggedElement) return;
        const { clientHeight } = draggedElement;
        const updatedChildrenArray = getUpdatedChildrenArray(draggedElement, destinationIndex, sourceIndex);
        const marginTop = getStyle(updatedChildrenArray, destinationIndex, 'marginBottom', 'clientHeight');
        setRowDropshadowProps({
            height: clientHeight + 2,
            marginTop: marginTop + 2 * destinationIndex,
        });
    };

    const handleDropshadowColumn: ColumnDropshadowProps = (event, destinationIndex, sourceIndex) => {
        const draggedElement = getDraggedElement(event.draggableId)!.parentNode!.parentNode as Element;
        if (!draggedElement) return;
        const { clientHeight } = draggedElement;
        const updatedChildrenArray = getUpdatedChildrenArray(draggedElement, destinationIndex, sourceIndex);
        const marginLeft = getStyle(updatedChildrenArray, destinationIndex, 'marginRight', 'clientWidth');
        setColDropshadowProps({
            height: clientHeight,
            marginLeft,
        });
    };

    const handleDragUpdate = (event: any) => {
        const { source, destination } = event;
        if (!destination) return;
        if (event.type === 'column') {
            handleDropshadowColumn(event, destination.index, source.index);
        } else {
            handleDropshadowRow(event, destination.index, source.index);
        }
    };

    const handleDragStart = (event: any) => {
        const { index } = event.source;
        if (event.type === 'column') {
            handleDropshadowColumn(event, index, index);
        } else {
            handleDropshadowRow(event, index, index);
        }
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId === 'all-columns') {
            handleColumnMove(source, destination);
        } else {
            handleRowMove(source, destination);
            updateLstElement(source, destination);
        }
    };

    const updateLstElement = (source: DraggableLocation, destination: DraggableLocation) => {
        setLstElementsComponent((prev) => {
            const updated = [...prev]
            const previous_row = source.index; /* Fila anterior */
            const final_row = destination.index; /* Fila actual */

            if (final_row != previous_row) {
                const lstTemp = [...columns]

                const previousColumn: any = lstTemp.find(({ id }) => id === source.droppableId);
                const currentColumn: any = lstTemp.find(({ id }) => id === destination.droppableId);

                const previousColumnFinal = lstTemp.indexOf(previousColumn);
                const positionColumnFinal = lstTemp.indexOf(currentColumn);

                if (updated[positionColumnFinal].element[final_row] !== undefined) {
                    updated[positionColumnFinal].element[final_row].final_column = positionColumnFinal;
                    updated[positionColumnFinal].element[final_row].previous_column = previousColumnFinal;
                    updated[positionColumnFinal].element[final_row].final_row = final_row;
                    updated[positionColumnFinal].element[final_row].previous_row = previous_row;
                    localStorageInsert(updated, final_row, positionColumnFinal);
                }
            }
            return updated;
        })
    }

    const localStorageInsert = (updated: ElementComponentType[], final_row: number, final_column: number) => {
        if (isEmptyLocalStorage()) {
            addLocalStorage(updated);
        } else {
            addUpdateLocalStorage(updated[final_column].element[final_row], final_row, final_column)
        }
    }


    const handleDeleteColumn = (colIndex: number) =>
        setColumns((prev) => prev.filter((_, index) => index !== colIndex));

    const handleRemoveTask = (rowIndex: number, colIndex: number) => {
        setColumns((prev) => {
            const updated = [...prev];
            updated[colIndex].tasks.splice(rowIndex, 1);
            return updated;
        });
    };

    const handleNewColumn = (newName: string) => {
        setColumns((prev) => [
            ...prev,
            { id: uuidv4(), title: newName, tasks: [] },
        ]);
    };

    const contextValue = useMemo(() => ({
        handleNewColumn,
        handleRemoveTask,
        handleDeleteColumn,
        handleDragEnd,
        handleDragStart,
        handleDragUpdate,
        rowDropshadowProps,
        colDropshadowProps,
        columns,
        setColumns,
    }), [
        handleNewColumn,
        handleRemoveTask,
        handleDeleteColumn,
        handleDragEnd,
        handleDragStart,
        handleDragUpdate,
        rowDropshadowProps,
        colDropshadowProps,
        columns,
        setColumns,
    ]);

    return <DragDropContext.Provider value={contextValue}>
        {children}
    </DragDropContext.Provider>
};

export const useDragDrop = () => {
    const context = useContext(DragDropContext);
    if (!context) {
        throw new Error('useDragDrop must be used within a DragDropProvider');
    }
    return context;
};

export default DragDropProvider;