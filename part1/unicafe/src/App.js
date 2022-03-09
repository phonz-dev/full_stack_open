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
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

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
		</div>
	);
};

export default App;
