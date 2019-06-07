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

interface State {
  begin: boolean;
  result: Result;
}

interface Props extends WithStyles<typeof styles> { }

const resultFinish: Result = {
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
}

export class AppInner extends React.Component<Props, State> {
  /**
   *
   */
  constructor(props: Props) {
    super(props);
    this.state = { begin: false, result: resultFinish }
    this.finishGame = this.finishGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  public finishGame(result: Result) {
    this.setState({ result, begin: false });
  }

  public resetGame() {
    this.setState({ result: null, begin: true});
  }

  public renderHome() {
    const { classes } = this.props;
    const { begin, result } = this.state;
    
    return (
      <React.Fragment>
      {!begin ?
        <div className={classes.cardHeader} >
          <div className={classes.cardHeader}>You will be presented with 10 true or false questions</div>
          <div className={classes.cardHeader}>Can you score 100%?</div>

          <div  className={classes.card}>
          <Button onClick= { () => this.setState({ begin: true})}
            variant="contained" color="secondary" className={classes.button}>Begin</Button>
          </div>
        </div>
      : <QuestionsContainerComponent setFinalResult={this.finishGame}/> }
      </React.Fragment>
    )
  }

  public render() {
    const { classes } = this.props;
    const { begin, result } = this.state;

    return (
      <>
        <Card className={classes.card}>
          {!begin && !result && <CardHeader className={classes.cardHeader} title="Welcome to the trivia challenge" /> }
          
          <CardContent>
            {result ?
              <ResultsContainer
                result={result}
                resetGame={this.resetGame}
              />
              :
              this.renderHome()
            }

          </CardContent>
        </Card>
      </>
    );
  }
}


export const App = withStyles(styles)(AppInner)