import * as React from 'react';
import { QuestionBox } from "./questionBox";
import { Questions } from "../model/questionsResults";
import { Button } from "@material-ui/core";

interface State {
  questionIndex: number
}

interface Props {
  questions: Questions[];
}

export class QuestionsItem extends React.Component<Props, State> {

  constructor (props) {
    super(props);
    this.state = { questionIndex: 0 };
  }

  public render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    
    return (
      <div>
        {/* because questions array could be empty */}
        {questions.length > 0 && <QuestionBox question={ questions[questionIndex] } /> }
        <div>
          {`${questionIndex + 1} of 10`}
        </div>
        <div>
          <Button onClick={() => this.setState({ questionIndex: questionIndex + 1 })}
            variant="contained" color="secondary">Next</Button>
        </div>
      </div>
    )
  }
}