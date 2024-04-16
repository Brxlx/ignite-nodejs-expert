import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { Notification } from '@/domain/notification/enterprise/entities/notification';

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public items: Notification[] = [];
  // public items = new Map<UniqueEntityID, Question>();

  async create(notification: Notification): Promise<void> {
    // this.items.push(question);
    this.items.push(notification);
  }
}
