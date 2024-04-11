import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditAnswerUseCase } from './edit-answer-use-case';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
// system under test
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });
  it('should be able to edit a answer', async () => {
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
      content: 'Novo conteúdo',
      answerId: newAnswer.id.toValue(),
    });
    // Alternative way
    // const { answer } = await sut.execute({ slug: 'example-answer' });
    expect(inMemoryAnswersRepository.items.get(newAnswer.id)).toMatchObject({
      content: 'Novo conteúdo',
    });
  });

  it('should not be able to edit a answer from another author', async () => {
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
      return sut.execute({
        authorId: 'author-2',
        content: 'Novo conteúdo',
        answerId: newAnswer.id.toValue(),
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to edit an invalid answer', async () => {
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
      return sut.execute({
        authorId: newAnswer.authorId.toString(),
        content: 'Novo conteúdo',
        answerId: 'answer-2',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
