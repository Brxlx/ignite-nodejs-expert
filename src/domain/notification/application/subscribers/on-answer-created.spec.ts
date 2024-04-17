import { makeAnswer } from 'test/factories/make-answer';
import { OnAnswerCreated } from './on-answer-created';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import {
  SendNotificationRequest,
  SendNotificationResponse,
  SendNotificationUseCase,
} from '../use-cases/send-notification-use-case';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { makeQuestion } from 'test/factories/make-question';
import { SpyInstance } from 'vitest';
import { waitFor } from 'test/utils/wait-for';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAnswersAttachmentRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationRequest],
  Promise<SendNotificationResponse>
>;

describe('On answer created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository
    );
    inMemoryAnswersAttachmentRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswersAttachmentRepository);
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository);

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase);
  });

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    // expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    await waitFor(() => expect(sendNotificationExecuteSpy).toHaveBeenCalled());
  });
});
