import { css } from '@emotion/css';
import { THEME, COLORS } from '../../../shared/styles/constants';

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
