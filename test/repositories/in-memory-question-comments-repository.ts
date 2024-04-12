import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  // public items: Question[] = [];
  public items = new Map<UniqueEntityID, QuestionComment>();

  async create(question: QuestionComment): Promise<void> {
    // this.items.push(question);
    this.items.set(question.id, question);
  }
}
