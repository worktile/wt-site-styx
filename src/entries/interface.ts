export interface BindTargetType {
    addEventListener?: (eventStr: string, func: (e: Event) => any, shouldCatch: boolean) => void;
    attachEvent?: (eventStr: string, func: (e: Event) => any) => void;
}
