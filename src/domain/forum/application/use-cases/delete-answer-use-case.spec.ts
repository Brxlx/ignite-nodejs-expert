import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteAnswerUseCase } from './delete-answer-use-case';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
// system under test
let sut: DeleteAnswerUseCase;

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });
  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    );
    await inMemoryAnswersRepository.create(newAnswer);
    // Prefered way
    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
    });
    // Alternative way
    // const { answer } = await sut.execute({ slug: 'example-answer' });
    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a answer from another author', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    );
    await inMemoryAnswersRepository.create(newAnswer);
    // Prefered way
    // await sut.execute({ authorId: 'author-2', answerId: 'answer-1' });
    // const a = await sut.execute({ answerId: 'answer-1' });
    // Alternative way
    // const { answer } = await sut.execute({ slug: 'example-answer' });
    expect(() => {
      return sut.execute({ authorId: 'author-2', answerId: 'answer-1' });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to delete an invalid answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    );
    await inMemoryAnswersRepository.create(newAnswer);
    // Prefered way
    // await sut.execute({ authorId: 'author-2', answerId: 'answer-1' });
    // const a = await sut.execute({ answerId: 'answer-1' });
    // Alternative way
    // const { answer } = await sut.execute({ slug: 'example-answer' });
    expect(() => {
      return sut.execute({ authorId: 'author-1', answerId: 'answer-2' });
    }).rejects.toBeInstanceOf(Error);
  });
});
