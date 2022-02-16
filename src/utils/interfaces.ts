export interface Product {
     id: string;
     name: string;
     inStock: boolean;
     gallery: string[];
     description: string;
     category: string;
     attributes: AttributeSet[];
     prices: Price[];
     brand: string;
}

interface Price {
     currency: Currency;
     amount: number;
}

interface Attribute {
     displayValue: string;
     value: string;
     id: string;
}

interface AttributeSet {
     id: string;
     name: string;
     type: string;
     items: Attribute[];
}

interface Category {
     name: string;
     products: Product[];
}

export interface Currency {
     label: string;
     symbol: string;
}
