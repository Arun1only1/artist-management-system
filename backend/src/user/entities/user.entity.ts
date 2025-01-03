import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Gender } from '../enum/gender.enum';
import { UserRole } from '../enum/user.role.enum';
import { USER_PASSWORD_MAX_LENGTH_IN_DB } from 'src/constants/general.constants';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    length: USER_PASSWORD_MAX_LENGTH_IN_DB,
  })
  password: string;

  @Column()
  phone: string;

  @Column({ type: 'timestamp' })
  dob: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  address: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  // Hash the password before saving
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // Exclude password from JSON response
  toJSON() {
    const obj = { ...this };

    delete obj.password;

    return obj;
  }
}
