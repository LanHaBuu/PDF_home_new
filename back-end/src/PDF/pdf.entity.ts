import { Entity, Column,ObjectIdColumn } from 'typeorm';

@Entity()
export class PDFEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  pdf: Buffer;
}