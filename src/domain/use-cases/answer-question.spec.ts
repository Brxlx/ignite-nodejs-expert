import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../entities/answer';

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test('create answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository);
  console.log(answerQuestionUseCase);

  const answerQuestion = await answerQuestionUseCase.execute({
    content: 'Nova Resposta',
    questionId: '1',
    instructorId: '1',
  });

  expect(answerQuestion.content).toEqual('Nova Resposta');
});
