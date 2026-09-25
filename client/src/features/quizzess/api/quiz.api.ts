import api from "../../../lib/api";
import type { CreateQuizApiResponse, CreateQuizInput, GetQuizResponse, GetQuizResultsResponse, GetQuizzesResponse, Quiz, QuizDetails, QuizResult, SubmitQuizAnswer, SubmitQuizApiResponse, SubmitQuizResponse } from "../types/quiz.types";

export const getQuizzes = async (): Promise<Quiz[]> => {
    const response = await api.get<GetQuizzesResponse>("/quizzes");

    return response.data.data;
};

export const getQuizById = async (id: string): Promise<QuizDetails> => {
    const response = await api.get<GetQuizResponse>(`/quizzes/${id}`);

    return response.data.data;
};

export const submitQuiz = async (id: string, answers: SubmitQuizAnswer[]): Promise<SubmitQuizResponse> => {
    const response = await api.post<SubmitQuizApiResponse>(`/quizzes/${id}/submit`,
        {
            answers,
        }
    );

    return response.data.data;
};


export const createQuiz = async (data: CreateQuizInput): Promise<Quiz> => {
  const response = await api.post<CreateQuizApiResponse>(
    "/quizzes",
    data
  );

  return response.data.data;
};

export const getQuizResults = async ( id: string ): Promise<QuizResult[]> => { 
    const response = await api.get<GetQuizResultsResponse>( `/quizzes/${id}/results` );
     return response.data.data;
 };