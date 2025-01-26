import React from "react";

import styles from "./OldQuize.module.css";

function OldQuize(props) {
  const DoneTopics = props.tableData.filter((topic) => topic.isDone === true);
  return (
    <div className={styles.topics_blocks}>
      {DoneTopics.map((item, index) => (
        <div key={index} className={styles.blocks_item}>
          {item.topic}
        </div>
      ))}
    </div>
  );
}

export default OldQuize;
