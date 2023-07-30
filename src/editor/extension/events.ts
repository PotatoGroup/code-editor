import { content, Events } from "@uiw/codemirror-extensions-events";
export const EventExt = (events?: Events<keyof HTMLElementEventMap>) => content(events);
