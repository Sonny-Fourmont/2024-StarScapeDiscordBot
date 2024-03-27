# StarScape Discord Bot
# Hosting on Linux or MacOS only
<!-- I developed a mini web app with it's respective front-end and back-end. Includes the Controller (API), the service and the BD (MongoDB) -->
## Installation
1- Clone the repository:
```bash
git clone https://github.com/Sonny-Fourmont/Coffee-Todo.git
```
2- install npm if you don't have it:
- Linux:
```bash
sudo <your package manager> npm
```
- MacOS:
```bash
brew install npm
```
3- Install the dependencies with npm:
```bash
npm install
```
4- Compile the TS code:
```bash
npx tsc
```
## Use the app
1- Start the server:
```bash
node ./js/index.js
```
2- Get the result:

Use a simple browser like: Firefox, Chrome... With this URL:
```
localhost:3000/<any routes>
```
or use Postman or ThunderClient on VsCode with the same URL.

---

Your result will appear as a JSON file

Here are some patterns:
do the same with: companies, contacts, tickets, transactions.
```bash
localhost:3000/
localhost:3000/companies || localhost:3000/companies/<ID>
localhost:3000/companies/create || localhost:3000/companies/delete || localhost:3000/companies/update
```
## Technologies Used
- ![Typescript](https://img.shields.io/badge/typescript-007acc?style=for-the-badge&logo=typescript&logoColor=white)
- ![Javascript](https://img.shields.io/badge/javascript-F0DB4F?style=for-the-badge&logo=javascript&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
## FrameWork and Libraries Used
- Express (TS & JS)
## Credits
Developed by Sonny FOURMONT.