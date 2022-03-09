import { useState } from "react";

const Statistics = (props) => {
	const { good, neutral, bad, total, average, positiveRate } = props;

	return (
		<>
			<h2>statistics</h2>
			<p>
				good <span>{good}</span>
			</p>
			<p>
				neutral <span>{neutral}</span>
			</p>
			<p>
				bad <span>{bad}</span>
			</p>
			<p>all {total}</p>
			<p>average {average}</p>
			<p>positive {positiveRate} %</p>
		</>
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
			<h1>give feedback</h1>

			<div>
				<button onClick={() => setGood(good + 1)}>good</button>
				<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
				<button onClick={() => setBad(bad + 1)}>bad</button>
			</div>

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
