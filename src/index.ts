
import postcss, { AcceptedPlugin, ProcessOptions } from 'postcss';
import { PosthookPlugin } from 'simplestyle-js';

export default function simplestylePluginPostCSS(
  plugins: AcceptedPlugin[],
  processOptions?: ProcessOptions,
): PosthookPlugin {
  const p = postcss(plugins);
  return sheetContents => p.process(sheetContents, processOptions).css;
}
