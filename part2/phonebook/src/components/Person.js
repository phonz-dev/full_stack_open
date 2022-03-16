const Person = ({ name, number, onClick }) => (
	<li>
		{name} {number}
		<button onClick={onClick}>delete</button>
	</li>
);

export default Person;
