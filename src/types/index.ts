export interface CoffeeFormData {
  name: string;
  memo: string;
  amount: string;
}

export interface FormErrors {
  name?: string;
  memo?: string;
  amount?: string;
}