## Important Features of the Project:

1. This repository contains code for fetching data from an API and rendering it into different data grids, which can be navigated. Once the data is fetched, it is stored in Redux and cached, eliminating the need for repeated API calls.

2. All data grids are searchable, allowing users to filter data based on any chosen header.

3. The Datagrid component is a reusable component that takes data as input, along with the number of rows and columns, and dynamically generates a table accordingly. Only one Datagrid component is used throughout the codebase, handling users, posts, and comments.

4. The Datagrid component includes pagination, and the fetched results are cached and stored in Redux.

5. The project follows a well-organized folder structure to enhance scalability and readability.

6. Redux Toolkit, the latest version of Redux, is used for state management in this project.

7. Styled Components is used for CSS handling. No external frameworks are used for building or styling.

# Let's look into the Folder Structure:

1. /src/api: Contains functions required for API calls.
2. /src/pages: Contains dynamically rendered pages.
3. /src/redux: Contains different slices or reducers.
4. /src/utils: Contains utility or helper functions.
5. /src/components: Contains reusable components like the navbar and datagrid.

## Tech Stack Used:

1. React.js
2. Redux and Redux Toolkit for state management
3. Styled Components
4. React Router DOM for page navigation

Developed by: Victor Mitra (victor.mitra15@gmail.com)

/\***\*\*\*\*\*\*\***Instructions**\*\*\***/

An ReactJS focused take home test for Front-end Developers.

### Instructions

- Clone this repo
- Complete this exercise and submit either a zip of the solution or a link to a new repo
- Please incorporate ReactJS framework into your solution. All other choices of libraries, frameworks, etc. are up to you.
- Also show case the use of any State Management libraries (e.g. redux, mobx, react-query, etc.) in the application.

### Requirements

- Solution should be responsive
- Use the [JSON Placeholder](https://jsonplaceholder.typicode.com/) API to fetch data for Users, Posts, Comments.
- Create a reusable Data-Grid Component to render the Data in tabular format. (**Do not use any external libraries**)
- User should be able to navigate between the different Data-Grids.
- Should be a single-page application.
- Data-Grid should have following features implemented:
  - Pagination Option
    - Results should be fetched using pagination (?\_start=n&\_limit=m).
    - Results to be cached once fetched.
    - User should be able to see total number of pages available. (https://github.com/typicode/jsonplaceholder/issues/49)
  - Filtering
    - GlobalSearch - There should be a search input to filter the data in Data-Grid using searchword.
    - There should be a filter option to select a specific attribute and value to be filtered.
  - Sorting
    - All columns should be sortable.

### Bonus

- Using Typescript.
- Use of latest React Hooks and Context APIs will be preferred.
- Unit Testing
- Project Layout Structure.
