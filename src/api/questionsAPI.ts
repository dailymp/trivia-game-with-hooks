import Axios, { AxiosResponse } from 'axios';
import { Result } from '../model/questionsResults';

const apiUrl  = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';

const getResults = (): Promise<Result[]> => {
  const promise: Promise<Result[]> = new Promise((resolve, reject) => {
    try {
      Axios.get<Result[]>(apiUrl)
        .then(response => resolve(mapQuestionListApiToModel(response)));
    } catch (ex) {
      reject(ex);
    }
  });

  return promise;
};

const mapQuestionListApiToModel = ({ data }: AxiosResponse) =>
  data.results.map(question => question);

export const questionsApi = {
  getAllQuestions: getResults,
};
