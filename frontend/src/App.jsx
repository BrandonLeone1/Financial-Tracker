import { useState } from 'react'
import { SignUp } from './pages/SignUp'
import {Routes, Route} from 'react-router-dom'
import { LogIn } from './pages/LogIn';
import { useEffect } from 'react';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { Transactions } from './pages/Transactions';
import { Budgets } from './pages/Budgets';
import dotenv from 'dotenv'

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [incomeInfo, setIncomeInfo] = useState([])
  const [expenseInfo, setExpenseInfo] = useState([]);
  const [expensesLastWeek, setExpensesLastWeek] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expensesLastMonth, setExpensesLastMonth] = useState([]);
  const [budgetRiskInfo, setBudgetRiskInfo] = useState([]);
  const [addedTransactionSuccessfully, setAddedTransactionSuccessfully] = useState(false);
  const [addedBudgetSuccessfully, setAddedBudgetSuccessfully] = useState(false);
  const [deletedTransaction, setDeletedTransaction] = useState(false);
  const [deletedBudget, setDeletedBudget] = useState(false);
  const [loadingPieCharts, setLoadingPieCharts] = useState(false);
  const [loadingLineCharts, setLoadingLineCharts] = useState(false);
  const [expenseComparisonData, setExpenseComparisonData] = useState([]);
  const [incomeWithinLastMonth, setIncomeWithinLastMonth] = useState([]);
  const [previousMonthIncomeTotal, setPreviousMonthIncomeTotal] = useState(0);
  const [previousMonthExpenseTotal, setPreviousMonthExpenseTotal] = useState(0);
  dotenv.config()

  async function addUserMethod (newUser) {
    const response = await fetch(`${process.env.API_URL}/api/auth/signup`, {
      method: "POST",
      withCredentials: true,
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(newUser)
    })
    const data = await response.json();
    
  }

  async function logInUserMethod (existingUser) {
    const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
      method: "POST",
      withCredentials: true,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(existingUser)
    })
    const data = await response.json();
  
    if (data.success) {
      setCurrentUser(data.user);
    }
  }

  async function checkAuthAndGetUser () {
    
    setIsLoading(true);
    try {
     const response = await fetch(`${process.env.API_URL}/api/auth/check`, {
      withCredentials: true
     });
    const data = await response.json();
    if (data.success) {
      setCurrentUser(data.user)
      
    } else {
      setCurrentUser(null)
    }
   
    } catch (error) {
      setCurrentUser(null)
    } finally {
      setIsLoading(false);
    }
    
    
    
  }

  useEffect(() => {
    checkAuthAndGetUser();
  }, []
)

async function addTransactionMethod (newTransaction) {
  const response = await fetch(`${process.env.API_URL}/api/transactions`, {
    method: "POST",
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newTransaction)
  })
  const data = await response.json();

  if (data.success) {

    setTransactions(prev => [...prev, data.data]);

    setAddedTransactionSuccessfully(true);
    setTimeout(() => {
      setAddedTransactionSuccessfully(false)
    }, 3000);
  }
}

async function getTransactions() {
  const response = await fetch(`${process.env.API_URL}/api/transactions`, {
    withCredentials: true
  });
  const data = await response.json();

  if (data.success) {
    setTransactions(data.data);
  }
}

async function deleteTransactionMethod (id) {
  const response = await fetch(`${process.env.API_URL}/api/transactions/${id}`, {
    method: "DELETE",
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
  })
  const data = await response.json();

  if (data.success) {
    setTransactions(prev => prev.filter(transaction => transaction._id !== id))

    setDeletedTransaction(true);

    setTimeout(() => {
      setDeletedTransaction(false);
    }, 3000);
  }
}

async function updateTransactionMethod (updatedTransaction) {
  const response = await fetch(`${process.env.API_URL}/api/transactions/${updatedTransaction._id}`, {
    method: "PUT",
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(updatedTransaction)
  });
  const data = await response.json();

  if (data.success) {
    setTransactions(prev => prev.map(transaction => {
      if (transaction._id === data.data._id) {
        return data.data
      } else {
        return transaction
      }
    }))
  }
}

async function addBudgetMethod (newBudget) {
  const response = await fetch(`${process.env.API_URL}/api/budgets`, {
    method: "POST",
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newBudget)
  })
  const data = await response.json();

  if (data.success) {
    setBudgets(prev => [...prev, data.data])

    setAddedBudgetSuccessfully(true)

    setTimeout(() => {
      setAddedBudgetSuccessfully(false)
    }, 3000);
  }
}

async function getBudgets () {
  const response = await fetch(`${process.env.API_URL}/api/budgets`, {
    withCredentials: true
  });
  const data = await response.json();

  if (data.success) {
    setBudgets(data.data);
  }
}

async function deleteBudget(id) {
  const response = await fetch(`${process.env.API_URL}/api/budgets/${id}`, {
    method: "DELETE",
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
  });
  const data = await response.json();
  if (data.success) {
    setBudgets(prev => prev.filter(budget => budget._id !== id))

    setDeletedBudget(true);

    setTimeout(() => {
      setDeletedBudget(false);
    }, 3000);
  }
}

async function getBudgetInfo () {
  const response = await fetch(`${process.env.API_URL}/api/budgets/get-info`, {
    withCredentials: true
  });
  const data = await response.json();

  if (data.success) {
    setBudgetInfo(data.data);
  }
}

useEffect(() => {
  getBudgetInfo();
}, []
)

useEffect(() => {
  getBudgets();
}, []
)

async function editBudget (id, updatedBudget) {
  const response = await fetch(`${process.env.API_URL}/api/budgets/${id}`, {
    method: "PUT",
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(updatedBudget)
  });
  const data = await response.json();

  if (data.success) {
    setBudgets(prev => prev.map(budget => {
      if (budget._id === id) {
        return data.data
      } else {
        return budget
      }
    }))
  }
}

