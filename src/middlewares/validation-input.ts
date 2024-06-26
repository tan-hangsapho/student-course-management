// import { Request, Response, NextFunction } from "express";

// const validateInput = (schema: ZodSchema) => {
//   return (req: Request, _res: Response, next: NextFunction) => {
//     try {
//       console.log(req.body);
//       schema.parse(req.body);
//       next();
//     } catch (error: unknown) {
//       logger.error(`UserService ValidateInput() error: ${error}`);
//       if (error instanceof ZodError) {
//         return next(new InvalidInputError(error));
//       }
//       next(error);
//     }
//   };
// };

// export default validateInput;
