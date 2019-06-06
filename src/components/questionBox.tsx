import * as React from 'react';
import { Questions } from '../model/questionsResults';
import { WithStyles, withStyles, createStyles, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

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
    }
  });


interface Props extends WithStyles<typeof styles> { question: Questions }

/*
 * I wanted this component to be a stateless/presentational component with typescript and material-UI. 
 * However, after a while trying to get it working, I decided to make it a class component instead
 */
export class QuestionBoxInner extends React.Component<Props> {

  public render() {
    const { classes, question } = this.props;

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
                <RadioGroup>
                  <FormControlLabel value="true" control={<Radio />} label="True" />
                  <FormControlLabel value="false" control={<Radio />} label="False" />
                </RadioGroup>
            }
          </div>
        </div>

      </div>
    )
  }
}


export const QuestionBox = withStyles(styles)(QuestionBoxInner);
