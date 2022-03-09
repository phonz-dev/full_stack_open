import { useState } from "react";

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const Statistics = (props) => {
	const { good, neutral, bad, total, average, positiveRate } = props;

	if (total === 0) {
		return <p>No feedback given</p>;
	}

	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={neutral} />
				<StatisticLine text="bad" value={bad} />
				<StatisticLine text="all" value={total} />
				<StatisticLine text="average" value={average} />
				<StatisticLine text="positive" value={`${positiveRate} %`} />
			</tbody>
		</table>
	);
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
	];

	const getRandomIndex = (start, end) => {
		return Math.floor(Math.random() * (end - start) + start);
	};

	const getRandomAnecdotes = () => {
		const randomIdx = getRandomIndex(0, anecdotes.length);
		setSelected(randomIdx);
	};

	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [selected, setSelected] = useState(0);

	const total = good + neutral + bad;
	const average = ((good - bad) / total) * 1 || 0;
	const positiveRate = (good / total) * 100 || 0;

	return (
		<div>
			<h2>give feedback</h2>
			<div>
				<Button handleClick={() => setGood(good + 1)} text={"good"} />
				<Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"} />
				<Button handleClick={() => setBad(bad + 1)} text={"bad"} />
			</div>

			<h2>statistics</h2>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				total={total}
				average={average}
				positiveRate={positiveRate}
			/>

			<div>
				<div>{anecdotes[selected]}</div>
				<Button handleClick={getRandomAnecdotes} text="next anecdote" />
			</div>
		</div>
	);
};

export default App;
