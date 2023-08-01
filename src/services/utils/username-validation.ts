/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'UsernameValidation', async: false })
export class UsernameValidation implements ValidatorConstraintInterface {
    validate(username: string, args: ValidationArguments) {
            const regexp = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$');
            // "regexp" variable now validate email address.
            return regexp.test(username);
    }

    defaultMessage(args: ValidationArguments) {
        return 'The password is weak'
    }

}
