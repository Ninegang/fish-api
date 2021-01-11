declare class Howl {
    constructor(obj: any);
    public play(): number;
    public pause(): void;
    public stop(): void;
    public volume(v: number): void;
    public loop(f: boolean): void;
    public playing():boolean;

}