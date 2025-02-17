<<<<<<< HEAD
# News-Article
Take-home assignment for front-end developer.

## Getting Started
Please review the information in this section before you get started with your development. 
* Create a personal fork of the project on Github.
* Clone the fork on to your local machine.
* Implement your solution and the rest of git basics applies.
* When you are ready, submit for review by providing the link of your forked repo to our recruitment team.

### Requirements:
* Use TypeScript and React to build the application.
* Use any CSS framework or libraries (e.g., Bootstrap, Material-UI) to style your components.
* Use a router library like React Router to handle page navigation.
* Use an API library like Axios for making HTTP requests to your backend or mock API.
* You may choose any database of your choice (e.g., SQLite, MongoDB, MySQL, etc.) or you can use a mock API for data persistence.
* Implement error handling and validation for form submissions.
* Write clean and maintainable code, following best practices.
* Provide clear instructions on how to run the application locally and any setup steps required.

### Tools
You may choose to use any IDE (Integrated Development Environment) tools you are comfortable with.

## Your Task
Create a simple CRUD application:
1. You need to create a 2-page web application using TypeScript and React. 
2. The application should allow users to create, update, fetch, and display news articles in a database. 

### Page 1: Create / Update News Articles
Design a web page with a form to create or update news articles. The form should include the following fields for a news article:
* Article Title (text input)
* Article Summary (textarea)
* Article date (date input)
* Publisher Of Article (text input)

When the form is submitted:
* If all fields are filled, the article should be created or updated in the database.
* If any field is missing, show appropriate error messages and prevent submission.
* After successful submission, clear the form fields so that user can input next article
* Provide a navigation link to the fetch/display page.

### Page 2: Fetch / Display News Articles
Design a web page to fetch and display the articles from the database.
* Fetch the articles when the page loads and display them in a visually appealing way (e.g., as a list or table). You can display publisher of article/title/summary and date of article
* Provide a navigation link to the update article.

Sample page design for guidance
![Display Page Design](https://github.com/chunyang-hs/news-article/blob/master/sample-display-page-design.png)

### Bonus (Optional):
You may also consider adding the following features if times permit:
* Include a refresh button to fetch the latest articles from the database.
* Add delete functionality to remove articles from the database.
* Implement pagination or infinite scrolling for fetching and displaying articles.
* Add search functionality to filter articles based on specific criteria.
* Use a state management library like Redux or MobX to manage the application's state.

## Final Notes
Feel free to adjust the requirements and scope of the assignment according to your preferences and time constraints. 
Remember to include clear instructions and any necessary information for running the application. 

Good luck with your assignment, and feel free to ask any questions if you need further assistance!
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
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
>>>>>>> c00948b (Initialize project using Create React App)
