export {}

declare global {
  // 定义对象类型
  interface ObjectType {
    [key: string]: string | number | boolean | Record<string, any> | any
  }

  // 定义数组类型
  type ArrayType = string[] | number[] | Record<string, any>[] | any
}
