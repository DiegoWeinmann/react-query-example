import React, { FC } from 'react';

export interface NavbarProps {
	setPage: (page: string) => void;
}

const Navbar: FC<NavbarProps> = ({ setPage }) => {
	return (
		<nav>
			<button onClick={() => setPage('planets')}>Planets</button>
			<button onClick={() => setPage('people')}>People</button>
		</nav>
	);
};

export default Navbar;
