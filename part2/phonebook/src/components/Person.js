const Person = ({ name, number, handleDelete }) => (
	<li>
		{name} {number}
		<button onClick={handleDelete}>delete</button>
	</li>
);

export default Person;
