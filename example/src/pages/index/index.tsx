import * as React from "react";
import { View, Text, Image } from "remax/one";
import Icon from "../../../../packages/remax-iconfont-component/dist";
import styles from "./index.css";

export default () => {
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        <Icon type="icon-tuichu" />
        <Icon type="icon-facebook" />
        <Icon type="icon-twitter" />
      </View>
    </View>
  );
};
