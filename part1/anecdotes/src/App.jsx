import {useState} from 'react'

const Heading = ({text}) => {
    return (
        <>
            <h1>{text}</h1>
        </>
    )
}

const Anecdote = ({text}) => {
    return (
        <>
            {text}
        </>
    )
}

const AnecdoteWithVoteCount = ({text, count}) => {
    return (
        <>
            <Anecdote text={text}/>
            <div>has {count} votes</div>
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

const App = () => {
    const [selected, setSelected] = useState(0)
    const [mostVoted, setMostVoted] = useState({index: 0, count: 0})

    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    const numAnecdotes = anecdotes.length
    const [votes, setVotes] = useState(new Array(numAnecdotes).fill(0))


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    const getRandomIndexForAnecdotes = () => {
        return getRandomInt(0, numAnecdotes)
    }

    const nextRandomAnecdote = () => {
        const nextIndex = getRandomIndexForAnecdotes()
        setSelected(nextIndex)
    }

    const registerVote = () => {
        const updatedVoteCount = votes[selected] + 1
        if (updatedVoteCount > mostVoted.count) {
            const newMostVoted = {
                index: selected,
                count: updatedVoteCount
            }
            setMostVoted(newMostVoted)
        }

        const votesCopy = {...votes}
        votesCopy[selected] = updatedVoteCount
        setVotes(votesCopy)
    }

    return (
        <>
            <Heading text="Anecdote of the day"/>
            <AnecdoteWithVoteCount text={anecdotes[selected]} count={votes[selected]}/>
            <Button text="vote" handleClick={registerVote}/>
            <Button text="next anecdote" handleClick={nextRandomAnecdote}/>

            <Heading text="Anecdote with most votes"/>
            <Anecdote text={anecdotes[mostVoted.index]}/>
        </>
    )
}

export default App
