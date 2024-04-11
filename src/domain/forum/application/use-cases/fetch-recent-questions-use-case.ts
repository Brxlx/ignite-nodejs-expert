import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';

interface FetchRecentQuestionsRequest {
  page: number;
}

interface FetchRecentQuestionsResponse {
  questions: Question[];
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({
    page,
  }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
    const questions = await this.questionsRepository.findMostRecent({ page });

    return {
      questions,
    };
  }
}
