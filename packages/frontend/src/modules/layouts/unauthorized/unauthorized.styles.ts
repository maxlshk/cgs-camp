import { COLORS, THEME } from '~shared/styles/constants';
import { css } from '@emotion/css';

export const unauthorizedStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	font-size: large;
	min-height: 100vh;
	margin: 0 auto;
	padding: ${THEME.SPACING.LARGE};
	background-color: ${COLORS.BACKGROUND};
`;
