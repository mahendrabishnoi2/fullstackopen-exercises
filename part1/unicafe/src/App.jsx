import {useState} from "react";

const Heading = ({text}) => {
    return (
        <>
            <h1>{text}</h1>
        </>
    )
}

const Button = ({text, handleClick}) => {
    return (
        <>
            <button onClick={handleClick}>{text}</button>
        </>
    )
}

const StatisticsLine = ({text, value}) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </>
    )
}

const Statistics = (props) => {
    const feedbacks = props.feedbacks
    const statisticsHeading = "statistics"

    const getFeedbackByName = (name) => {
        let result = {}
        feedbacks.forEach(f => {
            if (f.name === name) {
                result = f
            }
        })
        return result
    }

    const getTotalFeedbackCount = () => {
        let total = 0
        feedbacks.forEach(f => {
            total += f.count
        })
        return total
    }

    const totalFeedbacks = getTotalFeedbackCount()
    const positiveFeedback = getFeedbackByName("good")
    const neutralFeedback = getFeedbackByName("neutral")
    const badFeedback = getFeedbackByName("bad")
    const positiveFeedbackPercent = (positiveFeedback.count * 100.0) / totalFeedbacks
    const average = (positiveFeedback.count - badFeedback.count) / totalFeedbacks

    const showFeedback = totalFeedbacks > 0

    if (!showFeedback) {
        return (
            <>
                <Heading text={statisticsHeading}/>
                <p>No feedback given</p>
            </>
        )
    }

    return (
        <>
            <Heading text={statisticsHeading}/>

            <table>
                <tbody>
                <StatisticsLine text={positiveFeedback.name} value={positiveFeedback.count}/>
                <StatisticsLine text={neutralFeedback.name} value={neutralFeedback.count}/>
                <StatisticsLine text={badFeedback.name} value={badFeedback.count}/>

                <StatisticsLine text="average" value={average}/>
                <StatisticsLine text="positive" value={positiveFeedbackPercent + " %"}/>
                </tbody>
            </table>
        </>
    )
}

function App() {
    const giveFeedbackHeading = "give feedback"
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    const feedbacks = [
        {name: "good", count: good},
        {name: "neutral", count: neutral},
        {name: "bad", count: bad}
    ]

    return (
        <>
            <Heading text={giveFeedbackHeading}/>

            <Button text="good" handleClick={handleGood}/>
            <Button text="neutral" handleClick={handleNeutral}/>
            <Button text="bad" handleClick={handleBad}/>

            <Statistics feedbacks={feedbacks}/>
        </>
    )
}

export default App
