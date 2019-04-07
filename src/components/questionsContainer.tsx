import * as React from "react";
import { questionsApi } from "../api/questionsAPI";
import { QuestionBox } from "./questionBox";

function useQuestions() {
  const [questions, setQuestions] = React.useState([]);

  const loadQuestions = () => {
    questionsApi.getAllQuestions().then(questions => setQuestions(questions));
  };

  return {  questions,  loadQuestions };
}

export const QuestionsContainerComponent = () => {
  const { questions, loadQuestions } = useQuestions();

  React.useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <table style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <tbody>
        {questions.map((question, index) => (
          <QuestionBox key={index} question={question} />
        ))}
      </tbody>
    </table>
  );
};
