# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Deploy steps
Create a new server on DigitalOcean or any other cloud provider.
Install Docker and Docker Compose on the server.
Edit file .github/workflows/deploy.yml and replace git repository URL with your repository URL and folder name with your project folder name.
Create ssh key pair on the server and add public key.
Add public key to settings of your account on GitHub.
Add next secrets to your repository on GitHub:
HOST - server IP address
USERNAME - server username
PASSWORD - server password
ENV_FILE - envs variables
Make test pull on your server manually to add it to known hosts.
Push changes to your repository.
Go to Actions tab on GitHub and run deploy workflow (you can run it manually or push changes to the repository).
Setup nginx or apache on the server to serve your project.
Done! Your project is deployed on the server.