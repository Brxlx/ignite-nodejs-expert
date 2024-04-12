import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface CommentOnQuestionRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionResponse {
  questionComment: QuestionComment;
}

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

    if (!question) throw new Error('Question not found.');

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return { questionComment };
  }
}
