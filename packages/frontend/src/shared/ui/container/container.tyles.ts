import { css } from '@emotion/css';
import { THEME } from '~shared/styles/constants';

export const containerBaseStyle = css`
	margin: 0 auto;
	padding: 0 16px;
	max-width: 100%;
`;

export const containerSizes = {
	mobile: css`
		@media (min-width: ${THEME.BREAKPOINTS.MOBILE}) {
			max-width: 470px;
		}
	`,
	tablet: css`
		@media (min-width: ${THEME.BREAKPOINTS.TABLET}) {
			max-width: 752px;
		}
	`,
	desktop: css`
		@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
			max-width: 980px;
		}
	`,
};
