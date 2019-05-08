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
    // A new component is created in order to manage individual state component
    <QuestionsItem questions = {questions} />
  );
};