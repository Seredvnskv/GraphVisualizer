export const Mode = {
    Select: "select",
    Add: "add",
    Connect: "connect",
    Delete: "delete",
    None: "none",
} as const;

export type ModeType = (typeof Mode)[keyof typeof Mode];