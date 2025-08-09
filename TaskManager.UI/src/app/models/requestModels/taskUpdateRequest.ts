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

    constructor(data: TaskUpdateRequestModel) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.isCompleted = data.isCompleted;
        this.dueDate = data.dueDate;
        this.assignedToId = data.assignedToId;
    }
}
