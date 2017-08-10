import { MicroNotePage } from './app.po';

describe('micro-note App', () => {
  let page: MicroNotePage;

  beforeEach(() => {
    page = new MicroNotePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
