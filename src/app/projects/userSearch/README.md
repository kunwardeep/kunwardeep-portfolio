# 🔍 User Search

A user directory application built with Next.js, React, and TypeScript. This project demonstrates the use of modern web technologies to fetch, display, and filter user data.

## 🎯 Features

- Fetches user data from the [Random User API](https://randomuser.me/)
- Search functionality to filter users by first or last name
- Responsive design with TailwindCSS
- Loading, error, and no-result states for better user experience
- Modular and reusable components

## 🛠️ Tech Stack

- **Framework:** Next.js 15.2.3
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** React Hooks

## 🚀 How It Works

1. **Data Fetching:**
   The `useUsers` hook fetches user data from the Random User API and manages loading, error, and data states.

2. **Search Functionality:**
   The `SearchBar` component allows users to filter the displayed users by their first or last name. The search is case-insensitive.

3. **User Display:**
   The `UserDisplay` component shows user details, including their name, email, nationality, and avatar.

4. **State Management:**
   React's `useState` and `useEffect` hooks are used to manage the application's state.

## 🗂️ Project Structure

```
userSearch/
├── components/
│   ├── Error/           # Error state component
│   ├── Loading/         # Loading state component
│   ├── NoResult/        # No results state component
│   ├── SearchBar/       # Search bar component
│   └── UserDisplay/     # User display component
├── hooks/
│   └── useUsers.ts      # Custom hook for fetching user data
├── types.ts             # Type definitions for user data
├── index.tsx            # Main component
└── page.tsx             # Next.js page component
```

## 🎨 Customization

- **API Endpoint:** Modify the API URL in the `useUsers` hook to fetch data from a different source.
- **Styling:** Update TailwindCSS classes in the components to customize the UI.
- **Search Logic:** Enhance the search functionality to include additional fields or advanced filters.

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.

## 📝 License

This project is open source and available under the MIT License.
