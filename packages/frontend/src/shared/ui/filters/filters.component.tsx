import { ButtonGroup, Button } from '@blueprintjs/core';
import React from 'react';
import {
	filterUpdateFunction,
	todoFilters,
} from '~shared/types/todo-filters.type';

interface FiltersProps {
	currentFilters: todoFilters;
	updateFilters: filterUpdateFunction;
}

export const Filters: React.FC<FiltersProps> = ({
	currentFilters,
	updateFilters,
}) => {
	return (
		<ButtonGroup>
			<Button
				icon="person"
				onClick={() => updateFilters('private', 'true')}
				active={currentFilters.private === 'true'}
			>
				Private
			</Button>
			<Button
				icon="people"
				onClick={() => updateFilters('private', 'false')}
				active={currentFilters.private === 'false'}
			>
				Public
			</Button>
			<Button
				icon="tick"
				onClick={() => updateFilters('status', 'completed')}
				active={currentFilters.status === 'completed'}
			>
				Completed
			</Button>
			<Button
				icon="cross"
				onClick={() => updateFilters('status', 'incomplete')}
				active={currentFilters.status === 'incomplete'}
			>
				Active
			</Button>
		</ButtonGroup>
	);
};
