import { Operation } from "@/enums/operation";
import { TaskStatus } from "@/enums/taskStatus";

export default interface Task {
    id: string;
    operation: Operation;
    left: number;
    right: number;
    result?: number;
    status?: TaskStatus;
}