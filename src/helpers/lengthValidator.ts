export const inputLengthValidations = ({ min, max }: { min: number; max: number }) => [
  { message: `მინიმუმ ${min} სიმბოლო`, check: (value: string) => value.length >= min },
  { message: `მაქსიმუმ ${max} სიმბოლო`, check: (value: string) => value.length <= max },
];
