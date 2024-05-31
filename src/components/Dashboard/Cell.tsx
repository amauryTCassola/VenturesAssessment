import { PropsWithChildren } from "react";

const Cell:React.FC<PropsWithChildren> = ({children}) => {
    return (
            <span className="col-span-1 text-center">{children}</span>
    );
  }
  
  export default Cell;