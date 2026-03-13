import type { Task, Project, TaskStatus } from './index'

// DynamoDB single-table design uses PK + SK to identify every item.
// Instead of one table per entity (projects table, tasks table),
// everything lives in ONE table and the PK/SK pattern tells items apart.
//
// Entity      PK                    SK
// -------     --                    --
// Project     PROJECT#<id>          METADATA
// Task        PROJECT#<projectId>   TASK#<taskId>
// WS Conn     CONNECTION#<connId>   METADATA

export interface DynamoProject extends Project {
  PK: string   // PROJECT#<id>
  SK: string   // METADATA
}

export interface DynamoTask extends Task {
  PK: string      // PROJECT#<projectId>
  SK: string      // TASK#<taskId>
  GSI1PK: string  // PROJECT#<projectId>#STATUS#<status>
  GSI1SK: string  // TASK#<taskId>
}

export interface DynamoConnection {
  PK: string          // CONNECTION#<connectionId>
  SK: string          // METADATA
  connectionId: string
  projectId: string
  userId: string
  userName: string
  connectedAt: string
  ttl: number         // Unix timestamp — DynamoDB auto-deletes expired items
}