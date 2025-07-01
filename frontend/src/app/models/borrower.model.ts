export interface Borrower {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipDate: Date;
  membershipStatus: MembershipStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum MembershipStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}
