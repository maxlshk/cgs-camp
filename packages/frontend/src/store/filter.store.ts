import { create } from 'zustand';
import { todoFilters } from '~shared/types/todoFilters.type';
import { Pagination } from '~shared/types/pagination.type';
import { DisplayType } from '~shared/types/display.type';

interface FilterState {
	filters: todoFilters;
	pagination: Pagination;
	displayType: DisplayType;
	lastViewedIndex: number;
	setFilters: (filters: Partial<todoFilters>) => void;
	setPagination: (pagination: Partial<Pagination>) => void;
	setDisplayType: (displayType: DisplayType) => void;
	resetPagination: () => void;
	setLastViewedIndex: (index: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
	filters: {
		public: undefined,
		status: undefined,
		search: undefined,
	},
	pagination: { total: 0, page: 1, pageSize: 3, totalPages: 1 },
	displayType: DisplayType.DESKTOP,
	lastViewedIndex: 0,
	setFilters: (newFilters): void =>
		set((state) => ({
			filters: { ...state.filters, ...newFilters },
			pagination: { ...state.pagination, page: 1 },
		})),
	setPagination: (newPagination): void =>
		set((state) => ({
			pagination: { ...state.pagination, ...newPagination },
		})),
	setDisplayType: (newDisplayType): void =>
		set({ displayType: newDisplayType }),
	resetPagination: (): void =>
		set((state) => ({
			pagination: { ...state.pagination, page: 1 },
		})),
	setLastViewedIndex: (index: number): void =>
		set({ lastViewedIndex: index }),
}));
