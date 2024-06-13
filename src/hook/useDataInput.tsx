import { ChangeEvent, useState } from 'react';
import { InputType } from '../types/types.export';
import { updateInput } from '../features/DataSlice';
import { useDispatch } from 'react-redux';

export function useDataInputForm(): [
    InputType,
    handlerLabel: (e: ChangeEvent<HTMLInputElement>) => void,
    handlerSet: (name: string, value: any) => void
] {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState<InputType>({
        label: 'Texto label'
    });

    const handlerLabel = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value.toUpperCase();
        const name: string = e.target.name;
        handlerSet(name, value)
        dispatch(updateInput(value))
    }

    const handlerSet = (name: string, value: any): void => {
        setInputs(inputs => ({
            ...inputs,
            [name]: value,
        }));
    }


    return [inputs, handlerLabel, handlerSet];
}