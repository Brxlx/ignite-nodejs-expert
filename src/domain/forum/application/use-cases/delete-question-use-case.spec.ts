import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteQuestionUseCase } from './delete-question-use-case';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
// system under test
let sut: DeleteQuestionUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );

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

    await inMemoryQuestionAttachmentsRepository.create(
      makeQuestionAttachment(
        {
          questionId: newQuestion.id,
          attachmentId: new UniqueEntityID('1'),
        },
        new UniqueEntityID('attachment-1')
      )
    );

    await inMemoryQuestionAttachmentsRepository.create(
      makeQuestionAttachment(
        {
          questionId: newQuestion.id,
          attachmentId: new UniqueEntityID('2'),
        },
        new UniqueEntityID('attachment-2')
      )
    );
    // inMemoryQuestionAttachmentsRepository.items.set(
    //   new UniqueEntityID('attachment-2'),
    //   makeQuestionAttachment(
    //     {
    //       questionId: newQuestion.id,
    //       attachmentId: new UniqueEntityID('2'),
    //     },
    //     new UniqueEntityID('attachment-2')
    //   )
    // );

    // Prefered way
    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
    });
    // Alternative way
    // const { question } = await sut.execute({ slug: 'example-question' });
    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0);
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
