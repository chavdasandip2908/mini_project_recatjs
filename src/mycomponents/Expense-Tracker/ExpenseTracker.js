import React from 'react'

//import TransationProvider
import { TransactionProvider } from './context/GlobalState';

// import style
import './expenseTracker.css'
import Dashboard from './Dashboard';

export default function ExpenseTracker() {


    return (
        <TransactionProvider>
            <div className='d-flex flex-row justify-content-center align-items-center' style={{ width: '100vw', height: '100vh'}}>
                <Dashboard />
            </div>
        </TransactionProvider>
    )
}
