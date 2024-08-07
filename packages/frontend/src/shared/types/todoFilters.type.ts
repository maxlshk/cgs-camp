export type todoFilters = {
	search: string;
	status: 'completed' | 'active';
	public: boolean;
	page: number;
	pageSize: number;
};
