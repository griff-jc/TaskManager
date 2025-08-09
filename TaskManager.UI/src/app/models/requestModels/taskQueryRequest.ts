interface TaskQueryRequestModel {
    id?: number;
    isCompleted?: boolean;
    dueDateSearchRangeStart?: string;
    dueDateSearchRangeEnd?: string;
    sortByTitle: boolean;
    sortByDueDate: boolean;
    pageSize: number;
    pageNumber: number;
}

export class TaskQueryRequest implements TaskQueryRequestModel {
    id?: number;
    isCompleted?: boolean;
    dueDateSearchRangeStart?: string;
    dueDateSearchRangeEnd?: string;
    sortByTitle: boolean;
    sortByDueDate: boolean;
    pageSize: number;
    pageNumber: number;

    constructor(data: TaskQueryRequestModel) {
        this.id = data.id;
        this.isCompleted = data.isCompleted;
        this.dueDateSearchRangeStart = data.dueDateSearchRangeStart;
        this.dueDateSearchRangeEnd = data.dueDateSearchRangeEnd;
        this.sortByTitle = data.sortByTitle;
        this.sortByDueDate = data.sortByDueDate;
        this.pageSize = data.pageSize;
        this.pageNumber = data.pageNumber;
    }
}