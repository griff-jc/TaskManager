import { Task } from "../task";

interface TaskCollectionResponseModel {
    tasks: Task[];
    totalCount: number;
}

export class TaskCollectionResponse implements TaskCollectionResponseModel {
    tasks: Task[];
    totalCount: number;

    constructor(data: TaskCollectionResponseModel) {
        this.tasks = data.tasks;
        this.totalCount = data.totalCount;
    }
}
