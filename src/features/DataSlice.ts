import { createSlice } from '@reduxjs/toolkit';
import { InputType, structureInput } from '../types/types.export';

export const { actions, reducer } = createSlice({
    name: 'dataSliceInput',
    initialState: structureInput,
    reducers: {
        updateInput: (state: InputType, action) => {
            state.label = action.payload
        },
    },
});

export const { updateInput } = actions;

export default reducer;