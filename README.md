![Pocket Plan_ ReadME Thumbnail](https://github.com/user-attachments/assets/6079c0af-b7db-456c-9bcc-c4c12efc4c1c)

### Plan for the money in your pocket.
Make informed decisions and stay on top of your money, making it simple to plan for the funds in your pocket.

## Features
- Track daily expenses and income
- Visualize spending by category

## Prerequisites
To get started with Pocket Plan, ensure that you have the following tools installed and properly configured on your system:
1. XAMPP Control Panel
   - [Install XAMPP](https://www.ionos.com/digitalguide/server/tools/xampp-tutorial-create-your-own-local-test-server/)
   - [Download XAMPP](https://www.apachefriends.org/de/download.html)

## Getting Started
Clone the repo onto your local machine.
```bash
git clone https://github.com/EstelitoBuenavista/PocketPlan.git
```

**Open XAMPP then start Apache and MySQL.** Open the repository in your VSCode and split the terminal into two.
```bash
# In the first terminal run the ff commands
cd .\server\
npm install
npm run db:migrate
npm run db:seed
npm run dev
```
// through seeding sample account has username:john_doe, password: 12345
```bash
# In the second terminal run the ff commands
cd .\client\pocketplan\
npm install
npm install --legacy-peer-deps
npm run dev
```

**Below are the environment variables you can configure.** Feel free to adjust these values according to your local setup or deployment environment.
```bash
DB_USER
DB_PASSWORD
DB_HOST
DB_NAME
NODE_ENV
```

### Figma Prototype & FigJam
Link to Prototype: [Figma Prototype](https://www.figma.com/proto/ysSmUzq4G3R9yIVdDLly2H/3105_AppDev%3A-B.T.V.?page-id=0%3A1&node-id=22-82&node-type=canvas&viewport=-199%2C-479%2C0.71&t=gmdaKf22hjGDhRdV-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=22%3A82)  
Link to FigJam: [FigJam](https://www.figma.com/board/cNS3Iu8aHhxEwPoT12O8tU/3105_AppDev%3A-Pocket-Plan-FigJam?node-id=0-1&t=5sALwjj56ib4VqaB-1)  
Password: `pocket-plan-2024`
