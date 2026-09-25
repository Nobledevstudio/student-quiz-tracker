export interface Quiz {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    _count: {
        questions: number;
        results: number;
    };
}


export interface GetQuizzesResponse {
    success: boolean;
    data: Quiz[];
}

export interface QuizQuestion {
    id: string;
    text: string;
    options: string[];
}

export interface QuizDetails {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    questions: QuizQuestion[];
}

export interface GetQuizResponse {
    success: boolean;
    data: QuizDetails;
}

export interface SubmitQuizAnswer {
    questionId: string;
    answer: string;
}

export interface SubmitQuizResponse {
    score: number;
    total: number;
    percentage: number;
    submittedAt: string;
}

export interface SubmitQuizApiResponse {
    success: boolean;
    message: string;
    data: SubmitQuizResponse;
}


export interface CreateQuizQuestion {
    text: string;
    options: string[];
    correctAnswer: string;
}

export interface CreateQuizInput {
    title: string;
    questions: CreateQuizQuestion[];
}

export interface CreateQuizQuestion {
    text: string;
    options: string[];
    correctAnswer: string;
}

export interface CreateQuizApiResponse {
    success: boolean;
    message: string;
    data: Quiz;
}

export interface QuizResult { 
     id: string; score: 
     number; total: number; 
     percentage: number; 
     createdAt: string; 
}

export interface GetQuizResultsResponse{ 
    success: boolean; 
    data: QuizResult[]; 
}