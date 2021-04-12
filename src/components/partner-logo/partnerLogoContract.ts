import { Contract } from "@paperbits/common";
import { LocalStyles } from "@paperbits/common/styles";

export interface PartnerLogoContract extends Contract {
    /**
     * Logo Source.
     */
    logoSource: string;

    /**
     * Logo width.
     */
    width?: number;

    /**
     * Logo height.
     */
    height?: number;

    /**
     * Widget local styles.
     */
    styles?: LocalStyles;
}