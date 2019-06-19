import * as React from "react";
import { questionsApi } from "../api/questionsAPI";
import { QuestionsItem } from "./questionsItem";
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

    const currentQuestion = questions[index];
    currentQuestion.user_answer = answer;

    const questionsUpdated = [
      ...questions.slice(0, index), // questions before current update
      currentQuestion,
      ...questions.slice(index + 1) // questions after current update
    ]
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
    // As a first approach, a new component is created in order to manage the state in the component without having to use Hooks
    // The final version would be implemented using hooks instead
    <QuestionsItem 
      questions={questions}
      addAnswer={addAnswer}
      finishGame={finishGame}/>
  );
};