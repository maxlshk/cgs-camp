import classNames from 'classnames';
import React from 'react';
import { ReactElement } from 'react';
import { containerBaseStyle, containerSizes } from './container.tyles';

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
	display?: 'mobile' | 'tablet' | 'desktop';
};

export const Container = ({
	children,
	className,
	display = 'desktop',
}: ContainerProps): ReactElement => {
	const styles = classNames(
		containerBaseStyle,
		containerSizes[display],
		className,
	);

	return <div className={styles}>{children}</div>;
};
