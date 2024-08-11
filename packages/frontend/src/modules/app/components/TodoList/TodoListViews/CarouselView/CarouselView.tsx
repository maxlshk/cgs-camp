import React, { useState, useEffect } from 'react';
import { TodoElement } from '../../../TodoItem/TodoItem';
import { Todo } from '~shared/types/todo.type';
import { Button } from '@blueprintjs/core';
import {
	carouselStyles,
	cardStyles,
	rightControlsStyles,
} from './CarouselView.styles';
import { useFilterStore } from '~store/filter.store';

interface CarouselViewProps {
	todos: Todo[];
	userId: number;
	onLoadMore: () => void;
	hasMoreTodos: boolean;
}

export const CarouselView: React.FC<CarouselViewProps> = ({
	todos,
	userId,
	onLoadMore,
	hasMoreTodos,
}) => {
	const { lastViewedIndex, setLastViewedIndex } = useFilterStore();
	const [currentIndex, setCurrentIndex] = useState(lastViewedIndex);

	useEffect(() => {
		if (currentIndex >= todos.length) {
			setCurrentIndex(Math.max(0, todos.length - 1));
		}
	}, [todos, currentIndex]);

	const goToPrevious = (): void => {
		setCurrentIndex((prevIndex) => {
			const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
			setLastViewedIndex(newIndex);
			return newIndex;
		});
	};

	const goToNext = (): void => {
		setCurrentIndex((prevIndex) => {
			const newIndex =
				prevIndex < todos.length - 1 ? prevIndex + 1 : prevIndex;
			setLastViewedIndex(newIndex);
			return newIndex;
		});
	};

	const handleLoadMore = (): void => {
		onLoadMore();
		setLastViewedIndex(currentIndex);
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
						editable={todos[currentIndex].userId === userId}
					/>
				)}
			</div>
			<div className={rightControlsStyles}>
				{currentIndex === todos.length - 1 && hasMoreTodos ? (
					<Button onClick={handleLoadMore} disabled={!hasMoreTodos}>
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
