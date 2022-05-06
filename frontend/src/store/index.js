import { configureStore } from "@reduxjs/toolkit"
import { AuthSlice } from "./auth-slice"

const Store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
    }
})

export default Store;