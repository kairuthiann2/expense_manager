import { Expense } from "../../types";
import { FC } from "react";
import { BASE_API_URL } from "../../utils/constants";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Defining the props for the ExpenseForm component
interface ExpenseFormProps {
  onSubmitForm: (inputData: Expense) => Promise<boolean>;
}

//Defining a functional component for ExpenseForm
const ExpenseForm: FC<ExpenseFormProps> = () => {
  const expenseTypeRef = useRef<HTMLSelectElement>(null); // Reference for the expense type select element
  const expenseDateRef = useRef<HTMLInputElement>(null); // Reference for the expense date input element
  const expenseAmountRef = useRef<HTMLInputElement>(null); //Reference the expense amount input element
  const descriptionRef = useRef<HTMLTextAreaElement>(null); // Reference for the description textarea element
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [successMsg, setSuccessMsg] = useState(""); // State for success message
  const [errorMsg, setErrorMsg] = useState({
    // State for error message
    general: "",
  });

  const navigate = useNavigate();

  // Function to handle form submission>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form submission
    setLoading(true); // Set loading state to true
    setSuccessMsg(""); // Reset success message
    setErrorMsg({ general: "" }); // Resest error message

    // Client-side validation (optional)
    if (
      !expenseTypeRef.current?.value || // Check if expense type is selected
      !expenseDateRef.current?.value || // Check if expense date is provided
      !expenseAmountRef.current?.value || // Check if expense amount is provided
      !descriptionRef.current?.value // Check if description is provided
    ) {
      setErrorMsg({ general: "Please fill in all required fields" });
      setLoading(false);
      return;
    }

    // Construct expense data object
    const expenseData = {
      expense_type: expenseTypeRef.current.value, // Get expense type value
      expense_date: expenseDateRef.current.value, // Get expense date value
      expense_amount: expenseAmountRef.current.value, // Get expense amount value
      description: descriptionRef.current.value, // Get description value
    };

    console.log("From input data:", expenseData); // Log the form input data

    try {
      // Send POST request to the API
      const response = await fetch(BASE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData), // conver expense data to JSON string
      });

      // Check if the response is not ok
      if (!response.ok) {
        throw new Error("Failed to submit expense");
      }
      setSuccessMsg("Expense submitted successfully!");

      //clear the form if the submission is successful

      if (expenseTypeRef.current) expenseTypeRef.current.value = "";
      if (expenseDateRef.current) expenseDateRef.current.value = "";
      if (expenseAmountRef.current) expenseAmountRef.current.value = "";
      if (descriptionRef.current) descriptionRef.current.value = "";

      // Redirect to expense list after a delay
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/"); // Redirect to expense list
      }, 2000);
    } catch (error) {
      // Catch any errors during form submission
      if (error instanceof Error) {
        setErrorMsg({ general: error.message });
      } else {
        setErrorMsg({ general: "An unexpexpected error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-green-500 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center mt-6">
          ExpenseForm
        </h2>
        <div className="mb-4">
          <label htmlFor="expenseType" className="block mb-2 font-medium">
            Expense Type
          </label>

          <select
            id="expenseType"
            ref={expenseTypeRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select Expense Type
            </option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="card">Mpesa</option>
            <option value="card">PayPal</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="expenseDate" className="block mb-2 font-medium">
            Expense Date
          </label>
          <input
            type="date"
            id="expenseDate"
            ref={expenseDateRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Select Date"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expenseAmount" className="block  mb-2 font-medium">
            Expense Amount (USD)
          </label>
          <input
            type="number"
            id="expenseAmount"
            ref={expenseAmountRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Amount in USD"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block  mb-2 font-medium">
            Description
          </label>
          <textarea
            id="description"
            ref={descriptionRef}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
            rows={4}
          ></textarea>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "submitting..." : "Add Expense"}
          </button>
        </div>
        {successMsg && <p className="text-green-900 mt-4">{successMsg}</p>}
        {errorMsg.general && (
          <p className="text-red-800 mt-4">{errorMsg.general}</p>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
