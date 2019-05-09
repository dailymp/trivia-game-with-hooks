import * as React from "react";
import { Result, Questions } from "../model/questionsResults";

interface resultsContainerProps {
    result: Result;
    resetGame: () => void;
}

const checkIfAnswerIsCorrect = (question: Questions): boolean => {
    return question.correct_answer.toLocaleLowerCase() === question.user_answer.toString();
}

const centeredElements = {"display": "flex", "align-items": "center", "justify-content": "center"};

export const ResultsContainer = (props: resultsContainerProps) => {
    const { result, resetGame } = props;
    const getScore = () => {
        return result.results.reduce((i,c,f) => checkIfAnswerIsCorrect(c) ? f++ : f, 0);
    }
    return (
        <React.Fragment>
            <div style={centeredElements}>
            <h3>You scored</h3>
            <h3>{`${getScore()}/${result.results.length}`}</h3>
            </div>
            {
                result.results.map(question => {
                    return (
                        <div style={{"display": "flex", "align-items": "center", "justify-content": "left"}}>
                            <span style={{"padding": 10}}>{checkIfAnswerIsCorrect(question) ? "+" : "-"}</span>
                            <p>{question.question}</p>
                        </div>
                    )
                })
            }
            {<div style={centeredElements}>
            <button onClick={() => resetGame()}>Play Again?</button>
            </div>}
        </React.Fragment>
    );
};