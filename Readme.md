# Food Diary Application

## Introduction

The **Food Diary Application** is a web-based tool that allows users to track their daily food intake and monitor their calorie consumption against a predefined daily requirement. This application demonstrates full-stack development using modern technologies, adhering to good coding practices, and implementing efficient design principles.

## Features

- **Add Food Entries**: Users can add food items to their diary by specifying the food name, quantity, and optionally the calories if the food is not already in the database.
- **View Diary Entries**: Displays all food entries grouped by date, showing detailed information such as food name, quantity, calories, and daily summaries.
- **Delete Entries**: Users can delete food entries from their diary.
- **Calorie Calculation**: Automatically calculates the total calories consumed based on the quantity and average calories of the food item.
- **Daily Intake Summary**:
  - **Date**: Entries are grouped by date.
  - **Total Calories**: Sum of calories consumed on that day.
  - **Daily Calorie Requirement**: A hardcoded median calorie requirement (can be customized in future versions).
  - **NET Calories**: Difference between the daily requirement and total intake, with color-coded indicators:
    - **Green**: Within 10% of the daily requirement.
    - **Yellow**: Within 30% of the daily requirement.
    - **Red**: More than 30% difference from the daily requirement.
- **Dynamic Food Database**: If a food item doesn't exist in the database, users can add it along with its calories, enriching the database for future use.

## Technology Stack

### Frontend

- **Framework**: React (JavaScript)
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js (JavaScript)
- **Data Storage**: In-memory data structures (for simplicity)
- **Testing**: Jest and Supertest

### Development Tools

- **Version Control**: Git
- **Package Management**: npm
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Deployment**: CapRover (or alternatives like Vercel, Heroku)

## Project Structure

```
.
├── README.md
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── app
│   │   └── page.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── AddEntryForm.tsx
│   │   ├── DailyEntries.tsx
│   │   ├── EntryRow.tsx
│   │   ├── Pagination.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── collapsible.tsx
│   │       ├── input.tsx
│   │       └── table.tsx
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── pages
│   │   └── FoodDiary.tsx
│   ├── services
│   │   └── diaryService.ts
│   ├── types
│   │   └── index.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

11 directories, 32 files
```

## Installation and Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**
- **Git**

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AngryBuddha2/food-diary.git
   cd food-diary/food-diary-backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Backend Server**

   ```bash
   npm start
   ```

   The backend server will start on port `5000`.

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../food-diary-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Frontend Server**

   ```bash
   npm run dev
   ```

   The frontend application will start on port `3000`.

### Configuration

- **API URL**: Ensure that the API URL in `frontend/src/services/diaryService.js` points to the backend server.

  ```javascript
  // diaryService.js
  const API_URL = 'http://localhost:5000/api';
  ```

- **CORS Configuration**: The backend server uses the `cors` middleware to allow requests from the frontend.

  ```javascript
  // backend/src/index.js
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:3000' }));
  ```

## Usage

1. **Access the Application**

   Open your browser and navigate to `http://localhost:3000`.

2. **Add a Food Entry**

   - Enter the food name.
   - Specify the quantity.
   - If the food is new, provide the calories per unit.
   - Click **Add Entry**.

3. **View Diary Entries**

   - The diary entries are displayed, grouped by date.
   - View the total calories consumed and the NET calories compared to the daily requirement.

4. **Delete an Entry**

   - Click the **Delete** button next to a diary entry to remove it.

## Testing

### Backend Tests

1. **Navigate to the Backend Directory**

   ```bash
   cd ../backend
   ```

2. **Run Tests**

   ```bash
   npm test
   ```

   The tests cover the API endpoints, ensuring they function correctly.

### Frontend Tests

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Run Tests**

   ```bash
   npm test
   ```

   The frontend tests use Jest and React Testing Library to ensure components render and behave as expected.

## Deployment

### Option 1: Deploying on CapRover

1. **Prepare CapRover Configuration**

   - Use the provided `captain-definition` file for CapRover deployment.

2. **Build and Deploy**

   - CapRover will build the Docker image and deploy the application.
   - Ensure that both frontend and backend are correctly configured to communicate.

### Option 2: Deploying on Vercel and Render

- **Frontend**

  - Deploy the frontend on Vercel by connecting your repository.
  - Configure the API URL to point to the backend deployed on Render.

- **Backend**

  - Deploy the backend on Render or Heroku.
  - Ensure CORS settings allow the frontend domain.

### Important Deployment Notes

- **API URL Adjustments**

  - When deploying, adjust the `API_URL` in the frontend to match the deployed backend's URL.

- **Environment Variables**

  - Use environment variables to manage configuration in different environments.

## Future Improvements

- **Database Integration**

  - Replace in-memory data storage with a persistent database (e.g., MongoDB, PostgreSQL).

- **User Authentication**

  - Implement user authentication to allow multiple users to maintain separate diaries.

- **Dynamic Daily Requirement**

  - Allow users to set their own daily calorie requirements based on personal metrics.

- **Enhanced UI/UX**

  - Improve the user interface with better styling and responsive design.

- **Additional Nutritional Information**

  - Expand the database to include other nutritional information like proteins, fats, and carbohydrates.

- **Error Handling and Validation**

  - Implement comprehensive error handling and input validation on both frontend and backend.

- **Unit and Integration Tests**

  - Increase test coverage to include more scenarios and edge cases.

## Coding Practices and Design Principles

- **Modular Code Structure**

  - The project follows a modular structure, separating concerns into different directories (controllers, models, routes, services).

- **Consistent Naming Conventions**

  - Variables, functions, and files use consistent and descriptive names.

- **Code Readability**

  - Code is written with readability in mind, using comments where necessary.

- **Use of Modern JavaScript Features**

  - Utilizes ES6+ features for cleaner and more efficient code.

- **Asynchronous Programming**

  - Uses `async/await` for handling asynchronous operations.

- **Version Control**

  - Git is used for version control, ensuring code history is maintained and changes are tracked.

- **Environment Configuration**

  - Configuration variables are managed separately for different environments (development, production).

## Known Issues

- **Data Persistence**

  - Currently, the application uses in-memory storage, which means data will be lost when the server restarts.

- **Scalability**

  - Without a database and proper state management, the application is not scalable for production use.

## Contribution Guidelines

We welcome contributions! Please follow these steps:

1. **Fork the Repository**

   - Create a personal fork of the repository on GitHub.

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   - Write clear and concise commit messages.

4. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Create a Pull Request**

   - Submit a pull request to the `main` branch of the original repository.



## Contact Information

For any questions or suggestions, please contact:

- **GitHub**: [stag7824](https://github.com/stag7824), [AngryBuddha2](https://github.com/AngryBuddha2)

---

Thank you for using the Food Diary Application! We hope it helps you in tracking your dietary habits effectively.