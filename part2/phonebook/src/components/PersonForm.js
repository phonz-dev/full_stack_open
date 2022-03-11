const PersonForm = (props) => {
	const { onSubmit, name, number, onNameChange, onNumChange } = props;

	return (
		<form onSubmit={onSubmit}>
			<div>
				name: <input value={name} onChange={onNameChange} />
			</div>
			<div>
				number: <input value={number} onChange={onNumChange} />
			</div>

			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
