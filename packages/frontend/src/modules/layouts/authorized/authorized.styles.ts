import { COLORS, THEME } from '~shared/styles/constants';
import { css } from '@emotion/css';

export const authorizedStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100vh;
	gap: ${THEME.SPACING.LARGE};
	margin: 0 auto;
	background-color: ${COLORS.BACKGROUND};
`;

export const navStyles = css`
	display: flex;
	justify-content: space-between;
`;

export const navButtonContainerStyles = css`
	display: flex;
	gap: ${THEME.SPACING.MEDIUM};
`;

export const linkStyles = css`
	color: ${COLORS.PRIMARY};
	text-decoration: none;
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	margin-right: ${THEME.SPACING.MEDIUM};
	&:hover {
		text-decoration: underline;
	}
`;

export const contentStyles = css`
	width: 100%;
	display: flex;
	flex-grow: 1;
	background-color: white;
	border-radius: 4px;
	padding: ${THEME.SPACING.LARGE};
	box-shadow:
		0 1px 3px rgba(0, 0, 0, 0.12),
		0 1px 2px rgba(0, 0, 0, 0.24);
`;
