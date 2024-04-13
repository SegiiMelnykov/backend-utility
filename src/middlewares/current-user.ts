import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface UserPayload {
  id: string
  email: string
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next()
  }

  try {
    const payload = jwt.verify(req.session.jwt as string, process.env.JWT_KEY!) as UserPayload
    req.currentUser = payload
  } catch (err) {
    console.log(err)
  }

  next()
}
