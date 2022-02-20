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

export interface Price {
     currency: Currency;
     amount: number;
}

export interface Attribute {
     displayValue: string;
     value: string;
     id: string;
}

export interface AttributeSet {
     id: string;
     name: string;
     type: string;
     items: Attribute[];
}

export interface Category {
     name: string;
     products: Product[];
}

export interface Currency {
     label: string;
     symbol: string;
}

export type Variant = {
     [attributeName: string]: Attribute;
};

export type SelectedProduct = Product & { quantity: number; variant: Variant };
