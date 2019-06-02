import * as React from 'react';
import { Card, CardHeader, CardContent, WithStyles, createStyles, withStyles, Button, ButtonBase, StepButton } from "@material-ui/core";
import { Result } from '../model/questionsResults';
import { ResultsContainer } from './resultsContainer';
import { QuestionsContainerComponent } from './questionsContainer';

const styles = theme =>
  createStyles({
    card: {
      maxWidth: 400,
      margin: "0 auto",
      alignContent: 'center'
    },
    cardHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      padding: 30,
      marginBottom: 60,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Arial'
    },
    button: {
marginBottom: 20,
    }
  });

  //Used to try fuinal result view
  /* const resultFinish: Result = {
    results: [
      {
        category: "",
        type: "",
        difficulty: "",
        question: "aaaaaaaa",
        correct_answer: "True",
        incorrect_answers: [""],
        user_answer: true
      },
      {
        category: "",
        type: "",
        difficulty: "",
        question: "bbbbbb",
        correct_answer: "True",
        incorrect_answers: [""],
        user_answer: false
      }
    ],
    response_code: 1
  } */

interface HomeProps extends WithStyles<typeof styles> {}

const HomeComponent = (props: HomeProps) => {
    const [begin, setBegin] = React.useState(false);
    const [result, setResult] = React.useState(null);

    const finishGame = (result: Result) => {
        setBegin(false);
        setResult(result);
    }

    const resetGame = () => {
        setBegin(true);
        setResult(null);
    }

    const renderQuestions = () => {
        return (
            <React.Fragment>
              <div   className={classes.cardHeader} >
                <div className={classes.cardHeader}>You will be presented with 10 true or false questions</div>
                <div className={classes.cardHeader}>Can you score 100%?</div>

                <div  className={classes.card}>
                <Button onClick= { () => this.setState({ begin: true})}
                  variant="contained" color="secondary" className={classes.button}>Begin</Button>
                </div>
              </div>
            { begin && <QuestionsContainerComponent setFinalResult={finishGame}/> }
            </React.Fragment>
          )
    }

    const renderFinalResult = () => {
        return (
            <ResultsContainer
              result={result}
              resetGame={resetGame}
            />
          )
    }

    //Even it's referenced above, we can define it here due to JS hoisting
    const { classes } = props;
    return (
        <Card className={classes.card}>
          {!result && <CardHeader className= {classes.cardHeader} 
           title="Welcome to the trivia challenge" />}
          <CardContent>
          { result ? renderFinalResult() : renderQuestions() }
          </CardContent>
        </Card>
    )
}

export const Home = withStyles(styles)(HomeComponent);