import * as React from "react";
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import { Result, Questions } from "../model/questionsResults";
import { Button, WithStyles, createStyles, withStyles } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const styles = theme =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    icon: {
      margin: '10px',
    },
    iconError: {
      color: red[800],
    },
    iconCorrect: {
      color: green[800],
    },
  });

const centeredElements = {"display": "flex"};


interface Props extends WithStyles<typeof styles> {
    result: Result;
    resetGame: () => void;
}
export class ResultsInner extends React.Component<Props> {
    public componentDidMount = () => {
        loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
        );;
    }

    private checkIfAnswerIsCorrect = (question: Questions): boolean => {
        return question.user_answer;
    }

    private renderCorrectIcon = () => {
        const { classes } = this.props;
        return <Icon className={`${clsx(classes.iconCorrect, 'fas fa-plus')} ${classes.iconCorrect}`} color="secondary" fontSize="small" />
    }

    private renderErrorIcon = () => {
        const { classes } = this.props;
        return <Icon className={clsx(classes.icon, classes.iconError, 'fas fa-minus')} color="error" fontSize="small" />
    }

    private getScore = () => {
        const { result } = this.props;
        return result.results.reduce((i,c,f) => this.checkIfAnswerIsCorrect(c) ? f++ : f, 0);
    }
    
    public render() {
        const { result, resetGame, classes } = this.props;
        return (
            <React.Fragment>
                <div style={centeredElements}>
                <h3>{`You scored ${this.getScore()}/${result.results.length}`}</h3>
                </div>
                {
                    result.results.map(question => {
                        return (
                            <div style={{"display": "flex"}} key={Math.random()}>
                                <span style={{"padding": 10}}>
                                    {this.checkIfAnswerIsCorrect(question) ? 
                                        this.renderCorrectIcon() 
                                        : this.renderErrorIcon()
                                    }
                                </span>
                                <p>{question.question}</p>
                            </div>
                        )
                    })
                }
                {<div style={centeredElements}>
                <Button onClick={() => resetGame()}
                    variant="contained" color="secondary">Play again?
                </Button>
                </div>}
            </React.Fragment>
        );
    }
}


export const ResultsContainer = withStyles(styles)(ResultsInner)