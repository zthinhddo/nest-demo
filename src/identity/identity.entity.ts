import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'identity' })
export class Identity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_no' })
  idNo: number;

  @Column({ name: 'country' })
  country: string;

  @CreateDateColumn({
    name: 'cre_dt',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creDt: string;

  @CreateDateColumn({
    name: 'exp_dt',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  expDt: string;

  @Column({ default: 'N', name: 'delt_flg', type: 'varchar' })
  deltFlg: string;
}
