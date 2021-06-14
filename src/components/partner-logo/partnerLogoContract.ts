import { Contract } from "@paperbits/common";
import { LocalStyles } from "@paperbits/common/styles";

export interface PartnerLogoContract extends Contract {
    /**
     * Logo Source.
     */
    logoSource: string;

    /**
     * Widget local styles.
     */
    styles?: LocalStyles;
}