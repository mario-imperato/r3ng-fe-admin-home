
/*
 * Example:
    pageActions : FloatBarAction[] = [
        { "icon": "info_outline", "label": "info generali", "command": "general-detail", status: "primary" },
        { "icon": "place_outline", "label": "referente", "command": "place-detail", status: "primary" },
        { "icon": "event_outline", "label": "eventi", "command": "events-detail", status: "primary" },
        { "icon": "notes", "label": "notes", "command": "notes-detail", status: "primary" },
    ]
 */

export interface PageBarAction {
    icon: string,
    label: string,
    command: string,
    status: string
}