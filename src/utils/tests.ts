import { z } from 'zod'

export const expectZodError = async (
  callback: (...args: any[]) => any,
  expected: (...args: any[]) => any,
) => {
  try {
    await callback()
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(({ message, path }: z.ZodIssue) => ({
        message,
        path: path[0],
      }))
      expected(issues)
    }
  }
}
