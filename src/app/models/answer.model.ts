export class Answer {
    id: number;
    answer: string;
    user?: {
        id: number,
        userName?: string
    };
}