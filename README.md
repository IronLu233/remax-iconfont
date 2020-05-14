# remax-iconfont

在 Remax 项目中引入 Iconfont

### 使用

安装

```sh
yarn add remax-iconfont-component
 yarn add -D remax-iconfont-plugin
```

在 Iconfont 上找到你项目的 CSS
![image](https://user-images.githubusercontent.com/20639676/81887919-c9d3e780-95d2-11ea-8455-27a3cc6964a7.png)

然后将插件加入到 `remax.config.js` 中

```js
const { RemaxIconfontPlugin } = require("remax-iconfont-plugin");
module.exports = {
  plugins: [
    RemaxIconfontPlugin({
      // 将上面的CSS加入到此处
      cssURL: "http://at.alicdn.com/t/font_8d5l8fzk5b87iudi.css",
    }),
  ],
};
```

最后在组件中这样使用

```jsx
import Icon from 'remax-iconfont-component';
const Foo = () => <Icon type="icon-zhifubao">
```
