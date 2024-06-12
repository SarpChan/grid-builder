import { ErrorCode } from './errors';
import { WarningCode } from './warnings';

export interface IValidationModel {
  code: ErrorCode | WarningCode;
  affectedGrids: Set<string>;

  isEqual: (a: IValidationModel, b: IValidationModel) => boolean;
}

export class ValidationModel implements IValidationModel {
  code: ErrorCode | WarningCode;
  affectedGrids: Set<string>;
  isEqual(a: IValidationModel, b: IValidationModel) {
    const codesAreEqual = a.code === b.code;

    if (!codesAreEqual) {
      return false;
    }

    const gridsFromB = Array.from(b.affectedGrids.values());
    const gridsFromA = Array.from(a.affectedGrids.values());

    const affectedGridsAreEqual = gridsFromA.every((id) =>
      gridsFromB.includes(id)
    );

    return affectedGridsAreEqual;
  }

  constructor(code: ErrorCode | WarningCode, affectedGrids: Set<string>) {
    this.code = code;
    this.affectedGrids = affectedGrids;
  }
}
