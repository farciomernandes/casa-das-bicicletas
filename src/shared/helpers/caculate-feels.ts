export const calculateInterest = (
  totalValue: number,
  installments: number,
): number => {
  const fixedFee = 0.49;
  const percentage = 1.99 / 100;

  const proportionalPercentage = totalValue * percentage;

  const totalInterest = fixedFee + proportionalPercentage * installments;

  return totalInterest;
};
