/**
 *  This pattern can help improve the performance of your application by reducing
 *  the overhead of creating a new PrismaClient instance for each request.
 */
import { PrismaClient } from '@prisma/client'

// Declare a global variable called `cachedPrisma` of type `PrismaClient`.
declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

// Initialize a new instance of `PrismaClient` and store it in a variable called `prisma`.
let prisma: PrismaClient
// If the application is running in production mode, create a new `PrismaClient` instance directly.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // If `global.cachedPrisma` does not exist yet, create a new instance of `PrismaClient` and store it in the global cache.
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  // Use the cached `PrismaClient` instance for subsequent requests.
  prisma = global.cachedPrisma
}

export const db = prisma
