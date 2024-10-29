// eslint-disable-next-line linebreak-style
import { IPayloadDto } from '../../modules/auth/dtos/payload.dto';
// eslint-disable-next-line linebreak-style

// to make the file a module and avoid the TypeScript error.
export {};

declare global {
  namespace Express {
    export interface Request {
      auth: IPayloadDto;
    }
  }

  namespace Express {
    namespace Multer {
      export interface File {
        location: string;
      }
    }
  }
}
