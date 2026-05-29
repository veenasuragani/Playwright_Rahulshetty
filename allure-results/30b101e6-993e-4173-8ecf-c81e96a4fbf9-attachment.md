# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EndToEndPO.spec.js >> @web end to end test with ZARA COAT 3 using fixture
- Location: tests\EndToEndPO.spec.js:34:1

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://rahulshettyacademy.com/client/#/auth/login", waiting until "load"

```

# Test source

```ts
  1  | class LoginPage{
  2  |     constructor(page){
  3  |         this.page=page;
  4  |         this.username=page.getByPlaceholder('email@example.com');
  5  |         this.password=page.getByPlaceholder('enter your passsword');
  6  |         this.loginButton=page.getByRole('button', {name: 'login'});
  7  |     }
  8  | 
  9  |     async goTo(){
> 10 |         await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
     |                         ^ Error: page.goto: Target page, context or browser has been closed
  11 |     }
  12 | 
  13 |     async validLogin(username, password){
  14 |         await this.username.fill(username);
  15 |         await this.password.fill(password);
  16 |         await this.loginButton.click();
  17 |     }
  18 | 
  19 | }
  20 | module.exports = LoginPage;
```