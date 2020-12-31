import { Contract } from "@paperbits/common";

export interface ClickCounterContract extends Contract {
    /**
     * Initial count.
     */
    initialCount: number;

    /**
     * Widget local styles.
     */
    styles?: any;
}