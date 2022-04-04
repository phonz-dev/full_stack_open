import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";


const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [addedMessage, setAddedMessage] = useState(null);
	const [updatedMessage, setUpdatedMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		personService
			.getAll()
			.then(intitialPersons => {
				setPersons(intitialPersons);
			})
	}, [])

	const isPersonAdded = () => {
		return persons.some(({ name }) => name === newName)
	}

	const resetInputs = () => {
		setNewName("");
		setNewNumber("");
	}

	const updatePerson = () => {
		const msg = `${newName} is already added to phonebook, replace the old number with a new one?`
		if (window.confirm(msg)) {
			const person = persons.find(p => p.name === newName);
			const changedPerson = { ...person, number: newNumber };
			const id = changedPerson.id;

			personService
				.update(id, changedPerson)
				.then(returnedPerson => {
					setPersons(persons.map(person => person.id === id ? returnedPerson : person));
					setUpdatedMessage(`Updated ${returnedPerson.name}`)
					setTimeout(() => {
						setUpdatedMessage(null);
					}, 5000);
					resetInputs();
				})
				.catch(error => {
					setErrorMessage(`Information of ${person.name} has already been removed from the server`)
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
					resetInputs();
				})
		}
	}

	const addPerson = (event) => {
		event.preventDefault();

		if (isPersonAdded()) {
			updatePerson();
			return;
		}

		const newPerson = { name: newName, number: newNumber };
		personService
			.create(newPerson)
			.then(createdPerson => {
				setPersons(persons.concat(createdPerson));
				setAddedMessage(`Added ${createdPerson.name}`);
				setTimeout(() => {
					setAddedMessage(null);
				}, 5000);
				resetInputs();
			})
			.catch(error => {
				setErrorMessage(error.response.data);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				resetInputs();
			})
	};

	const handleNewName = (event) => {
		setNewName(event.target.value);
	};

	const handleNewNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilter = (event) => {
		setFilter(event.target.value);
	};

	const handleDelete = id => {
		const person = persons.find(person => person.id === id)
		const ok = window.confirm(`Delete ${person.name}?`)

		if (ok) {
			personService.remove(id);
			setPersons(persons.filter(person => person.id !== id))
		}
	}

	const personsToShow =
		filter === ""
			? persons
			: persons.filter(({ name }) =>
				name.toLowerCase().startsWith(filter.toLowerCase())
			);

	let messageToShow = null;
	if (addedMessage) {
		messageToShow = addedMessage;
	}
	if (updatedMessage) {
		messageToShow = updatedMessage;
	}
	if (errorMessage) {
		messageToShow = errorMessage;
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={messageToShow} isError={errorMessage} />
			<Filter value={filter} onChange={handleFilter} />
			<h3>Add a new</h3>
			<PersonForm
				onSubmit={addPerson}
				name={newName}
				number={newNumber}
				onNameChange={handleNewName}
				onNumChange={handleNewNumber}
			/>
			<h3>Numbers</h3>
			<Persons persons={personsToShow} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
