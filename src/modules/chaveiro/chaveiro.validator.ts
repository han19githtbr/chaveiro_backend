// eslint-disable-next-line linebreak-style
// eslint-disable-next-line linebreak-style
import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateChaveiro } from './dtos/create-chaveiro.dto';
import { UpdateChaveiro } from './dtos/update-chaveiro.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateChaveiro);
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateChaveiro);
  };
}

export default new Validator();
