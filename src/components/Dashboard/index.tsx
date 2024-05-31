import { useTasks } from "@/contexts/Tasks";
import Row from "./Row";
import Header from "./Header";

const Dashboard:React.FC = () => {

    const { tasks } = useTasks();

    return (
        <div className="flex flex-col gap-2">
            { tasks.length > 0 ? 
                <>
                    <Header />
                    <div className="flex flex-col gap-4 w-full">
                        {tasks.map((task, index) => 
                            <Row key={index} task={task} />
                        )}
                    </div>
                </>
            :
                <span>Loading....</span>}
        </div>
        
    );
  }
  
  export default Dashboard;