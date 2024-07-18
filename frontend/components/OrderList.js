import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetPizzaHistoryQuery } from '../state/pizzaApi'
import { setFilter } from '../state/sizeFilterSlice'

export default function OrderList() {
    const { data: orders } = useGetPizzaHistoryQuery()
    const getLenStr = topsCt => {
        let num = topsCt == 0 ? 'no' : topsCt
        return `${num} topping${topsCt == 1 ? '' : 's'}`
    }
    const sizeFilter = useSelector(st => st.filter.filter)
    const dispatch = useDispatch()
    return (
        <div id="orderList">
            <h2>Pizza Orders</h2>
            <ol>
                {
                    orders?.filter(({ size }) => sizeFilter == 'All' || size == sizeFilter)
                        .map(({ id, customer, size, toppings }) => {
                            return (
                                <li key={id}>
                                    <div>
                                        {`${customer} ordered a size ${size} with ${getLenStr(toppings?.length || 0)}`}
                                    </div>
                                </li>
                            )
                        })
                }
            </ol>
            <div id="sizeFilters">
                Filter by size:
                {
                    ['All', 'S', 'M', 'L'].map(size => {
                        const className = `button-filter${size === sizeFilter ? ' active' : ''}`
                        return <button
                            data-testid={`filterBtn${size}`}
                            className={className}
                            key={size}
                            onClick={() => {
                                const action = setFilter(size)
                                dispatch(action)
                            }}
                        >{size}</button>
                    })
                }
            </div>
        </div>
    )
}
