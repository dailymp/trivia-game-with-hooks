import * as React from 'react';
import { Questions } from '../model/questionsResults';
import { WithStyles, withStyles, createStyles, RadioGroup, FormControlLabel, Radio, colors } from "@material-ui/core";
import { thisExpression } from '@babel/types';

// styles is an object created with createStyles.
const styles = theme =>
  createStyles({
    mainQuestionContainer: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px', 
      textAlign: 'center'
    },
    questionCategory: {
      height: 100,
    },
    questionContainer: {
      width: '80%',
      padding: 25,
      border: 'solid black 1px', 
      marginRight: 'auto',
      marginLeft: 'auto' 
    },
    questionText: {
      height: 150,
      overflow: 'auto'
    },
    RadioContainer: {
      display: 'flex', 
      justifyContent: 'center'
    },
    questionWrong: {
      '& span': {
        color: colors.red[500],
      }
    },
    questionRight: {
      '& span': {
        color: colors.green[500],
      }
    },
    question: {}
  });

const booleanValues = {true: 'True', false: 'False'}

interface Props extends WithStyles<typeof styles> {
  question: Questions;
  addAnswer: (answer: boolean) => void;
}

/*
 * I wanted this component to be a stateless/presentational component with typescript and material-UI. 
 * However, after a while trying to get it working, I decided to make it a class component instead
 */
export const QuestionBoxInner = (props:Props) => {

  const {classes, addAnswer, question} = props;
  const [checked, setChecked] = React.useState('');

  React.useEffect(() => {
    setChecked('');
  }, [props.question])

  const handleChange = (event: any) => {
    addAnswer(event.target.value === booleanValues.true)
    setChecked(event.target.value);
  }

  const getStyleClass = (radioValue: string) => {
    if (checked === radioValue) {
      if (checked === question.correct_answer)
        return classes.questionRight;
      else if (checked !== question.correct_answer)
        return classes.questionWrong;
    } else 
      return classes.question;
  }

  return (
    <div className={classes.mainQuestionContainer}>
      <div className={classes.questionCategory}>
        <h2>{question.category}</h2>
      </div>
      
      <div className={classes.questionContainer}>
        <div className={classes.questionText}>
          <p>{question.question}</p>
        </div>
        <div className={classes.RadioContainer}>
          {
            question.type === 'boolean' &&
              <RadioGroup onChange={handleChange}>
                <FormControlLabel 
                  value={booleanValues.true} 
                  control={
                    <Radio 
                      className={`MuiButton ${getStyleClass(booleanValues.true)}`}
                      checked={checked === booleanValues.true} />
                  } 
                  label={booleanValues.true} />
                <FormControlLabel 
                  value={booleanValues.false} 
                  control={
                    <Radio 
                      className={`MuiButton ${getStyleClass(booleanValues.false)}`}
                      checked={checked === booleanValues.false} />
                  } 
                  label={booleanValues.false} />
              </RadioGroup>
          }
        </div>
      </div>
    </div>
  )
}

export const QuestionBox = withStyles(styles)(QuestionBoxInner);
