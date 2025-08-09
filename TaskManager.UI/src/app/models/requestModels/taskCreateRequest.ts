interface TaskCreateRequestModel {
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: string;
  createdById: number;
  assignedToId?: number;
}

export class TaskCreateRequest implements TaskCreateRequestModel {
    title: string;
    description?: string;
    isCompleted: boolean;
    dueDate?: string;
    createdById: number;
    assignedToId?: number;

    constructor(data: TaskCreateRequestModel) {
        this.title = data.title;
        this.description = data.description;
        this.isCompleted = data.isCompleted;
        this.dueDate = data.dueDate;
        this.createdById = data.createdById;
        this.assignedToId = data.assignedToId;
    }
}