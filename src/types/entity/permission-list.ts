enum PermissionEnum {
  'user',
  'admin',
  'all',
}

export type PermissionList = keyof typeof PermissionEnum;
