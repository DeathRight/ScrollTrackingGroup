import React, { createContext, Dispatch, SetStateAction } from "react";
import { IPosition } from "../useScrollPosition/useScrollPosition";

export type Orientation = "vertical" | "horizontal";

export type SectionObj = { element: HTMLDivElement; position: IPosition };
export type SectionsObj = { [k: string]: SectionObj | undefined | null };

export interface ISTGContext {
  container: React.MutableRefObject<HTMLDivElement | null>;
  sections: React.MutableRefObject<SectionsObj>;
  window: React.MutableRefObject<HTMLDivElement | undefined>;
  saveRef: (e: HTMLDivElement | null, key: string) => void;
  lastUpdated: number;
  setLastUpdated: Dispatch<SetStateAction<number>>;
  flipped: boolean;
  orientation: Orientation;
  localScroll: boolean;
}

export default createContext<ISTGContext | null>(null);
