export interface Todo {
	id: number;
	title: string;
	description: string;
	isPrivate: boolean;
	isCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export type ViewType = 'table' | 'card' | 'list';
