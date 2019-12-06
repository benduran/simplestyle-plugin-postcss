/* tslint:disable no-console */

import autoprefixer from 'autoprefixer';
import createStyles, { registerPostHook } from 'simplestyle-js';
import sheetCache from 'simplestyle-js/dist/commonjs/sheetCache';

import simpleStylePluginPostCSS from '../src';

describe('simplestyle-js-plugin-postcss', () => {
  beforeEach(() => {
    sheetCache.clean();
  });
  it('Should validate that PostCSS just passes through the CSS when there are no option specified', () => {
    const r = {
      passthroughRoot: {
        color: 'yellow',
        display: 'flex',
        transform: 'rotateY(180deg)',
      },
    };
    registerPostHook(simpleStylePluginPostCSS([]));
    const s = createStyles(r, false);
    const [sheet] = sheetCache.getAll();
    const rendered = sheet.getStyles();
    expect(rendered).toContain(`.${s.passthroughRoot}`);
    expect(rendered).toContain('color:yellow;display:flex;transform:rotateY(180deg)');
  });
  it('Should validate that PostCSS (with Autoprefixer as a plugin) transforms the rules correctly', () => {
    const r = {
      transformRoot: {
        transform: 'translateY(-50%)',
        transition: 'all .2s ease-in-out',
      },
    };
    registerPostHook(simpleStylePluginPostCSS([autoprefixer()]));
    const s = createStyles(r, false);
    const [sheet] = sheetCache.getAll();
    const rendered = sheet.getStyles();
    expect(rendered).toContain(`.${s.transformRoot}`);
    expect(rendered).toContain('transform:translateY(-50%);');
    expect(rendered).toContain('-webkit-transform:translateY(-50%);');
    expect(rendered).toContain('transition:all .2s ease-in-out;');
    expect(rendered).toContain('-webkit-transition:all .2s ease-in-out;');
  });
});
