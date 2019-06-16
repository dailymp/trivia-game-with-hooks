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

interface State { checked: string }

/*
 * I wanted this component to be a stateless/presentational component with typescript and material-UI. 
 * However, after a while trying to get it working, I decided to make it a class component instead
 */
export class QuestionBoxInner extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {checked: ''};
  }

  componentWillReceiveProps = (nextProps: Props) => {    
    if (this.props.question !== nextProps.question) {
      this.setState({checked: ''})
    }
  }

  private handleChange = (event: any) => {
    const {addAnswer, question} = this.props;

    addAnswer(event.target.value === booleanValues.true)
    this.setState({checked: event.target.value})
  }

  private getStyleClass = (radioValue: string) => {
    const { checked } = this.state;
    const { classes , question} = this.props;

    if (checked === radioValue) {
      if (checked === question.correct_answer)
        return classes.questionRight;
      else if (checked !== question.correct_answer)
        return classes.questionWrong;
    } else 
      return classes.question;
  }

  public render() {
    const { classes, question } = this.props;
    const { checked } = this.state;

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
                <RadioGroup onChange={this.handleChange}>
                  <FormControlLabel 
                    value={booleanValues.true} 
                    control={
                      <Radio 
                        className={`MuiButton ${this.getStyleClass(booleanValues.true)}`}
                        checked={checked === booleanValues.true} />
                    } 
                    label={booleanValues.true} />
                  <FormControlLabel 
                    value={booleanValues.false} 
                    control={
                      <Radio 
                        className={`MuiButton ${this.getStyleClass(booleanValues.false)}`}
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
}

export const QuestionBox = withStyles(styles)(QuestionBoxInner);
