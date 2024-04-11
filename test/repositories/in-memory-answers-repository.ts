import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  // public items: Answer[] = [];
  public items = new Map<UniqueEntityID, Answer>();

  async findById(id: string): Promise<Answer | null> {
    const answer = Array.from(this.items.values()).find(item => item.id.toString() === id);

    if (!answer) return null;

    return answer;
  }

  async create(answer: Answer): Promise<void> {
    // this.items.push(answer);
    this.items.set(answer.id, answer);
  }

  async save(answer: Answer): Promise<void> {
    // const answerIndex = Array.from(this.items.values()).findIndex(
    //   item => item.id === answer.id
    // );

    this.items.set(answer.id, answer);
  }

  async delete(answer: Answer): Promise<void> {
    const answerExists = Array.from(this.items.values()).find(item => item.id === answer.id);

    if (answerExists) {
      this.items.delete(answerExists.id);
    }
  }
}
