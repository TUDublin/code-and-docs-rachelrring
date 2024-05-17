import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { PasswordConfirmationValidatorService } from './password-confirmation-validator.service';

describe('PasswordConfirmationValidatorService', () => {
    let service: PasswordConfirmationValidatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PasswordConfirmationValidatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return null if confirmation password is empty', () => {
        const passwordControl = new FormControl('password123');
        const validatorFn = service.validateConfirmPassword(passwordControl);
        const confirmationControl = new FormControl('');
        expect(validatorFn(confirmationControl)).toBeNull();
    });

    it('should return null if confirmation password matches the password', () => {
        const passwordControl = new FormControl('password123');
        const validatorFn = service.validateConfirmPassword(passwordControl);
        const confirmationControl = new FormControl('password123');
        expect(validatorFn(confirmationControl)).toBeNull();
    });

    it('should return an error object if confirmation password does not match the password', () => {
        const passwordControl = new FormControl('password123');
        const validatorFn = service.validateConfirmPassword(passwordControl);
        const confirmationControl = new FormControl('differentPassword');
        expect(validatorFn(confirmationControl)).toEqual({ mustMatch: true });
    });

    it('should validate dynamically changing passwords', () => {
        const passwordControl = new FormControl('');
        const confirmationControl = new FormControl('');
        const validatorFn = service.validateConfirmPassword(passwordControl);

        passwordControl.setValue('firstPass');
        confirmationControl.setValue('firstPass');
        expect(validatorFn(confirmationControl)).toBeNull();

        passwordControl.setValue('secondPass');
        expect(validatorFn(confirmationControl)).toEqual({ mustMatch: true });

        confirmationControl.setValue('secondPass');
        expect(validatorFn(confirmationControl)).toBeNull();
    });
});
