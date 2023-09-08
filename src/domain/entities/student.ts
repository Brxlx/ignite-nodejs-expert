import { Entity } from '../../core/entities/entity';
import { UniqueEntityID } from './value-objects/unique-entity-id';

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityID) {
    return new Student(props, id);
  }
}
