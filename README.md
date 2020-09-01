# FlashCards

### A website for creating and sharing flashcard decks online. Made by Albert Zhu.

## Usage

### Login and Registration

First-time users must register with their email and create and username and password. Currently, the email does not need to be confirmed. Upon login or registration, users will be directed to the homepage.

### Homepage

On the homepage, users can see flashcard decks they created and publicly available flashcard decks created by others. They will also see the option to create a new flashcard deck. If the user is logged in, they will see their account and the option to log out. Logged out users can still visit the homepage and view public flashcard decks, but they will not be able to create flashcards or save them to their profile page unless they choose to register or login.

### Card Editor

When logged-in users click on "Create a new deck!", they will be redirected to the CardEditor in which they can create a new flashcard deck. Flashcard decks must contain at least one flashcard, and neither the front or back of any flashcard can be blank. The user can also choose whether or not to make the deck public. After naming the deck and giving it an optional description, users can create the deck, upon which they will be redirected to the CardViewer page.

### Card Viewer

Users can view the flashcards of a deck on the CardViewer page, as well as the description of the deck (if applicable) and the creator of the deck. Users can click the card to flip it, randomize which card they are viewing, and move from one card to the next or previous one by click the "Previous card" and "Next card" buttons or using the left and right arrow keys. Logged-in users will also have the ability to save the flashcard deck to their profile page. Users can click the "Save deck" button to save and then click "Unsave deck" to remove it from their profile page.

### Profile page

Logged-in users can access their profile page to see their email, username, and saved decks. They can also update their username.

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
