export interface ReceiptDTO{
    id?: string;
    number?: number;
    date?: string;
    total: number;
    closed?: boolean;
    createdAt?: string;
    updatedAt?: string;
}