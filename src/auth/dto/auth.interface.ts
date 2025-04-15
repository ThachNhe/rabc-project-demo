import { Request } from 'express'

import { User } from '@/db/entities'

export interface AuthRequest extends Request {
  user: User
}

