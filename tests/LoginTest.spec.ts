import { test } from './baseTest';
import { Credentials, LoginNegativData } from './DataTest';
 

// Validates login flow with known valid credentials.
test('Log in with right credentials', async ({ loginPage }) => {
  await loginPage.login(
    Credentials.validUser.validUserName,
    Credentials.validUser.validPassword,
  );
  await loginPage.assertSuccessfulLogin();
});



// Groups negative-login scenarios and validates expected error messages.
test.describe('Login Negative Scenarios', () => {
  for (const scenario of LoginNegativData) {
    // Runs each invalid-credential combination from test data.
    test(scenario.name, async ({ loginPage }) => {
      await loginPage.login(scenario.userName, scenario.pass);
      await loginPage.assertErrorMessage(scenario.error);
    });
  }
});

