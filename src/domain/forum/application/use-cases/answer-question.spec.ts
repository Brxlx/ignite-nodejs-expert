import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { AnswerQuestionUseCase } from './answer-question-use-case';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
// system under test
let sut: AnswerQuestionUseCase;

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should be able to create answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova Resposta',
    });

    expect(answer.id).toBeTruthy();
    expect(answer.id).toBeInstanceOf(UniqueEntityID);
    expect(inMemoryAnswersRepository.items.get(answer.id)?.id).toEqual(answer.id);
  });
});
