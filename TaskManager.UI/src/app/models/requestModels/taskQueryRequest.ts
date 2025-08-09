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

    constructor(options: Partial<TaskQueryRequest> = {}) {
        this.id = options.id;
        this.isCompleted = options.isCompleted;
        this.dueDateSearchRangeStart = options.dueDateSearchRangeStart;
        this.dueDateSearchRangeEnd = options.dueDateSearchRangeEnd;
        this.sortByTitle = options.sortByTitle ?? false;
        this.sortByDueDate = options.sortByDueDate ?? false;
        this.pageSize = options.pageSize ?? 10;
        this.pageNumber = options.pageNumber ?? 0;
    }
}