import * as React from 'react';
import { Questions } from '../model/questionsResults';
interface QuestionBoxProps {
  question: Questions,
  answerQuestion: (index: number, answer: boolean) => void
}
export const QuestionBox = (props: QuestionBoxProps) =>
  <tr>
    <td>
      <span>{props.question.category}</span>
    </td>
    <td>
      <span>{props.question.type}</span>
    </td>
    <td>
      <span>{props.question.question}</span>
    </td>
  </tr>
