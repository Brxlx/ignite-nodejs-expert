import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { Either, left, right } from '@/core/types/either';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';

interface CommentOnQuestionRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) {}

  public async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) left(new ResourceNotFoundError());

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return right({ questionComment });
  }
}
