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
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova Resposta',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.answer.id).toBeInstanceOf(UniqueEntityID);
    expect(Array.from(inMemoryAnswersRepository.items.values())[0].id).toEqual(
      result.value?.answer.id
    );
  });
});
