import { NgxMyformGhPagesSourcePage } from './app.po';

describe('ngx-myform-gh-pages-source App', () => {
  let page: NgxMyformGhPagesSourcePage;

  beforeEach(() => {
    page = new NgxMyformGhPagesSourcePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
