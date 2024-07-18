import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'size_filter',
    initialState: { filter: 'All' },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    }
})

export default slice.reducer
export const { setFilter } = slice.actions