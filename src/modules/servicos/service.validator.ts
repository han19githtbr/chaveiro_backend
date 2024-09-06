// eslint-disable-next-line linebreak-style
import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateServico } from './dtos/create-service.dto';
import { UpdateServico } from './dtos/update-service.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateServico);
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateServico);
  };
}

export default new Validator();
