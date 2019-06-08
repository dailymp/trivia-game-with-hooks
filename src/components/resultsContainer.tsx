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
    scoreHeaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        marginBottom: 60,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        justifyContent: 'flex-start'
    },
    cardHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Arial',
      justifyContent: 'center'
    },
    questionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        fontFamily: 'Arial',
        alignContent: 'center',
        margin: '20px 10px',
    },
    question: {
        marginLeft: '10px',
    },
    icon: {
      marginLeft: '0px',
    },
    iconError: {
      color: red[500],
    },
    iconCorrect: {
      color: green[500],
    },
    footerButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
    }
  });


interface Props extends WithStyles<typeof styles> {
    result: Result;
    resetGame: () => void;
}

export const ResultsInner = (props: Props) => {
    React.useEffect(() => {
        loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
        );
    }, []);

    const  checkIfAnswerIsCorrect = (question: Questions): boolean => {
        return question.user_answer.toString().toLowerCase() === question.correct_answer.toLowerCase();
    }

    const renderCorrectIcon = () => {
        const { classes } = props;
        return <Icon className={clsx(classes.iconCorrect, 'fas fa-plus')} fontSize="small" />
    }

    const renderErrorIcon = () => {
        const { classes } = props;
        return <Icon className={clsx(classes.icon, classes.iconError, 'fas fa-minus')} fontSize="small" />
    }

    const getScore = () => {
        const { result } = props;
        return result.results.reduce((i,c,f) => checkIfAnswerIsCorrect(c) ? f++ : f, 0);
    }
    
        const { result, resetGame, classes } = props;
        return (
            <React.Fragment>
                <div className={classes.scoreHeaderContainer}>
                    <div className={classes.cardHeader}>
                        <span>{'You scored'}</span>
                    </div>
                    <div className={classes.cardHeader}>
                        <span>{`${getScore()}/${result.results.length}`}</span>
                    </div>
                </div>
                {
                    result.results.map(question => {
                        return (
                            <div className={classes.questionContainer} key={Math.random()}>
                                {checkIfAnswerIsCorrect(question) ? 
                                    renderCorrectIcon() 
                                    : renderErrorIcon()
                                }
                                <span className={classes.question}>{question.question}</span>
                            </div>
                        )
                    })
                }
                <div className={classes.footerButtonContainer}>
                    <Button 
                        onClick={() => resetGame()}
                        variant="contained" 
                        color="secondary">
                            Play again?
                    </Button>
                </div>
            </React.Fragment>
        );
}


export const ResultsContainer = withStyles(styles)(ResultsInner)
