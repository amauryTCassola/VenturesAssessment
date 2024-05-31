import { TaskStatus } from "@/enums/taskStatus";
import Task from "@/interfaces/task";
import Cell from "./Cell";

interface RowProps {
    task: Task;
}

const Row:React.FC<RowProps> = ({task}) => {

    const PrintableStatus = () => {
        switch(task.status){
            case TaskStatus.correct:
                return 'OK'
            case TaskStatus.error:
                return 'ERROR';
            case TaskStatus.pending:
                return 'Pending';
            case TaskStatus.solving:
                return 'Solving...';
        }
    }

    const borderColor = () => {
        switch(task.status){
            case TaskStatus.correct:
                return 'border-green-600'
            case TaskStatus.error:
                return 'border-red-600';
            default:
                return '';
        }
    }

    return (
        <div
            className={`grid grid-cols-6 bg-white border-2 w-full ${borderColor()}`}>
            <Cell>{task.id}</Cell>
            <Cell>{task.operation}</Cell>
            <Cell>{task.left}</Cell>
            <Cell>{task.right}</Cell>
            <Cell>{task.result}</Cell>
            <Cell>
                {
                    PrintableStatus()
                }
            </Cell>
        </div>
    );
  }
  
  export default Row;