import 'pinia'

declare module 'pinia' {
  // 用户信息
  export interface User {
    [key: string]: string | number | boolean | ObjectType | ArrayType
  }

  // 系统信息
  export interface System {
    [key: string]: string | number | boolean | ObjectType | ArrayType
  }
}
