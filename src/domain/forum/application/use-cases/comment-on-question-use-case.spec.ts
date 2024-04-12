import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { CommentOnQuestionUseCase } from './comment-on-question-use-case';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
// system under test
let sut: CommentOnQuestionUseCase;

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository
    );
  });
  it('should be able to comment on question', async () => {
    const newQuestion = makeQuestion({});

    await inMemoryQuestionsRepository.create(newQuestion);

    const { questionComment } = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      content: 'Comentário teste',
    });

    console.log(inMemoryQuestionCommentsRepository.items);

    expect(inMemoryQuestionCommentsRepository.items.get(questionComment.id)?.content).toEqual(
      'Comentário teste'
    );
  });
});
