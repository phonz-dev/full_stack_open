const Total = ({ parts }) => {
	const total = parts.reduce((sum, { exercises }) => {
		return sum + exercises;
	}, 0);

	return <h3>total of {total} exercises</h3>;
};

export default Total;
