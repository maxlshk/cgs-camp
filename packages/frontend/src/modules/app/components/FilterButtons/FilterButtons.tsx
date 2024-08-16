import * as React from 'react';
import { ButtonGroup, Button } from '@blueprintjs/core';
import { DisplayType } from '~shared/types/display.type';
import { useFilterStore } from '~store/filter.store';
import { buttonGroup } from './FilterButtons.styles.js';

interface FilterButtonsProps {
	updateFilters: (filterType: string, value: string | null) => void;
	displayType: DisplayType;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
	updateFilters,
	displayType,
}) => {
	const { filters } = useFilterStore();

	return (
		<ButtonGroup className={buttonGroup}>
			<Button
				icon={displayType === DisplayType.PHONE ? undefined : 'lock'}
				onClick={() =>
					updateFilters(
						'public',
						filters.public === false ? null : 'false',
					)
				}
				active={filters.public === false}
			>
				Private
			</Button>
			<Button
				icon={displayType === DisplayType.PHONE ? undefined : 'people'}
				onClick={() =>
					updateFilters(
						'public',
						filters.public === true ? null : 'true',
					)
				}
				active={filters.public === true}
			>
				Public
			</Button>
			<Button
				icon={displayType === DisplayType.PHONE ? undefined : 'tick'}
				onClick={() =>
					updateFilters(
						'status',
						filters.status === 'completed' ? null : 'completed',
					)
				}
				active={filters.status === 'completed'}
			>
				Completed
			</Button>
			<Button
				icon={displayType === DisplayType.PHONE ? undefined : 'target'}
				onClick={() =>
					updateFilters(
						'status',
						filters.status === 'active' ? null : 'active',
					)
				}
				active={filters.status === 'active'}
			>
				Active
			</Button>
		</ButtonGroup>
	);
};
