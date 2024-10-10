export type todoFilters = {
	search: string | null;
	status: string | null;
	private: string | null;
	page: string | null;
};

export type filterUpdateFunction = (
	filterType: keyof todoFilters,
	value: string | null,
) => void;
