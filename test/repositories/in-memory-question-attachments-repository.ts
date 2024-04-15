import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  // public items: Question[] = [];
  public items = new Map<UniqueEntityID, QuestionAttachment>();

  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    return Array.from(this.items.values()).filter(
      item => item.questionId.toString() === questionId
    );
  }
}
