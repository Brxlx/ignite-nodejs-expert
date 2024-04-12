import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer-use-case';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
// system under test
let sut: CommentOnAnswerUseCase;

describe('Comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
  });
  it('should be able to comment on answer', async () => {
    const newAnswer = makeAnswer({});

    await inMemoryAnswersRepository.create(newAnswer);

    const { answerComment } = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: 'Comentário teste',
    });

    console.log(inMemoryAnswerCommentsRepository.items);

    expect(inMemoryAnswerCommentsRepository.items.get(answerComment.id)?.content).toEqual(
      'Comentário teste'
    );
  });
});