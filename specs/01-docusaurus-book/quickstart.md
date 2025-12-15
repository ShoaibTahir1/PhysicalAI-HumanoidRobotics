# Quickstart: Docusaurus Book - Physical AI & Humanoid Robotics

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   This command starts a local development server and opens the website in your browser. Most changes are reflected live without restarting the server.

3. **Build for Production**
   ```bash
   npm run build
   ```
   This command generates static content into the `build` directory and can be served using any static hosting service.

4. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```
   This command builds the website and deploys it to GitHub Pages at https://ShoaibTahir1.github.io/PhysicalAI-HumanoidRobotics/

## Project Structure

- `/docs`: Contains all the book chapters as markdown files
- `/src`: Contains custom React components, pages, and CSS styles
- `/static`: Contains static assets like images and downloadable files
- `docusaurus.config.js`: Main configuration file for the website
- `sidebars.js`: Defines the sidebar navigation structure

## Adding a New Chapter

1. Create a new markdown file in `/docs` with the appropriate naming convention
2. Add the chapter to `sidebars.js` to include it in the navigation
3. Ensure the chapter follows the writing style rules (simple English, short paragraphs, real-life examples)

## Testing

Since this is a static documentation site, testing involves:
- Verifying all links work correctly
- Ensuring content renders properly across different browsers
- Checking that the site is responsive on different screen sizes
- Validating that all 14 required chapters are present and complete