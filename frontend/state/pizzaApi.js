import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza' }),
    tagTypes: ['Pizzas'],
    endpoints: build => ({
        getPizzaHistory: build.query({
            query: () => 'history',
            providesTags: ['Pizzas']
        }),
        placeOrder: build.mutation({
            query: order => ({
                url: 'order',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Pizzas']
        })
    })
})

export const {
    useGetPizzaHistoryQuery,
    usePlaceOrderMutation
} = pizzaApi