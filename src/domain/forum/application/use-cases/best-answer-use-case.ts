import { AnswersRepository } from '../repositories/answers-repository';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface BestAnswerQuestionRequest {
  answerId: string;
  authorId: string;
}
interface BestAnswerQuestionResponse {
  question: Question;
}

export class BestAnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository
  ) {}

  public async execute({
    answerId,
    authorId,
  }: BestAnswerQuestionRequest): Promise<BestAnswerQuestionResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) throw new Error('Answer not found.');

    const question = await this.questionsRepository.findById(answer.questionId.toString());

    if (!question) throw new Error('Question not found.');

    if (authorId !== question.authorId.toString()) throw new Error('Author not allowed.');

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return { question };
  }
}
