export interface IUser {
  id: number;
  firstname: string;
  surname: string;
  email: string;
  admin: boolean;
  organisationId: number;
  departmentId: number;
  allowanceUnit: string;
  bossOfDepartments: number[];
  endDate: string;
  departmentName: string;
  gravatar: string;
  allowanceRemaining: number;
  hasLoggedOn: boolean;
  isArchived: boolean;
  approverId: number;
  deptBossId: number;
  birthday: string;
  startDate: string;
  hasPublicHolidays: boolean;
  userInitials: string;
  countryCode: string;
  currentYearAllowance: number;
  nextYearAllowance: number;
}
