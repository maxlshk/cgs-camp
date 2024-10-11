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

	const displayType: DisplayType = isDesktop
		? DisplayType.DESKTOP
		: isTablet
			? DisplayType.TABLET
			: DisplayType.PHONE;

	return { displayType };
};
