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
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items.get(question.id)?.id).toEqual(question.id);

    inMemoryQuestionsRepository.items.delete(question.id);
  });
});
