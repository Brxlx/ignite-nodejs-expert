import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug-use-case';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// system under test
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });
  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({});
    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({ slug: newQuestion.slug.value });

    if (result.isRight()) {
      expect(result.value?.question.title).toEqual(newQuestion.title);
    }

    expect(result.isRight()).toBeTruthy();
    // expect(Array.from(inMemoryQuestionsRepository.items.values())[0]).toEqual(result.value);
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
        slug: newQuestion.slug,
      }),
    });
    // expect(result.value?.question.slug).toEqual(newQuestion.slug);
  });
});