async function getIncomeInfo () {
  setLoadingPieCharts(true)
  const response = await fetch(`${process.env.API_URL}/api/transactions/get-income-info`, {
    withCredentials: true,
  });
  const data = await response.json();
  if (data.success) {
    setIncomeInfo(data.data)
  }
  setLoadingPieCharts(false)
}

async function getExpenseInfo () {
  setLoadingPieCharts(true)
  const response = await fetch(`${process.env.API_URL}/api/transactions/get-expense-info`, {
    withCredentials: true
  })
  const data = await response.json();

  if (data.success) {
    setExpenseInfo(data.data)
  }
  setLoadingPieCharts(false)
}

async function getExpensesOverTime () {
  setLoadingLineCharts(true)
  const response = await fetch (`${process.env.API_URL}/api/transactions/expenses-over-time`, {
    withCredentials: true
  });
  const data = await response.json();
  if (data.success) {
    setExpensesLastWeek(data.data);
  }
  setLoadingLineCharts(false)
}

async function monthlyExpenseData () {
  setLoadingLineCharts(true)
  const response = await fetch (`${process.env.API_URL}/api/transactions/expenses-one-month`, {
    withCredentials: true
  });
  const data = await response.json();
  if (data.success) {
    setExpensesLastMonth(data.data)
  }
  setLoadingLineCharts(false)
}

async function getBudgetRisks() {
  const response = await fetch(`${process.env.API_URL}/api/budgets/remaining-info`, {
    withCredentials: true
  });
  const data = await response.json();
  if(data.success) {
    setBudgetRiskInfo(data.data)
  }
}

async function getExpenseComparison() {
  const response = await fetch(`${process.env.API_URL}/api/transactions/comparison`, {
    withCredentials: true
  });
  const data = await response.json();
  if (data.success) {
    setExpenseComparisonData(data.data)
  }
}

async function getIncomeWithinLastMonth () {
  const response = await fetch(`${process.env.API_URL}/api/transactions/income-last-month`, {
    withCredentials: true
  });
  const data = await response.json();
  if (data.success) {
    setIncomeWithinLastMonth(data.data)
  }
}

async function getPreviousMonthIncomeAndExpenses() {
  const response = await fetch(`${process.env.API_URL}/api/transactions/income-and-expenses-previous-month`, {
    withCredentials: true
  });
  const data = await response.json();
  if (data.success) {
    setPreviousMonthIncomeTotal(data.incomeData);
    setPreviousMonthExpenseTotal(data.expenseData);
  }
}

function convertFormat (amount) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return formatter.format(amount)
}

  return (
    <>
    <Routes>
      <Route 
      path='/'
      element={
      <PublicRoute currentUser={currentUser} isLoading={isLoading}>
      <SignUp addUserMethod={addUserMethod}/>
      </PublicRoute>
    }
      />

      <Route 
      path='/login'
      element={
      <PublicRoute currentUser={currentUser} isLoading={isLoading}>
      <LogIn logInUserMethod={logInUserMethod}/>
      </PublicRoute>
    }
      />

      <Route 
      path='/dashboard'
      element={
      <ProtectedRoute currentUser={currentUser} isLoading={isLoading}>
      <Dashboard loadingLineCharts={loadingLineCharts} previousMonthIncomeTotal={previousMonthIncomeTotal} previousMonthExpenseTotal={previousMonthExpenseTotal} getPreviousMonthIncomeAndExpenses={getPreviousMonthIncomeAndExpenses} convertFormat={convertFormat} incomeWithinLastMonth={incomeWithinLastMonth} getIncomeWithinLastMonth={getIncomeWithinLastMonth} getExpenseComparison={getExpenseComparison} expenseComparisonData={expenseComparisonData} getBudgetRisks={getBudgetRisks} loadingPieCharts={loadingPieCharts} budgetRiskInfo={budgetRiskInfo} expensesLastWeek={expensesLastWeek} expensesLastMonth={expensesLastMonth} getExpensesOverTime={getExpensesOverTime} expenseInfo={expenseInfo} currentUser={currentUser} transactions={transactions} getTransactions={getTransactions} budgets={budgets} getExpenseInfo={getExpenseInfo} getIncomeInfo={getIncomeInfo} incomeInfo={incomeInfo} monthlyExpenseData={monthlyExpenseData}/>
      </ProtectedRoute>
    }
      />

      <Route 
      path='/transactions'
      element={
      <ProtectedRoute currentUser={currentUser} isLoading={isLoading}>
      <Transactions deletedTransaction={deletedTransaction} transactions={transactions} addedTransactionSuccessfully={addedTransactionSuccessfully} setAddedTransactionSuccessfully={setAddedTransactionSuccessfully} addTransactionMethod={addTransactionMethod} getTransactions={getTransactions} deleteTransactionMethod={deleteTransactionMethod} updateTransactionMethod={updateTransactionMethod}/>
      </ProtectedRoute>
    }
      />

      <Route 
      path='/budgets'
      element={
        <>
        <ProtectedRoute currentUser={currentUser} isLoading={isLoading}>
          <Budgets addedBudgetSuccessfully={addedBudgetSuccessfully} deletedBudget={deletedBudget} getBudgetInfo={getBudgetInfo} budgetInfo={budgetInfo} budgets={budgets} getBudgets={getBudgets} addBudgetMethod={addBudgetMethod} editBudget={editBudget} deleteBudget={deleteBudget}/>
        </ProtectedRoute>
        </>
      }
      />
      
    </Routes>
      
    </>
  )
}

export default App
