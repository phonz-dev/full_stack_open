import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040 - 123456" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const addPerson = (event) => {
		event.preventDefault();

		if (persons.some(({ name }) => name === newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		const newPerson = { name: newName, number: newNumber };
		setPersons(persons.concat(newPerson));
		setNewName("");
		setNewNumber("");
	};

	const handleNewName = (event) => {
		setNewName(event.target.value);
	};

	const handleNewNumber = (event) => {
		setNewNumber(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name: <input value={newName} onChange={handleNewName} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNewNumber} />
				</div>

				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) => (
					<li key={person.name}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
