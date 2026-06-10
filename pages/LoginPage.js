class LoginPage{
    constructor(page){
        this.page=page;
        this.username=this.page.getByPlaceholder('email@example.com');
        this.password=this.page.getByPlaceholder('enter your passsword');
        this.loginButton=this.page.getByRole('button', {name: 'login'});
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async validLogin(username, password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}
module.exports = LoginPage;