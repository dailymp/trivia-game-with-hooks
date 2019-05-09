import * as React from "react";
import { questionsApi } from "../api/questionsAPI";
import { QuestionBox } from "./questionBox";
import { Result, Questions } from "../model/questionsResults";

function useQuestions() {
  const [questions, setQuestions] = React.useState([]);
  const loadQuestions = () => {
    questionsApi.getAllQuestions().then(questions => setQuestions(questions));
  };

  return {  questions, loadQuestions, setQuestions };
}

interface QuestionsContainerProps {
  setFinalResult: (results: Result) => void;
}

export const QuestionsContainerComponent = (props: QuestionsContainerProps) => {
  const { setFinalResult } = props;
  const { questions, loadQuestions, setQuestions } = useQuestions();

  React.useEffect(() => {
    loadQuestions();
  }, []);

  const addAnswer = (index: number, answer: boolean) => {
    //Update answer questions using Immutable way
    const questionsUpdated = {
      ...questions.slice(0, index), // questions before current update
      ...questions[index], user_answer: answer,
      ...questions.slice(index + 1) // questions after current update
    }
    setQuestions(questionsUpdated);
  }

  //When game is finished
  const finishGame = () => {
    const result: Result = {
      response_code: Math.random(),
      results: questions,
    }
    setFinalResult(result);
  }

  return (
    <table style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <tbody>
        {questions.map((question, index) => (
          <QuestionBox key={index} question={question} answerQuestion={addAnswer}/>
        ))}
      </tbody>
    </table>
  );
};
