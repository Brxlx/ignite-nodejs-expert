import { Entity } from '../../core/entities/entity';
import { Optional } from '../../core/types/optional';
import { UniqueEntityID } from './value-objects/unique-entity-id';

interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content;
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );
  }
}
