import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  // public items: Question[] = [];
  public items = new Map<UniqueEntityID, Question>();
  async create(question: Question): Promise<void> {
    // this.items.push(question);
    this.items.set(question.id, question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = Array.from(this.items.values()).find(item => slug === item.slug.value);

    if (!question) return null;

    return question;
  }
}
