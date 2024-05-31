import Cell from "./Cell";

const Header:React.FC = () => {
    return (
        <div className={`grid grid-cols-6 bg-white font-bold w-full`}>
            <Cell>ID</Cell>
            <Cell>Operation</Cell>
            <Cell>Left</Cell>
            <Cell>Right</Cell>
            <Cell>Result</Cell>
            <Cell>Status</Cell>
        </div>
    );
  }
  
  export default Header;