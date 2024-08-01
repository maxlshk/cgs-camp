import { css } from '@emotion/css';
import { inputStyles } from '../input/input.styles';

export const textareaStyles = css`
	${inputStyles}
	min-height: 100px;
	resize: vertical;
`;
