import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Property {
    id: string;
    title: string;
    price: number;
}

interface PropertyState {
    properties: Property[];
}

const initialState: PropertyState = {
    properties: [],
}

const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {
        setProperties: (state, action: PayloadAction<Property[]>) => {
            state.properties = action.payload;
        },
        addProperty: (state, action: PayloadAction<Property>) => {
            state.properties.push(action.payload)
        }
    },
});

export const { setProperties, addProperty } = propertySlice.actions
export default propertySlice.reducer