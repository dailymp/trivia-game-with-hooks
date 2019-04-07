export interface Result {
  response_code: number;
  results: Questions[];
}
export interface Questions {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
export const createEmptyQuestion = (): Questions => ({
  category: "",
  type: "",
  difficulty: "",
  question: "",
  correct_answer: "",
  incorrect_answers: [""]
});
