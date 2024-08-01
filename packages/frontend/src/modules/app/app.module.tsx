/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import { ROUTER_KEYS } from '../../router/routes';
import { FONTS, COLORS, THEME } from '../../shared/styles/constants';

interface AppProps {
	children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
	return (
		<>
			<Global styles={globalStyles} />
			<div css={appStyles}>
				<nav css={navStyles}>
					<Link to={ROUTER_KEYS.HOME} css={linkStyles}>
						Home
					</Link>
					<Link to={ROUTER_KEYS.TODO} css={linkStyles}>
						Todos
					</Link>
					<Link to={ROUTER_KEYS.NEW} css={linkStyles}>
						New Todo
					</Link>
				</nav>
				<div css={contentStyles}>{children}</div>
			</div>
		</>
	);
};

const globalStyles = css`
	body {
		font-family: ${FONTS.MAIN};
		background-color: ${COLORS.BACKGROUND};
		color: ${COLORS.TEXT};
		margin: 0;
		padding: 0;
	}
`;

const appStyles = css`
	max-width: 1200px;
	margin: 0 auto;
	padding: ${THEME.SPACING.LARGE};
`;

const navStyles = css`
	display: flex;
	justify-content: flex-start;
	margin-bottom: ${THEME.SPACING.LARGE};
`;

const linkStyles = css`
	color: ${COLORS.PRIMARY};
	text-decoration: none;
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	margin-right: ${THEME.SPACING.MEDIUM};
	&:hover {
		text-decoration: underline;
	}
`;

const contentStyles = css`
	background-color: white;
	border-radius: 4px;
	padding: ${THEME.SPACING.LARGE};
	box-shadow:
		0 1px 3px rgba(0, 0, 0, 0.12),
		0 1px 2px rgba(0, 0, 0, 0.24);
`;

export default App;
