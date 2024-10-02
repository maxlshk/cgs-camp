import React, { useState } from 'react';
import { Todo as TodoElement } from '~shared/components/todo/todo.component';
import { Button } from '@blueprintjs/core';
import {
	carouselStyles,
	cardStyles,
	rightControlsStyles,
} from './carousel.styles';
import { useTodoStore } from '~store/todo.store';

export const Carousel: React.FC = () => {
	const { todos } = useTodoStore();

	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = (): void => {
		setCurrentIndex((prevIndex) => {
			const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
			return newIndex;
		});
	};

	const goToNext = (): void => {
		setCurrentIndex((prevIndex) => {
			const newIndex =
				prevIndex < todos.length - 1 ? prevIndex + 1 : prevIndex;
			return newIndex;
		});
	};

	return (
		<div className={carouselStyles}>
			<Button
				icon="chevron-left"
				onClick={goToPrevious}
				disabled={currentIndex === 0}
			/>
			<div className={cardStyles}>
				{todos[currentIndex] && (
					<TodoElement todo={todos[currentIndex]} view="card" />
				)}
			</div>
			<div className={rightControlsStyles}>
				<Button
					icon="chevron-right"
					onClick={goToNext}
					disabled={currentIndex === todos.length - 1}
				/>
			</div>
		</div>
	);
};
