import { Contract } from "@paperbits/common";
import { LocalStyles } from "@paperbits/common/styles";

export interface ActivityPreviewContract extends Contract {
    /**
     * Logo Source.
     */
    logoSource: string;

    /**
     * Logo Editor Width.
     */
     width: number;

    /**
     * Widget local styles.
     */
    styles?: LocalStyles;
}