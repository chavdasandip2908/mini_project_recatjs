import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
    transactions: [],
};

// Action types
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

// Reducer function
const transactionReducer = (state, action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
            };
        case UPDATE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.map((transaction) =>
                    transaction.id === action.payload.id ? action.payload : transaction
                ),
            };
        case DELETE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

// Create context
const TransactionContext = createContext();
// Context Provider component
const TransactionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(transactionReducer, initialState);

    const addTransaction = (transaction) => {
        dispatch({ type: ADD_TRANSACTION, payload: transaction });
    };

    const updateTransaction = (transaction) => {
        dispatch({ type: UPDATE_TRANSACTION, payload: transaction });
    };

    const deleteTransaction = (transactionId) => {
        dispatch({ type: DELETE_TRANSACTION, payload: transactionId });
    };

    return (
        <TransactionContext.Provider
            value={{
                transations: state.transactions,
                addTransaction,
                updateTransaction,
                deleteTransaction,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

// Custom hook to use the context
const useTransaction = () => {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error('useTransaction must be used within a TransactionProvider');
    }
    return context;
};

export { TransactionProvider, useTransaction };