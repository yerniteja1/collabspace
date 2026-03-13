import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const cacheKeys = {
  project: (id: string) => `project:${id}`,
  projectTasks: (projectId: string) => `project:${projectId}:tasks`,
  projectConnections: (projectId: string) => `project:${projectId}:connections`,
}

export const TTL = {
  project: 60 * 5,  // 5 minutes
  tasks: 60 * 2,    // 2 minutes
}