import { FlexManagerAppPage } from './app.po';

describe('flex-manager-app App', () => {
  let page: FlexManagerAppPage;

  beforeEach(() => {
    page = new FlexManagerAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
