import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { THEME } from '~shared/styles/constants';
import { useFilterStore } from '~store/filter.store';
import { DisplayType } from '~shared/types/display.type';
import { useNavigate } from 'react-router-dom';

export const useSwitchDisplay = (): {
	displayType: DisplayType;
} => {
	const isDesktop = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);
	const isTablet = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.TABLET}) and (max-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);
	const navigate = useNavigate();
	const { setDisplayType, resetPagination, displayType } = useFilterStore();

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
			resetPagination();
			navigate('');
		}
	}, [isDesktop, isTablet, setDisplayType, resetPagination, displayType]);

	return { displayType };
};
