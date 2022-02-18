import { Price } from './interfaces';

export default function getPrice(prices: Price[] | undefined, currencySymbol: string) {
     return prices?.find((price) => price.currency.symbol === currencySymbol);
}
