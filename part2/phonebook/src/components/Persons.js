import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
	return (
		<ul>
			{persons.map((person) => (
				<Person
					key={person.name}
					name={person.name}
					number={person.number}
					handleDelete={() => handleDelete(person.id)}
				/>
			))}
		</ul>
	);
};

export default Persons;
