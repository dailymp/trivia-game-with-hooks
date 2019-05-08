import * as React from 'react';
import { Questions } from '../model/questionsResults';
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

export const QuestionBox = (props: { question: Questions }) =>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>{props.question.category}</h2>
    
    <div style={{ textAlign: 'center', padding: '30px', marginBottom: '10px', border: 'solid black 1px' }}>
      <div style={{ marginBottom: '20px' }}>
        {props.question.question}
      </div>
      <div>
        {
          props.question.type === 'boolean' &&
          <RadioGroup>
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        }
      </div>
    </div>
  </div>
