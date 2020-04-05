/* tslint:disable no-console */

import autoprefixer from 'autoprefixer';

import simpleStylePluginPostCSS from '../src';
import { createStyles, registerPosthook, SimpleStyleRules } from 'simplestyle-js';

describe('simplestyle-js-plugin-postcss', () => {
  beforeEach(() => {
    Array.from(document.head.querySelectorAll('style')).forEach(s => s.remove());
  });
  it('Should validate that PostCSS just passes through the CSS when there are no option specified', () => {
    const r = {
      passthroughRoot: {
        color: 'yellow',
        display: 'flex',
        transform: 'rotateY(180deg)',
      },
    };
    registerPosthook(simpleStylePluginPostCSS([]));
    const [s, rendered] = createStyles(r);
    expect(rendered).toContain(`.${s.passthroughRoot}`);
    expect(rendered).toContain('color:yellow;display:flex;transform:rotateY(180deg)');
  });
  it('Should validate that PostCSS (with Autoprefixer as a plugin) transforms the rules correctly', () => {
    const r: SimpleStyleRules = {
      userScaleRoot: {
        userSelect: 'none',
      },
    };
    registerPosthook(simpleStylePluginPostCSS([autoprefixer()]));
    const [s, rendered] = createStyles(r);
    expect(rendered).toContain(`.${s.userScaleRoot}`);
    expect(rendered).toContain('user-select:none;');
    expect(rendered).toContain('-webkit-user-select:none;');
    expect(rendered).toContain('-moz-user-select:none;');
    expect(rendered).toContain('-ms-user-select:none;');
  });
});
