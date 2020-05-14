import { Plugin, Compiler } from "webpack";
import Config from "webpack-chain";
import { RawSource, ConcatSource, CachedSource } from "webpack-sources";
import download from "download";

interface PluginOptions {
  cssURL: string;
}

class RemaxIconFontWebpackPlugin implements Plugin {
  private extraCSS = "";

  constructor(private options: PluginOptions) {}

  apply(compiler: Compiler) {
    compiler.hooks.emit.tapPromise(
      "RemaxIconfontPlugin",
      async (compilation) => {
        if (!process.env.REMAX_PLATFORM) return;
        const platform = process.env.REMAX_PLATFORM;
        let CSSFileName: string | undefined = {
          toutiao: "app.ttss",
          wechat: "app.wxss",
          ali: "app.acss",
        }[platform as "toutiao" | "wechat" | "ali"];

        if (platform === "web") {
          CSSFileName = Object.keys(compilation.assets).find((fileName) =>
            /index(\.\w+)?\.css/.test(fileName)
          );
        }
        if (!CSSFileName) return;

        const appCSSAssetSource = (compilation as any).getAsset(CSSFileName)
          ?.source as ConcatSource | CachedSource;

        if (!this.extraCSS) {
          const URL = this.options.cssURL;
          const buffer = await download(URL);
          this.extraCSS = buffer.toString("utf-8");
        }

        if (appCSSAssetSource) {
          if (appCSSAssetSource instanceof ConcatSource) {
            appCSSAssetSource.add(new RawSource(`\n${this.extraCSS}`));
          } else {
            (compilation as any).updateAsset(
              CSSFileName,
              new RawSource(appCSSAssetSource.source() + `\n${this.extraCSS}`)
            );
          }
        } else {
          (compilation as any).emitAsset(
            CSSFileName,
            new RawSource(this.extraCSS)
          );
        }
      }
    );
  }
}

export function RemaxIconfontPlugin(options: PluginOptions) {
  const configWebpack = ({ config }: { config: Config }) => {
    config
      .plugin("RemaxIconFontWebpackPlugin")
      .use(RemaxIconFontWebpackPlugin, [options]);
  };

  return {
    configWebpack,
  };
}
