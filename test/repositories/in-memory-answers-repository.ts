import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  // public items: Answer[] = [];
  public items = new Map<UniqueEntityID, Answer>();
  async create(answer: Answer): Promise<void> {
    // this.items.push(answer);
    this.items.set(answer.id, answer);
  }
}
