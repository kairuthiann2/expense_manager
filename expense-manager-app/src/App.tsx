import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "./utils/constants";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ExpenseManager from "./components/expense-managerr/ExpenseManager";
import ExpenseList from "./components/expense-list/ExpenseList";
import AddExpense from "./components/add-expense/AddExpense";
import ExpenseSearch from "./components/expense-search/ExpenseSearch";
import Profile from "./components/profile/Profile";
import { Expense } from "./types";

const App: React.FC = () => {
  // Create state variables
  const [expenses, setExpenses] = useState<Expense[]>([]); // State to store expenses fetched from the server
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const [errorMsg, setErrorMsg] = useState(""); // State to manage error messages
  const [refresh, setRefresh] = useState(false);

  /* // Function to handle submission of a new expense
  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]); // Update the state with the new expense
  };
 */

  // Fetching data with useEffect
  useEffect(() => {
    const getExpenses = async () => {
      try {
        setIsLoading(true); // Indicate that loading has started
        setErrorMsg(""); // Clear any previous errors
        const { data } = await axios.get(BASE_API_URL);
        console.log(data);
        setExpenses(data); // Update state with fetched expenses data
      } catch (error) {
        console.log(error);
        // Set error message if fetching fails
        setErrorMsg("Something went wrong, try again later.");
      } finally {
        // Iindicate that loading has finished
        setIsLoading(false);
      }
    };
    // Invoke the function to fetch expenses data
    getExpenses();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <ExpenseList
                isLoading={isLoading}
                expenses={expenses}
                errorMsg={errorMsg}
              />
            }
          />
          <Route path="/expenses" element={<ExpenseManager />} />
          <Route
            path="/add-expense"
            element={
              <AddExpense
                //onSubmit={handleAddExpense}
                handleRefresh={handleRefresh}
              />
            }
          />
          <Route path="/expense-search" element={<ExpenseSearch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
