import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditQuestionUseCase } from './edit-question-use-case';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// system under test
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });
  it('should be able to edit a question', async () => {
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
      title: 'Pergunta teste',
      content: 'Novo conteúdo',
      questionId: newQuestion.id.toValue(),
    });
    // Alternative way
    // const { question } = await sut.execute({ slug: 'example-question' });
    expect(inMemoryQuestionsRepository.items.get(newQuestion.id)).toMatchObject({
      title: 'Pergunta teste',
      content: 'Novo conteúdo',
    });
  });

  it('should not be able to edit a question from another author', async () => {
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
    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        title: 'Pergunta teste',
        content: 'Novo conteúdo',
        questionId: newQuestion.id.toValue(),
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to edit an invalid question', async () => {
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
    expect(() => {
      return sut.execute({
        authorId: newQuestion.authorId.toString(),
        title: 'Pergunta teste',
        content: 'Novo conteúdo',
        questionId: 'question-2',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
