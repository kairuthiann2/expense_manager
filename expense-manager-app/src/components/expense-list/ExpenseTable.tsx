import { FC } from "react";
import { Expense } from "../../types";
import {
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

//Define the interface for the props
interface ExpenseTableProps {
  expenses: Expense[];
}

// Destructure the props object to get expenses
const ExpenseTable: FC<ExpenseTableProps> = ({ expenses }) => {
  return (
    //<div className='text-lg'>Expense Table</div>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Expense Type</TableCell>
            <TableCell>Expense Date</TableCell>
            <TableCell>Expense Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={expense.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{expense.expense_type}</TableCell>
              <TableCell>{expense.expense_date}</TableCell>
              <TableCell>{expense.expense_amount}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>
                <button>Edit</button>
              </TableCell>
              <TableCell>
                <button>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
