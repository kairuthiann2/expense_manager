//Fetching the list of expenses from the server using axios.get
//handling the submission of new expenses
// Passing the expenses data to `ExpenseList` (which will use ExpenseTable to display the data).
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddExpense from "../add-expense/AddExpense";
import ExpenseList from "../expense-list/ExpenseList";
import { BASE_API_URL } from "../../utils/constants";
import { Expense } from "../../types";

// functional component definatioon for the ExpenseManager
const ExpenseManager: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]); // Holds the list of expenses
  const [isLoading, setIsLoading] = useState(true); // indicates if data is being loaded
  const [errorMsg, setErrorMsg] = useState(""); // hlds any error messages

  // Function to Fetch expenses(data) from the server
  const fetchExpenses = async () => {
    try {
      // sending Get request to fetch expenses
      const response = await axios.get(BASE_API_URL);
      console.log("Fetched expenses:", response.data);
      // Updating state with fetched expenses
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setErrorMsg("Error fetching expenses");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to  calls fetchExpenses when the component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Define handleRefresh to refetch expenses
  const handleRefresh = () => {
    fetchExpenses();
  };

  /* // Function to handle adding a new expense by calling the server
  const handleAddExpense = async (inputData: Expense) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Sending POST request to add a new expense
      const response = await axios.post(BASE_API_URL, inputData);
      console.log("Post succsessful:", inputData);
      // If the request is successfull, re-fetch the expenses
      if (response.status === 200) {
        fetchExpenses();
      }
    } catch (error) {
      // Logging error to the console
      console.error("Error adding expense:", error);
      // Setting error message state
      setErrorMsg("Error adding expense");
    } finally {
      // Setting loading state to false after adding is done
      setIsLoading(false);
    }
  };
  */

  // Rendering the component
  return (
    <div>
      {/* AddExpense component for adding new expenses*/}
      <AddExpense handleRefresh={handleRefresh} />
      {/* ExpenseList component to display the list of expenses*/}
      <ExpenseList
        isLoading={isLoading}
        expenses={expenses}
        errorMsg={errorMsg}
      />
    </div>
  );
};

export default ExpenseManager;
