import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  // public items: Answer[] = [];
  public items = new Map<UniqueEntityID, AnswerComment>();

  async create(answer: AnswerComment): Promise<void> {
    // this.items.push(answer);
    this.items.set(answer.id, answer);
  }
}
