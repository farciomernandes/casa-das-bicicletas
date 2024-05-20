import { IInterestCalculator } from '@/core/domain/protocols/helpers/interest-calculator';
import {
  CalculateInterestDTO,
  InterestResultDTO,
} from '@/presentation/dtos/helpers/calculate-interest.dto';

export class InterestCalculator implements IInterestCalculator {
  private fixedFee = 0.49;
  private percentage: number = 1.99 / 100;

  calculateInterest({
    totalValue,
    installments,
  }: CalculateInterestDTO): InterestResultDTO[] {
    const proportionalPercentage = totalValue * this.percentage;

    const interestArray: InterestResultDTO[] = Array.from(
      { length: installments },
      (_, i) => {
        const totalInterest = this.fixedFee + proportionalPercentage * (i + 1);
        const totalValueWithInterest = totalValue + totalInterest;

        return {
          quantity: i + 1,
          value: parseFloat(totalInterest.toFixed(2)),
          total: parseFloat(totalValueWithInterest.toFixed(2)),
        };
      },
    );

    return interestArray;
  }
}
