import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';

interface FetchRecentTopicsRequest {
  page: number;
}

interface FetchRecentTopicsResponse {
  questions: Question[];
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  public async execute({ page }: FetchRecentTopicsRequest): Promise<FetchRecentTopicsResponse> {
    const questions = await this.questionsRepository.findMostRecent({ page });

    return {
      questions,
    };
  }
}
