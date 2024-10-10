import { css } from '@emotion/css';
import { THEME, COLORS } from '~shared/styles/constants';

export const tableStyles = css`
	display: table;
	width: 100%;
	border-collapse: collapse;
	border: 2px solid ${COLORS.BACKGROUND};
`;

export const paginationStyles = css`
	margin-top: 1rem;
	margin-left: auto;
	margin-right: auto;
`;

export const headerStyles = css`
	display: table-row;
	background-color: ${COLORS.SECONDARY};
	color: white;
	font-weight: bold;

	span {
		display: table-cell;
		padding: ${THEME.SPACING.MEDIUM};
	}
`;
