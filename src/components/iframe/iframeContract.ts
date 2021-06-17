import { Contract } from "@paperbits/common";
import { LocalStyles } from "@paperbits/common/styles";

export interface IframeContract extends Contract {
    /**
     * IFrame Source.
     */
    frameSrc: string;

    /**
     * IFrame Width.
     */
    width?: number;

     /**
     * IFrame height.
     */
    height?: number;

}