import { Schema } from 'zod'

export function ValidateSchema(schema: Schema) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async function (...args: any[]) {
      const model = schema.parse(args[0])
      args[0] = model
      return originalMethod.apply(this, args)
    }
  }
}
