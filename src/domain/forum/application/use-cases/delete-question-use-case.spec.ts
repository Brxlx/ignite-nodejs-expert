import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteQuestionUseCase } from './delete-question-use-case';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// system under test
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });
  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    );
    await inMemoryQuestionsRepository.create(newQuestion);
    // Prefered way
    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
    });
    // Alternative way
    // const { question } = await sut.execute({ slug: 'example-question' });
    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a question from another author', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    );
    await inMemoryQuestionsRepository.create(newQuestion);
    // Prefered way
    // await sut.execute({ authorId: 'author-2', questionId: 'question-1' });
    // const a = await sut.execute({ questionId: 'question-1' });
    // Alternative way
    // const { question } = await sut.execute({ slug: 'example-question' });
    const result = await sut.execute({ authorId: 'author-2', questionId: 'question-1' });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it('should not be able to delete an invalid question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    );
    await inMemoryQuestionsRepository.create(newQuestion);
    // Prefered way
    // await sut.execute({ authorId: 'author-2', questionId: 'question-1' });
    // const a = await sut.execute({ questionId: 'question-1' });
    // Alternative way
    // const { question } = await sut.execute({ slug: 'example-question' });
    const result = await sut.execute({ authorId: 'author-1', questionId: 'question-2' });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
