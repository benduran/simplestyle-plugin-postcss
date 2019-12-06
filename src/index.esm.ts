
import postcss, { AcceptedPlugin, ProcessOptions } from 'postcss';
import { SimpleStylePluginPostHook } from 'simplestyle-js/dist/esm/styleTypes';

export default function simplestylePluginPostCSS(
  plugins?: AcceptedPlugin[],
  processOptions?: ProcessOptions,
): SimpleStylePluginPostHook {
  const p = postcss(plugins);
  return (s) => {
    s.sheetBuffer = p.process(s.sheetBuffer, processOptions).css;
  };
}
