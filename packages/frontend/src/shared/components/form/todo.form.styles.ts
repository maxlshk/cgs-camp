import { css } from '@emotion/css';
import { THEME, COLORS, FONTS } from '../../../shared/styles/constants';

export const formContainerStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 80vh;
	background-color: ${COLORS.BACKGROUND};
`;

export const formStyles = css`
	background-color: white;
	padding: ${THEME.SPACING.LARGE};
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 400px;
`;

export const titleStyles = css`
	color: ${COLORS.PRIMARY};
	font-family: ${FONTS.MAIN};
	font-size: ${THEME.FONT_SIZES.LARGE};
	margin-bottom: ${THEME.SPACING.MEDIUM};
	text-align: center;
`;

export const inputStyles = css`
	width: 100%;
	padding: ${THEME.SPACING.MEDIUM};
	margin-bottom: ${THEME.SPACING.MEDIUM};
	border: 1px solid ${COLORS.BORDER};
	border-radius: 4px;
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	&:focus {
		outline: none;
		border-color: ${COLORS.PRIMARY};
	}
`;

export const textareaStyles = css`
	${inputStyles}
	min-height: 100px;
	resize: vertical;
`;

export const checkboxContainerStyles = css`
	display: flex;
	justify-content: space-between;
	margin-bottom: ${THEME.SPACING.MEDIUM};
`;

export const labelStyles = css`
	display: flex;
	align-items: center;
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	color: ${COLORS.TEXT};
`;

export const checkboxStyles = css`
	margin-right: ${THEME.SPACING.SMALL};
`;

export const buttonStyles = css`
	width: 100%;
	padding: ${THEME.SPACING.MEDIUM};
	background-color: ${COLORS.PRIMARY};
	color: white;
	border: none;
	border-radius: 4px;
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	cursor: pointer;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: ${COLORS.SECONDARY};
	}
`;
