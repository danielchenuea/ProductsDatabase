export interface Produto {
    id: number;
    title: string;
    description: string;
    quantity: number;
    date_input: number;
}

export interface ProdutoGet {
    id: number;
    title: string;
    description: string;
    quantity: number;
    date_input: string;
}
