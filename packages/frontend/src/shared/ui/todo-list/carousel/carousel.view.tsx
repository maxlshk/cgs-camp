import React, { useState } from 'react';
import { Todo as TodoElement } from '~shared/components/todo/todo.component';
import { Button } from '@blueprintjs/core';
import {
	carouselStyles,
	cardStyles,
	rightControlsStyles,
} from './carousel.styles';
import { useTodoStore } from '~store/todo.store';
import { useFilters } from '~shared/hooks/useFilters';

interface CarouselViewProps {
	userId: number;
}

export const CarouselView: React.FC<CarouselViewProps> = ({ userId }) => {
	const { todos, pagination } = useTodoStore();
	const { updateFilters } = useFilters();

	const [currentIndex, setCurrentIndex] = useState(
		(pagination.page - 1) * pagination.limit,
	);
	const hasMorePages = pagination.page < pagination.totalPages;

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
					<TodoElement
						todo={todos[currentIndex]}
						view="card"
						editable={todos[currentIndex].userId == userId}
					/>
				)}
			</div>
			<div className={rightControlsStyles}>
				{currentIndex === todos.length - 1 && hasMorePages ? (
					<Button
						onClick={() =>
							updateFilters(
								'page',
								(pagination.page + 1).toString(),
							)
						}
						disabled={!hasMorePages}
					>
						Load More
					</Button>
				) : (
					<Button
						icon="chevron-right"
						onClick={goToNext}
						disabled={currentIndex === todos.length - 1}
					/>
				)}
			</div>
		</div>
	);
};
