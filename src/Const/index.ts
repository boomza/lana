// Placeholder for all string constants.
import ErrorInterface from "./ErrorInterface";

export const SKU_NOT_FOUND: ErrorInterface = {
  code: 200000,
  message: "SKU not found in inventory.",
};

export const QUANTITY_EXCEED: ErrorInterface = {
  code: 200001,
  message: "Not enough quantity.",
};

export const QUANTITY_ZERO: ErrorInterface = {
  code: 200002,
  message: "Zero quantity.",
};

export default ErrorInterface;
