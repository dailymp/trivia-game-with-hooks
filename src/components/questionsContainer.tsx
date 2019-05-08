import * as React from "react";
import { questionsApi } from "../api/questionsAPI";
import { QuestionsItem } from "./questionsItem";

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
    // As a first approach, a new component is created in order to manage the state in the component without having to use Hooks
    // The final version would be implemented using hooks instead
    <QuestionsItem questions = {questions} />
  );
};