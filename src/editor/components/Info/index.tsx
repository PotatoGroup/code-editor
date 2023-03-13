import React from "react";
import styles from "./index.less";
import { CompletionType } from "../../type";

export default ({
  info,
}: {
  info?: Partial<{ name: string; type: string; content: string }>;
}) => {
  const { name, type, content } = info;
  const icons = Object.keys(CompletionType).reduce(
    (pre, cur) => ({ ...pre, [cur]: `infoIcon-${cur}` }),
    {}
  );
  return !!info ? (
    <div className={styles.info}>
      <div className={`${styles.header} ${styles[icons[type?.toLowerCase()]]}`}>
        {name}
      </div>
      <div className={styles.type}>{type?.toLowerCase()}</div>
      <div className={styles.content}>{content}</div>
    </div>
  ) : null;
};
