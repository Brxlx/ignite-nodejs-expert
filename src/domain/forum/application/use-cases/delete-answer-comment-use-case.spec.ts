import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { DeleteAnswerOnCommentUseCase } from './delete-answer-comment-use-case';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
// system under test
let sut: DeleteAnswerOnCommentUseCase;

describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerOnCommentUseCase(inMemoryAnswerCommentsRepository);
  });
  it('should be able to comment on answer', async () => {
    const newAnswerComment = makeAnswerComment({});

    await inMemoryAnswerCommentsRepository.create(newAnswerComment);

    await sut.execute({
      authorId: newAnswerComment.authorId.toString(),
      answerCommentId: newAnswerComment.id.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user answer comment', async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    });

    await inMemoryAnswerCommentsRepository.create(newAnswerComment);

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerCommentId: newAnswerComment.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
