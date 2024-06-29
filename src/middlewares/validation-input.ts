import { Request, Response, NextFunction } from "express";
import InvalidInputError from "src/errors/invalid-input-error";
import { logger } from "src/utils/logger";
import { ZodError, ZodSchema } from "zod";

const validateInput = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      logger.error(`UserService ValidateInput() error: ${error}`);
      if (error instanceof ZodError) {
        return next(new InvalidInputError(error));
      }
      next(error);
    }
  };
};

export default validateInput;
