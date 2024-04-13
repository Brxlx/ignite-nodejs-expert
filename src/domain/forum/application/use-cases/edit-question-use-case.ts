import { Either, left, right } from '@/core/types/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface EditQuestionRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

type EditQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) return left(new ResourceNotFoundError());

    if (authorId !== question.authorId.toString()) return left(new NotAllowedError());

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return right({ question });
  }
}
