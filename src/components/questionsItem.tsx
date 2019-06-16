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

interface Props extends WithStyles <typeof styles> {
  questions: Questions[];
  addAnswer: (index: number, answer: boolean) => void;
  finishGame: () => void;
}

export const QuestionsItemInner  = (props: Props) => {
  const {questions, addAnswer, finishGame, classes} = props;
  const [questionIndex, setQuestionIndex] = React.useState(0);

  const nextOrFinish = () => {

    if (questionIndex < questions.length - 1)
      setQuestionIndex(questionIndex + 1)
    else
      finishGame();
  }

  
  return (
    <div className={classes.gameContainer}>
      {/* because questions array could be empty */}
      {questions.length > 0 &&
        <QuestionBox 
          question={ questions[questionIndex] } 
          addAnswer={(answer: boolean) => addAnswer(questionIndex, answer)}/> 
      }
      <div className={classes.questionCounter}>
        {`${questionIndex + 1} of 10`}
      </div>
      <div>
        <Button onClick={nextOrFinish}
          variant="contained" color="secondary">{questionIndex < (questions.length - 1) ? 'Next' : 'Finish'}</Button>
      </div>
    </div>
  );
}

export const QuestionsItem = withStyles(styles)(QuestionsItemInner);