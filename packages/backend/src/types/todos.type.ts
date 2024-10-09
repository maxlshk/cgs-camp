export type TodoType = {
	id: number;
	title: string;
	description?: string;
	isCompleted: boolean;
	isPrivate: boolean;
	createdAt: Date;
	userId: number;
};
