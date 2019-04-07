import * as React from 'react';
import { Questions } from '../model/questionsResults';

export const QuestionBox = (props: { question: Questions }) =>
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
