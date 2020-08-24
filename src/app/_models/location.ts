import { logging } from 'protractor';

export interface Location {
    city: number;
    streetName: string;
    streetNumber: string;
    floor?: string;
    appartmentNumber?: string;
}
