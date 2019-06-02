import * as React from "react";
import { Result, Questions } from "../model/questionsResults";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
const centeredElement = {"display": "flex", "align-items": "center", 
"justify-content": "center", "flex-direction": "column"};

const styles = theme =>
  createStyles({
    Score: centeredElement,
    PlayAgain: {...centeredElement, "marginTop": "1rem"},
    Result: {"display": "flex", "align-items": "center", "justify-content": "left", "border":"1px solid black", "padding": "0.5rem"}
  });

interface resultsContainerProps extends WithStyles<typeof styles> {
    result: Result;
    resetGame: () => void;
}

const checkIfAnswerIsCorrect = (question: Questions): boolean => {
    return question.correct_answer.toLocaleLowerCase() === 
    question.user_answer.toString();
}

const ResultsContainerComponent = (props: resultsContainerProps) => {
    const { result, resetGame, classes } = props;
    const getScore = () => {
        return result.results.reduce((i,c,f) => checkIfAnswerIsCorrect(c) ? f++ : f, 0);
    }
    return (
        <React.Fragment>
            <div className={classes.Score}>
            <h3>You scored </h3>
            <h3>{` ${getScore()}/${result.results.length} `}</h3>
            </div>
            {
                result.results.map(question => {
                    return (
                        <div className={classes.Result}>
                            <span style={{"padding": 10}}>
                            {checkIfAnswerIsCorrect(question) ?
                                 <DoneIcon/> : <ClearIcon/>}</span>
                            <p>{question.question}</p>
                        </div>
                    )
                })
            }
            {<div className={classes.PlayAgain}>
            <button onClick={() => resetGame()}>Play Again?</button>
            </div>}
        </React.Fragment>
    );
};

export const ResultsContainer = withStyles(styles)(ResultsContainerComponent);