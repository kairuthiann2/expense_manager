import {AiFillHome} from 'react-icons/ai';
import { BiAddToQueue } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';


export const Sidebar = () => {
  return (
    <ul className='space-y-4 p-4 list'>

        <li>
          <NavLink to="/" className="flex items-center space-x-4">
          <span className="text-2xl text-black"><AiFillHome  /></span>
          <div className="text-lg font-bold">Dashboard</div>        
          </NavLink>  
        </li>

        <li>
          <NavLink to="/add-expense" className="flex items-center space-x-4">
          <span className="text-2xl text-black"><BiAddToQueue /></span>
          <div className="text-lg font-normal">Add Expense</div>        
          </NavLink>
        </li>
        
        <li>
          <NavLink to="/expense-search" className="flex items-center space-x-4">
          <span className="text-2xl text-black"><IoSearchSharp  /></span>
          <div className="text-lg font-normal">Search Expense</div>        
          </NavLink>
        </li>   

        <li>
          <NavLink to="/profile" className="flex items-center space-x-4">
          <span className="text-2xl text-black"><CgProfile /></span>
          <div className="text-lg font-normal">Profile</div>        
          </NavLink>
        </li>     
        <li>
          <NavLink to="/" className="flex items-center space-x-4">
          <span className="text-2xl text-black"><RiLogoutCircleRLine /></span>
          <div className="text-lg font-normal">LogOut</div>        
          </NavLink>
        </li>      

    </ul>
   
  );
};
export  default Sidebar;
