# Contributing to MeetUp

First off, thank you for considering contributing to MeetUp! It's people like you that make MeetUp such a great tool for language learners worldwide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/YOUR-USERNAME/MeetUp.git
   cd MeetUp
   ```
3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/tanish0007/MeetUp.git
   ```
4. **Create a branch** for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected
- **Include screenshots or GIFs** if applicable
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List some examples** of how it would be used
- **Specify which version** you're using

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Good for newcomers
- `help wanted` - Issues that need assistance
- `bug` - Something isn't working
- `enhancement` - New feature or request

### Pull Requests

1. Ensure your code follows the project's style guidelines
2. Update documentation if you're changing functionality
3. Add tests if applicable
4. Make sure all tests pass
5. Update the README.md if needed

## Development Workflow

### Setting Up Development Environment

1. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env` in both backend and frontend
   - Fill in your credentials

3. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

### Making Changes

1. **Create a new branch** from `main`
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. **Make your changes** following our style guidelines

3. **Test your changes** thoroughly

4. **Commit your changes** following our commit guidelines

5. **Push to your fork**
   ```bash
   git push origin feature/my-new-feature
   ```

6. **Open a Pull Request** on GitHub

## Style Guidelines

### JavaScript Style Guide

- Use **ES6+** syntax
- Use **const/let** instead of var
- Use **arrow functions** where appropriate
- Use **template literals** for string interpolation
- Use **async/await** instead of callbacks
- Use **meaningful variable names**
- Add **comments** for complex logic

#### Example:

```javascript
// Good
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Bad
var getUser = function(id) {
  User.findById(id, function(err, user) {
    if (err) console.log(err);
    return user;
  });
};
```

### React Component Style Guide

- Use **functional components** with hooks
- Use **PascalCase** for component names
- Use **camelCase** for prop names
- Keep components **small and focused**
- Extract **reusable logic** into custom hooks

#### Example:

```jsx
// Good
const FriendCard = ({ friend, onMessageClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Component content */}
    </div>
  );
};

// Bad
function friendCard(props) {
  // Component implementation
}
```

### CSS/Tailwind Guidelines

- Use **Tailwind utility classes** when possible
- Use **DaisyUI components** for consistency
- Keep custom CSS **minimal**
- Use **responsive classes** (sm:, md:, lg:)
- Group related classes together

#### Example:

```jsx
// Good
<div className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:shadow-md transition-shadow">
  {/* Content */}
</div>

// Avoid
<div className="flex p-4 bg-base-200 items-center rounded-lg justify-between hover:shadow-md transition-shadow">
  {/* Content */}
</div>
```

### Backend Style Guide

- Use **async/await** for asynchronous operations
- Always use **try/catch** blocks
- Return **consistent response formats**
- Use **middleware** for common operations
- Validate **user input**
- Handle **errors gracefully**

#### Example:

```javascript
// Good
export const getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('friends')
      .populate('friends', 'fullName profilePic');
    
    return res.status(200).json(user.friends);
  } catch (error) {
    console.error('Error in getUserFriends:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(auth): add OTP verification for signup

- Implement email OTP sending
- Add OTP verification endpoint
- Update signup flow to include OTP step

Closes #123
```

```
fix(chat): resolve message duplication issue

Fixed bug where messages were appearing twice in chat
when sent rapidly.

Fixes #456
```

## Pull Request Process

1. **Update documentation** - Update README.md or other docs if needed

2. **Test your changes** - Ensure all existing tests pass and add new tests if applicable

3. **Update dependencies** - Make sure package.json is up to date

4. **Follow the PR template** - Fill out all sections of the pull request template

5. **Request review** - Tag relevant maintainers for review

6. **Address feedback** - Make requested changes and push updates

7. **Wait for approval** - At least one maintainer must approve before merging

### PR Checklist

- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Dependencies updated if needed

## Questions?

Feel free to:
- Open an issue for discussion
- Reach out to maintainers
- Check existing documentation

Thank you for contributing to MeetUp! 🎉