import { CoffeeFormData, FormErrors } from '../types';

export const validateForm = (data: CoffeeFormData): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.length > 50) {
    errors.name = 'Name must be less than 50 characters';
  }

  // Memo validation
  if (data.memo.length > 200) {
    errors.memo = 'Memo must be less than 200 characters';
  }

  const amount = data.amount.trim();
  if (!/^\d+(?:\.\d{1,18})?$/.test(amount) || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
    errors.amount = 'Enter an amount above 0 with up to 18 decimal places.';
  }

  return errors;
};