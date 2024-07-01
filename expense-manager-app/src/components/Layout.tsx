import React, { ReactNode} from 'react';
import Sidebar from './Sidebar/Sidebar.tsx';

//Define the props interface
interface LayoutProps {
    children: ReactNode; //The children prop will be of the type ReactNode
}
//Define the Layout Functional component

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-aqua-haze min-h-screen flex main'>
        <div className='bg-green-300 p-4 w-1/4 left'>
            <Sidebar />
        </div>
        <div className='bg-green-400 p-4 w-3/4 right'>
          {children} {/*children passed as prop here */}
        </div>
    </div>
    
    
  );
};

export default Layout;