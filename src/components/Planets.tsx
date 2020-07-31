import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';

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
	const { data, status } = useQuery(['planets', page], fetchPlanets);
	console.log(data);
	console.log(status);
	return (
		<div>
			<h2>Planets</h2>
			<button onClick={() => setPage(1)}>Page 1</button>
			<button onClick={() => setPage(2)}>Page 2</button>
			<button onClick={() => setPage(3)}>Page 3</button>
			{status === 'error' && <div>Error fetching data.</div>}
			{status === 'loading' && <div>Loading</div>}
			{status === 'success' && (
				<div>
					{data.results.map((planet: Planet) => (
						<Planet {...planet} />
					))}
				</div>
			)}
		</div>
	);
};

export default Planets;
