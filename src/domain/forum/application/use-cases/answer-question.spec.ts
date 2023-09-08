import { AnswerQuestionUseCase } from './answer-question-use-case';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../../enterprise/entities/answer';

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test('create answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answerQuestion = await answerQuestionUseCase.execute({
    content: 'Nova Resposta',
    questionId: '1',
    instructorId: '1',
  });

  expect(answerQuestion.content).toEqual('Nova Resposta');
});
