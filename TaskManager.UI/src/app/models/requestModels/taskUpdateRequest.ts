interface TaskUpdateRequestModel {
    id: number;
    title: string;
    description?: string;
    isCompleted: boolean;
    dueDate?: string;
    assignedToId?: number;
}

export class TaskUpdateRequest implements TaskUpdateRequestModel {
    id: number;
    title: string;
    description?: string;
    isCompleted: boolean;
    dueDate?: string;
    assignedToId?: number;

    constructor(
    id: number,
    title: string,
    dueDate?: string,
    isCompleted: boolean = false,
    description?: string,
    assignedToId?: number
  ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
        this.dueDate = dueDate;
        this.assignedToId = assignedToId;
    }
}
