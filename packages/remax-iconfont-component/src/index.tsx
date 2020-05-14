import React, { FC } from "react";
import { Text, TextProps } from "remax/one";
import clsx from "clsx";
export interface IconProps extends TextProps {
  type: string;
}

const Icon: FC<IconProps> = ({ type, className, ...restProps }) => {
  return <Text className={clsx("iconfont", type, className)} {...restProps} />;
};

export default Icon;
