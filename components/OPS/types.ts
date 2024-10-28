export type ButtonItem = {
    label: string;
    color: string;
    definition: string;
    description: string;
    criteria: string;
    icon: any; // or more specific type depending on your image type
  };
  
  export type ButtonData = ButtonItem[];
  

export type ActiveButtonsState = { [key: string]: boolean };
export type ButtonCountersState = { [key: string]: number };

export type AnimatedButtonProps = {
    item: ButtonItem;
    isActive: boolean;
    counter: number;
    onPress: () => void;
    onLongPress: () => void;
    onInfoPress: () => void;
  };

export interface ColumnPatterns {
  ENERGY: RegExp;
  INFO: RegExp;
  INTROVERT: RegExp;
  EXTRAVERT: RegExp;
}