import React, { useState } from 'react'

import { useTransaction } from './context/GlobalState';
import Switch from '../Switch/Switch';

function Dashboard() {

    const [newAmount, setNewAmount] = useState();
    const [newTransationText, setNewTransationText] = useState();
    const [editField, setEditField] = useState(null);
    const [isIncomeChecked, setIsIncomeChecked] = useState(false);
    // const { transations, checkFun } = useContext(TransactionContext);
    const { transations, addTransaction, updateTransaction, deleteTransaction } = useTransaction();

    // calculate total blance
    const amouts = transations.map(transation => transation.amount);
    const blance = amouts.reduce((acc, val) => acc + val, 0).toFixed(2);

    // calculate of expense or income
    const income = amouts.filter(item => item > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
    const expense = (amouts.filter(item => item < 0).reduce((acc, val) => (acc + val), 0) * -1).toFixed(2);

    // handleSubmit 
    function handleSubmit() {
        const newTransation = {
            id: Date.now(),
            name: newTransationText,
            amount: isIncomeChecked ? parseFloat(newAmount) : -(parseFloat(newAmount)),
        }
        addTransaction(newTransation);
        setNewAmount("");
        setNewTransationText("");
    }

    // enableUpdate
    function enableUpdate(transaction) {
        setNewTransationText(transaction.name);
        setIsIncomeChecked(transaction.amount > 0 ? true : false);
        setNewAmount(Math.abs(transaction.amount));
        setEditField(transaction);
    }

    // handleUpdate
    function handleUpdate() {
        const updatedTransation = { id: editField.id, name: newTransationText, amount: isIncomeChecked ? parseFloat(newAmount) : -(parseFloat(newAmount)), }
        updateTransaction(updatedTransation);
        setNewTransationText("");
        setIsIncomeChecked(false);
        setNewAmount("");
        setEditField(null);
    }

    return (
        <div className='d-flex align-content-center m-auto'>
            <div className='main2 mx-auto p-3 bg-light border rounded p-4 ' >
                <div className="heading text-center mt-3">
                    <h3>Expense Tracker</h3>
                </div>
                <div className="blance-section text-left mt-3">
                    <p className="mb-0">Your Balance: </p>
                    <h3 className='blance'>₹
                        {blance}</h3>
                </div>
                <div className="expense-income-section d-flex flex-row flex-nowrap align-content-center justify-content-around align-items-center mt-3 rounded px-2 py-3">
                    <div className="income-section text-center border-left ">
                        <p>INCOME</p>
                        <h4 className='text-success'>₹
                            {income}</h4>
                    </div>
                    <div className="expense-section text-center">
                        <p>EXPENSE</p>
                        <h4 className='text-danger'>₹
                            {expense}</h4>
                    </div>
                </div>

                <div className="history mt-3">
                    <h5 >History</h5>
                    <hr className='mt-0' />
                    {transations.length > 0 ?
                        transations.map(transation => (
                            <div key={transation.id} className={transation.amount < 0 ? "entree-details border-end border-5 border-3 border-right-0 rounded mb-2 border-danger" : "entree-details border-end border-5 border-3 border-right-0 rounded mb-2 border-success"}>
                                <span>
                                    <button className='text-danger border-0 cursur-pointer delete-btn' onClick={() => { deleteTransaction(transation.id) }}>X</button>
                                    <button className='text-danger border-0 cursur-pointer delete-btn' onClick={() => { enableUpdate(transation) }}>✏️</button>
                                </span>
                                <span className="entree-name">{transation.name}</span>
                                <span className="amount d-inline-block float-right">{transation.amount}</span>
                            </div>
                        )) :
                        <div className='text-center'>no Transation</div>
                    }

                </div>

                <div className="new-transation-section mt-3">
                    <h5>Add new Transation</h5>
                    <hr className='mt-0' />
                    <div className="input-feild mt-2">
                        <label htmlFor="new-transation-text" className='w-100'>Text</label>
                        <input type="text" className='w-100 rounded border p-2 mt-1' value={newTransationText} onChange={(e) => setNewTransationText(e.target.value)} placeholder='enter text....' />
                    </div>
                    <div className="input-feild mt-2">
                        <Switch action={setIsIncomeChecked} checked={isIncomeChecked} />

                        <label htmlFor="new-transation-text" className='w-100'>Amount</label>
                        <input type="text" inputMode="numeric" className='w-100 rounded border p-2 mt-1' value={newAmount} onChange={(e) => setNewAmount(e.target.value)} placeholder='enter amount....' />
                    </div>
                    <div className="submit-btn mt-2">
                        {editField ?
                            <button className="btn w-100 bg-success text-light fw-bold" onClick={handleUpdate}>Update</button> :
                            <button className="btn w-100 bg-success text-light fw-bold" onClick={handleSubmit}>Submit</button>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
