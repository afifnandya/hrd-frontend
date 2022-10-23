export function isString(val: string): string {
  return typeof val === 'string' ? val : ''
}

export function isNumber(val: number): number {
  return typeof val === 'number' ? val : 0
}
export function isBoolean(val: boolean): boolean {
  return typeof val === 'boolean' ? val : false
}
export function isArray(val: unknown[]): unknown[] {
  return Array.isArray(val) ? val : []
}
export function isObject(val: any): any {
  return typeof val === 'object' ? val : {}
}

export function dataType<Type>(
  val: Type,
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'
) {
  // if (typeof val === 'string') {
  //   return val
  // }
  // if (type === 'number') {
  //   return typeof val === 'number' ? val : 0
  // }
  // if (type === 'boolean') {
  //   return typeof val === 'boolean' ? val : false
  // }
  // if (type === 'array') {
  //   return Array.isArray(type) ? val : []
  // }
  // return typeof val === 'object' ? val : {}

  if (type === 'string') {
    return typeof val === 'string' ? val : ''
  }
  if (type === 'number') {
    return typeof val === 'number' ? val : 0
  }
  if (type === 'boolean') {
    return typeof val === 'boolean' ? val : false
  }
  if (type === 'array') {
    return Array.isArray(type) ? val : []
  }
  return typeof val === 'object' ? val : {}
}