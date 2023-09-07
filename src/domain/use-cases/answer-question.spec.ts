import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create answer', () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase();

  const answerQuestion = answerQuestionUseCase.execute({ content: 'Nova Resposta', questionId: '1', instructorId: '1' });

  expect(answerQuestion.content).toEqual('Nova Resposta');

})