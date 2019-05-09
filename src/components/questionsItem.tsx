import * as React from 'react';
import { QuestionBox } from "./questionBox";
import { Questions } from "../model/questionsResults";
import { WithStyles, withStyles, createStyles, Button } from "@material-ui/core";

// styles is an object created with createStyles.
const styles = theme =>
  createStyles({
    gameContainer: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
    },
    questionCounter: {
      marginBottom: '50px' 
    }
  });


interface State {
  questionIndex: number
}

interface Props extends WithStyles <typeof styles> {
  questions: Questions[];
}

export class QuestionsItemInner extends React.Component<Props, State> {

  constructor (props) {
    super(props);
    this.state = { questionIndex: 0 };
  }

  public render() {
    const { questions, classes } = this.props;
    const { questionIndex } = this.state;
    
    return (
      <div className={classes.gameContainer}>
        {/* because questions array could be empty */}
        {questions.length > 0 && <QuestionBox question={ questions[questionIndex] } /> }
        <div className={classes.questionCounter}>
          {`${questionIndex + 1} of 10`}
        </div>
        <div>
          {questionIndex < (questions.length - 1) && 
            <Button onClick={() => this.setState({ questionIndex: questionIndex + 1 })}
            variant="contained" color="secondary">Next</Button>
          }
        </div>
      </div>
    )
  }
}

export const QuestionsItem = withStyles(styles)(QuestionsItemInner);