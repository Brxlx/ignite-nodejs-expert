import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CreateQuestionUseCase } from './create-question-use-case';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// system under test
let sut: CreateQuestionUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });
  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    });

    expect(result.isRight()).toBeTruthy();
    expect(Array.from(inMemoryQuestionsRepository.items.values())[0]).toEqual(
      result.value?.question
    );

    // inMemoryQuestionsRepository.items.delete(question.id);
  });
});
