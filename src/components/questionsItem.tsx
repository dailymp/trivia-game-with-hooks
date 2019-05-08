import * as React from 'react';
import { QuestionBox } from "./questionBox";
import { Questions } from "../model/questionsResults";

interface State {
  questionIndex: number
}

interface Props {
  questions: Questions[];
}

export class QuestionsItem extends React.Component<Props, State> {

  constructor (props) {
    super(props);
    this.state = { questionIndex: 0 }
  }

  public render() {
    const { questions } = this.props
    const { questionIndex } = this.state
    
    return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      {/* because first render is null, we want to be sure it returns the result when it exists: */}
      {questions.length > 0 && <QuestionBox question={ questions[questionIndex] } /> }

    </div>
    )
  }
}


{/* <table style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
<tbody>
  {questions.map((question, index) => (
    <QuestionBox key={index} question={question} />
  ))}
</tbody>
</table> */}