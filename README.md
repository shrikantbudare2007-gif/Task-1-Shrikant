# TaskFlow

TaskFlow is a responsive task management dashboard built as a beginner-friendly full stack development internship project.

## Features

- Responsive layout for mobile, tablet, and desktop screens
- Mobile hamburger navigation
- Hero section with clear calls to action
- Dashboard statistics for total, completed, pending, and productive tasks
- Six sample task cards with categories, due dates, priorities, and statuses
- Add-task form for creating new pending tasks
- Complete-task buttons with live statistic updates
- Filters for all, completed, and pending tasks
- Category cards for Personal, Work, Study, and Fitness
- Accessible semantic HTML structure
- Footer with quick links and social placeholders

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- CSS Flexbox and Grid
- No frameworks or external JavaScript libraries

## Project Structure

```text
Task-1-Shrikant/
├── index.html   # Page structure and dashboard content
├── style.css    # Responsive layout and visual styling
├── script.js    # Menu, task, filter, and statistics functionality
└── README.md    # Project documentation
```

## Run Locally

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` directly in a browser, or install the **Live Server** extension.
4. Right-click `index.html` and select **Open with Live Server**.

No installation or build process is required.

## How It Works

### Add a task

Select **Add task**, enter a title, choose a category and priority, select a due date, and submit the form. The new task appears as a pending task in the dashboard.

### Complete a task

Select **Complete** on any pending task. Its status changes to completed, and the dashboard statistics update automatically.

### Filter tasks

Use the **All**, **Completed**, and **Pending** controls to change which task cards are displayed.

## Responsive Design

- Mobile-first single-column layout
- Tablet improvements begin at `768px`
- Desktop dashboard layout begins at `1024px`
- Task cards switch to multi-column grids on larger screens

## Project Goal

This project demonstrates foundational frontend development skills, including semantic markup, responsive CSS, accessible controls, DOM manipulation, event handling, and dynamic UI updates.

## License

This project was created for educational and portfolio purposes.