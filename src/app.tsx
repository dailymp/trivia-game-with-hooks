import * as React from 'react';
import { QuestionsContainerComponent } from './components/questionsContainer';
import { Card, CardHeader, CardContent, WithStyles, createStyles, withStyles, Button, ButtonBase, StepButton } from "@material-ui/core";
import { ResultsContainer } from './components/resultsContainer';
import { Result } from './model/questionsResults';


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

interface Props extends WithStyles<typeof styles> { }

export const AppInner = (props:Props) => {
  const {classes} = props;
  const [begin, setBegin] = React.useState(false);
  const [result, setResult] = React.useState(null);


  const finishGame = (result: Result) => {
    setResult(result);
    setBegin(false);
  }

  const resetGame = () => {
    setResult(null);
    setBegin(true);
  }

  const renderHome = () => {    
    return (
      <React.Fragment>
      {!begin ?
        <div className={classes.cardHeader} >
          <div className={classes.cardHeader}>You will be presented with 10 true or false questions</div>
          <div className={classes.cardHeader}>Can you score 100%?</div>

          <div  className={classes.card}>
          <Button onClick= { () => setBegin(true)}
            variant="contained" color="secondary" className={classes.button}>Begin</Button>
          </div>
        </div>
      : <QuestionsContainerComponent setFinalResult={finishGame}/> }
      </React.Fragment>
    )
  }

  return (
    <>
      <Card className={classes.card}>
        {!begin && !result && <CardHeader className={classes.cardHeader} title="Welcome to the trivia challenge" /> }
        
        <CardContent>
          {result ?
            <ResultsContainer
              result={result}
              resetGame={resetGame}
            />
            :
            renderHome()
          }

        </CardContent>
      </Card>
    </>
  );
}


export const App = withStyles(styles)(AppInner)