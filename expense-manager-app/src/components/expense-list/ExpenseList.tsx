// Receives the expenses from ExpenseManager
// Then passes them to ExpenseTable to render in a table format

import { FC } from "react";
import { Expense } from "../../types";
import ExpenseTable from "./ExpenseTable";
//import { Spinner } from '@material-tailwind/react';

//defined an interface ExppenseList props
interface ExpenseListProps {
  isLoading: boolean;
  expenses: Expense[];
  errorMsg: string;
}
//Defining functional components for ExpenseList
const ExpenseList: FC<ExpenseListProps> = ({
  isLoading, //Destructuring isLoading prop
  expenses, // Destructuring expenses prop
  errorMsg, // Destructuring errorMsg prop
}) => {
  console.log("Rendering expenses list:", expenses);
  // If data is loading, show a loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there is an error message display it
  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  // Render the component
  return (
    <div className=" flex flex-col min-h-0 p-2">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">Expense List</h2>
        {isLoading && <div className="flex justify-center items-center"></div>}
        {errorMsg && <p className="text-xl text-red">{errorMsg}</p>}
        {!isLoading && !errorMsg && <ExpenseTable expenses={expenses} />}
      </div>
    </div>
  );
};

export default ExpenseList;
