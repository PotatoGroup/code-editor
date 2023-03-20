import { content } from "@uiw/codemirror-extensions-events";
export const EventExt = () =>
  content({
    focus(evn) {
      // console.log("focus");
    },
    blur(evn) {
      // console.log("blur");
    },
  });
