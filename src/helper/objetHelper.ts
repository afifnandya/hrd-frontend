export function firstObjectPropValue(obj: Record<string, any>) {
  let value = ''
  for (const property in obj) {
    if (!value) {
      value = obj[property]
    }
  }
  return value
}
