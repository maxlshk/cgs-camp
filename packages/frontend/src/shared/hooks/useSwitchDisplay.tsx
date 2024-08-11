import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { THEME } from '~shared/styles/constants';
import { useFilterStore } from '~store/filter.store';
import { useTodoStore } from '~store/todo.store';
import { DisplayType } from '~shared/types/display.type';

export const useSwitchDisplay = (): {
	displayType: DisplayType;
} => {
	const isDesktop = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);
	const isTablet = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.TABLET}) and (max-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);

	const { setDisplayType, resetPagination, displayType } = useFilterStore();
	const { fetchTodos } = useTodoStore();

	useEffect(() => {
		let newDisplayType: DisplayType;
		if (isDesktop) {
			newDisplayType = DisplayType.DESKTOP;
		} else if (isTablet) {
			newDisplayType = DisplayType.TABLET;
		} else {
			newDisplayType = DisplayType.PHONE;
		}

		if (newDisplayType !== displayType) {
			setDisplayType(newDisplayType);
			if (newDisplayType !== DisplayType.DESKTOP) {
				resetPagination();
				fetchTodos();
			}
		}
	}, [
		isDesktop,
		isTablet,
		setDisplayType,
		resetPagination,
		fetchTodos,
		displayType,
	]);

	return { displayType };
};
