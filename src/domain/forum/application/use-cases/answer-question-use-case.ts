import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswersRepository } from '../repositories/answers-repository';

interface AnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  content: string;
}
interface AnswerQuestionResponse {
  answer: Answer;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });
    console.log(answer);

    await this.answersRepository.create(answer);

    return { answer };
  }
}
