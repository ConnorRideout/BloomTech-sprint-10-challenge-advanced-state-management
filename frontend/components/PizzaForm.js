import React, { useReducer } from 'react'
import { usePlaceOrderMutation } from '../state/pizzaApi'

const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'
const initialFormState = { // suggested
    fullName: '',
    size: '',
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_INPUT: {
            const { name, type, value, checked } = action.payload
            console.log(name)
            return { ...state, [name]: (type == 'checkbox' ? checked : value) }
        }
        case RESET_FORM:
            return initialFormState
        default:
            return state
    }
}

export default function PizzaForm() {
    const [state, dispatch] = useReducer(reducer, initialFormState)
    const onChange = evt => { dispatch({ type: CHANGE_INPUT, payload: evt.target }) }
    const resetForm = () => { dispatch({ type: RESET_FORM }) }
    const [
        placeOrder,
        {
            error: orderError,
            isLoading: orderLoading
        }
    ] = usePlaceOrderMutation()
    const onSubmit = evt => {
        evt.preventDefault()
        let { fullName, size, '1': top1, '2': top2, '3': top3, '4': top4, '5': top5 } = state
        let toppings = [top1, top2, top3, top4, top5].map((t, idx) => t ? (idx + 1) : '').filter(t => t)
        console.log(toppings)
        let order = { fullName, size, toppings }
        placeOrder(order)
            .unwrap()
            .then(() => {
                resetForm()
            })
            .catch(err => { console.log(err) })
    }
    return (
        <form onSubmit={onSubmit}>
            <h2>Pizza Form</h2>
            {orderLoading && <div className='pending'>Order in progress...</div>}
            {orderError && <div className='failure'>Order failed: {orderError.data.message}</div>}

            <div className="input-group">
                <div>
                    <label htmlFor="fullName">Full Name</label><br />
                    <input
                        data-testid="fullNameInput"
                        id="fullName"
                        name="fullName"
                        placeholder="Type full name"
                        type="text"
                        onChange={onChange}
                        value={state.fullName}
                    />
                </div>
            </div>

            <div className="input-group">
                <div>
                    <label htmlFor="size">Size</label><br />
                    <select
                        data-testid="sizeSelect"
                        id="size"
                        name="size"
                        onChange={onChange}
                        value={state.size}
                    >
                        <option value="">----Choose size----</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                    </select>
                </div>
            </div>

            <div className="input-group">
                <label>
                    <input
                        data-testid="checkPepperoni"
                        name="1"
                        type="checkbox"
                        onChange={onChange}
                        checked={state['1']}
                    />
                    Pepperoni<br /></label>
                <label>
                    <input
                        data-testid="checkGreenpeppers"
                        name="2"
                        type="checkbox"
                        onChange={onChange}
                        checked={state['2']}
                    />
                    Green Peppers<br /></label>
                <label>
                    <input
                        data-testid="checkPineapple"
                        name="3"
                        type="checkbox"
                        onChange={onChange}
                        checked={state['3']}
                    />
                    Pineapple<br /></label>
                <label>
                    <input
                        data-testid="checkMushrooms"
                        name="4"
                        type="checkbox"
                        onChange={onChange}
                        checked={state['4']}
                    />
                    Mushrooms<br /></label>
                <label>
                    <input
                        data-testid="checkHam"
                        name="5"
                        type="checkbox"
                        onChange={onChange}
                        checked={state['5']}
                    />
                    Ham<br /></label>
            </div>
            <input
                data-testid="submit"
                type="submit"
            />
        </form>
    )
}
