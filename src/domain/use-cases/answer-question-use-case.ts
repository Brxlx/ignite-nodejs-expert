import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface Props {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}
  public async execute({ instructorId, questionId, content }: Props) {
    const answer = new Answer({ content, authorId: instructorId, questionId });
    console.log(answer);

    await this.answersRepository.create(answer);

    return answer;
  }
}
