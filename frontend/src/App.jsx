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
  const API_URL = import.meta.env.VITE_API_URL;

  async function addUserMethod (newUser) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers:{"Content-Type": "application/json",
       "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newUser)
    })
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.token)
    }
    
  }

  async function logInUserMethod (existingUser) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(existingUser)
    })
    const data = await response.json();
  
    if (data.success) {
      localStorage.setItem("token", data.token);
      await checkAuthAndGetUser();
    }
  }

  async function checkAuthAndGetUser () {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
     const response = await fetch(`${API_URL}/api/auth/check`, {
      credentials: "include",
      headers: {"Authorization": `Bearer ${token}`}
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
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/transactions`, {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
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
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/transactions`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
  });
  const data = await response.json();

  if (data.success) {
    setTransactions(data.data);
  }
}

async function deleteTransactionMethod (id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
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
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/transactions/${updatedTransaction._id}`, {
    method: "PUT",
    credentials: "include",
    headers: {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
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
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/budgets`, {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json",

      "Authorization": `Bearer ${token}`
    },

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
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/budgets`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
  });
  const data = await response.json();

  if (data.success) {
    setBudgets(data.data);
  }
}

async function deleteBudget(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/budgets/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
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
 const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/budgets/get-info`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
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
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/budgets/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
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
  const token = localStorage.getItem("token");
  setLoadingPieCharts(true)
  const response = await fetch(`${API_URL}/api/transactions/get-income-info`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
  });
  const data = await response.json();
  if (data.success) {
    setIncomeInfo(data.data)
  }
  setLoadingPieCharts(false)
}

async function getExpenseInfo () {
 const token = localStorage.getItem("token");
  setLoadingPieCharts(true)
  const response = await fetch(`${API_URL}/api/transactions/get-expense-info`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
  })
  const data = await response.json();

  if (data.success) {
    setExpenseInfo(data.data)
  }
  setLoadingPieCharts(false)
}

async function getExpensesOverTime () {
  const token = localStorage.getItem("token");
  setLoadingLineCharts(true)
  const response = await fetch (`${API_URL}/api/transactions/expenses-over-time`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
  });
  const data = await response.json();
  if (data.success) {
    setExpensesLastWeek(data.data);
  }
  setLoadingLineCharts(false)
}

async function monthlyExpenseData () {
  const token = localStorage.getItem("token");
  setLoadingLineCharts(true)
  const response = await fetch (`${API_URL}/api/transactions/expenses-one-month`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
  });
  const data = await response.json();
  if (data.success) {
    setExpensesLastMonth(data.data)
  }
  setLoadingLineCharts(false)
}

async function getBudgetRisks() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/budgets/remaining-info`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
  });
  const data = await response.json();
  if(data.success) {
    setBudgetRiskInfo(data.data)
  }
}

async function getExpenseComparison() {
 const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/transactions/comparison`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
  });
  const data = await response.json();
  if (data.success) {
    setExpenseComparisonData(data.data)
  }
}

async function getIncomeWithinLastMonth () {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/transactions/income-last-month`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
  });
  const data = await response.json();
  if (data.success) {
    setIncomeWithinLastMonth(data.data)
  }
}

async function getPreviousMonthIncomeAndExpenses() {
 const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/transactions/income-and-expenses-previous-month`, {
    credentials: "include",
    headers: {"Authorization": `Bearer ${token}`}
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
