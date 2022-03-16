import Person from "./Person";
import personService from '../services/persons';



const Persons = ({ persons }) => {
	const deletePersonOf = ({ id, name }) => {
		if (window.confirm(`Delete ${name}?`)) {
			personService.remove(id);
			window.location.reload();
		}
	}

	return (
		<ul>
			{persons.map((person) => (
				<Person
					key={person.name}
					name={person.name}
					number={person.number}
					onClick={() => deletePersonOf(person)}
				/>
			))}
		</ul>
	);
};

export default Persons;
