import { Answer } from '../entities/answer';

interface Props {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  public execute({ instructorId, questionId, content }: Props) {
    return new Answer(content);
  }
}
