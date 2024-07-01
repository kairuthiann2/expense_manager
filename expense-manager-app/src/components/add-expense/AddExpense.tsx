// component for for adding expenses
// Sends a new expense to the server using axios.post.
// On successful addition ExpenseManager refetches the expenses

import axios from "axios"; // Axios for making HTTP requests
import { Expense } from "../../types"; // Importing the Expense type defination
import { FC } from "react";
import { BASE_API_URL } from "../../utils/constants"; // Importing the base API URL from constant file
import ExpenseForm from "../expense-form/ExpenseForm"; // Importing the ExpenseForm component

// Defiing the AddExpense component
interface AddExpenseProps {
  
  //onSubmit: (inputData: Expense) => void;
  handleRefresh: () => void; // new prop for refreshing expenses
}

const AddExpense: FC<AddExpenseProps> = ({ handleRefresh }) => {
  // defining the handleSubmit function that will handle form submission
  const handleSubmit = async (inputData: Expense): Promise<boolean> => {
    try {
      console.log("Submitting expense:", inputData);
      // Optimistically update the UL
      handleRefresh();
      // Making a POST request to the API endpoint with the input data
      const { data } = await axios.post(BASE_API_URL, {
        ...inputData,
      });
      // Returning true to indicate successful submission
      console.log("posting expense response:", data);

      //onSubmit(inputData); //call the onSubmit prop function

      handleRefresh(); // call handleRefresh after successful submission to refresh the data from the server

      // Returning true to indicate successful submission
      return true;
    } catch (error) {
      // Logging any errors to the console
      console.log("Error submitting expense:", error);
      //return false to ndicate submission failure
      return false;
    }
  };
  // Returning the JSX  to render the component
  return (
    <div className="main-content">
      <h2 className="text-lg text-center font-bold mt-4 mb-0">Add Expense</h2>
      <ExpenseForm onSubmitForm={handleSubmit} />
    </div>
  );
};

export default AddExpense;
