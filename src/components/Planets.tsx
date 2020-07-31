import React, { FC, useState } from 'react';
import { usePaginatedQuery } from 'react-query';

interface Planet {
	name: string;
	population: string;
	terrain: string;
}

interface PlanetProps extends Planet {}

const Planet: React.FC<PlanetProps> = ({ name, population, terrain }) => {
	return (
		<div className="card">
			<h3>{name}</h3>
			<p>Population - {population}</p>
			<p>Terrain - {terrain}</p>
		</div>
	);
};

export interface PlanetsProps {}

const fetchPlanets = async (_key: string, page: number) => {
	console.log(page);
	const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
	return res.json();
};

const Planets: FC<PlanetsProps> = () => {
	const [page, setPage] = useState(1);
	const { resolvedData, latestData, status } = usePaginatedQuery(
		['planets', page],
		fetchPlanets
	);
	console.log(resolvedData);
	console.log(status);
	return (
		<div>
			<h2>Planets</h2>
			{status === 'error' && <div>Error fetching data.</div>}
			{status === 'loading' && <div>Loading</div>}
			{status === 'success' && (
				<>
					<button
						onClick={() => setPage((prevState) => Math.max(prevState - 1, 1))}
						disabled={page === 1}
					>
						Previous Page
					</button>
					<span>{page}</span>
					<button
						onClick={() =>
							setPage((prevState) =>
								!latestData || !latestData.next ? prevState : prevState + 1
							)
						}
						disabled={!latestData || !latestData.next}
					>
						Previous Page
					</button>
					<div>
						{resolvedData.results.map((planet: Planet) => (
							<Planet {...planet} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Planets;
