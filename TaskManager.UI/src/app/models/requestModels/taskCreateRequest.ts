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

    constructor(
    title: string,
    createdById: number,
    dueDate?: string,
    isCompleted: boolean = false,
    description?: string,
    assignedToId?: number
  ) {
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
        this.dueDate = dueDate;
        this.createdById = createdById;
        this.assignedToId = assignedToId;
    }
}