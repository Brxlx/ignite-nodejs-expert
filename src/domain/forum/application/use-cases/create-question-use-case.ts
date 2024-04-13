import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { Either, right } from '@/core/types/either';

interface CreateQuestionRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    authorId,
    title,
    content,
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const question = Question.create({ authorId: new UniqueEntityID(authorId), title, content });

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
