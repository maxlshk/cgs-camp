import { useState, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { THEME } from '~shared/styles/constants';
import { DisplayType } from '~shared/types/display.type';

export const useDisplayType = (): { displayType: DisplayType } => {
	const isDesktop = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);
	const isTablet = useMediaQuery(
		`(min-width: ${THEME.BREAKPOINTS.TABLET}) and (max-width: ${THEME.BREAKPOINTS.DESKTOP})`,
	);

	const [displayType, setDisplayType] = useState<DisplayType>(
		DisplayType.DESKTOP,
	);

	useEffect(() => {
		let newDisplayType: DisplayType;
		if (isDesktop) {
			newDisplayType = DisplayType.DESKTOP;
		} else if (isTablet) {
			newDisplayType = DisplayType.TABLET;
		} else {
			newDisplayType = DisplayType.PHONE;
		}

		setDisplayType(newDisplayType);
	}, [isDesktop, isTablet]);

	return { displayType };
};
