import React, { ReactElement } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import {
	Popover,
	Menu,
	Button,
	Alignment,
	Navbar as BlueprintNavbar,
} from '@blueprintjs/core';

export const Navbar = (): ReactElement => {
	const navigator = useNavigate();

	return (
		<>
			<BlueprintNavbar>
				<BlueprintNavbar.Group align={Alignment.LEFT}>
					<Button
						className="bp5-minimal justify-between"
						onClick={() => navigator(ROUTER_KEYS.DASHBOARD)}
						icon="home"
						text="Dashboard"
					/>
					<Button
						className="bp5-minimal"
						onClick={() => navigator(ROUTER_KEYS.NEW)}
						icon="add"
						text="New Todo"
					/>
				</BlueprintNavbar.Group>
				<div className="bp5-navbar-group bp5-align-right">
					<Popover
						content={
							<Menu>
								<li>
									<NavLink
										className="bp5-menu-item"
										tabIndex={0}
										to={ROUTER_KEYS.EDIT_PROFILE}
									>
										Edit Profile
									</NavLink>
								</li>
								<li>
									<NavLink
										className="bp5-menu-item"
										tabIndex={0}
										to={ROUTER_KEYS.CHANGE_PASSWORD}
									>
										Change Password
									</NavLink>
								</li>
								<li className="bp5-menu-divider"></li>
								<li>
									<NavLink
										className="bp5-menu-item bp5-intent-danger"
										tabIndex={0}
										to={ROUTER_KEYS.LOGIN}
									>
										Log Out
									</NavLink>
								</li>
							</Menu>
						}
						placement="bottom"
					>
						<Button
							alignText="left"
							icon="person"
							rightIcon="caret-down"
							text="Profile"
						/>
					</Popover>
				</div>
			</BlueprintNavbar>
		</>
	);
};
