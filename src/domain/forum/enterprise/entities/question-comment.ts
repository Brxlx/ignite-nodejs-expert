import { Optional } from '@/core/types/optional';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Comment, CommentProps } from './comment';

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId(): UniqueEntityID {
    return this.questionId;
  }

  static create(props: Optional<QuestionCommentProps, 'createdAt'>, id?: UniqueEntityID) {
    return new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }
}
