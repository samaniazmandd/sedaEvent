# Users

Place the credentials for at least two users in the table below. There should be at least one administrator and one regular user.


| Username | Password | Account type |
|----------|--------|------------|
| `admin@gmail.com`| `adminadmin`| admin account
| `useruser@gmail.com` | `useruser`  | user account


Notes about my project = 

- Instead of using a separate roles table I use a simple (isAdmin) booelan field inside my User model to separate the roles of admin and normal registered users !

- for images of the evenst I had two options: either not use images at all or upload them from my system. Uploading images would take more work and was not really needed for this project so I decided to use image URL instead !! For now this option works fine cause I can just copy the adress of an image from the browser and use it 


- When running the automated tests with Vitest I got the following error on my Mac with Apple Silicon (ARM) [cause]: Error: Cannot find module '@rollup/rollup-darwin-arm64' and I found out that this happens because Rollup uses platform specific builds https://sandipdulal.medium.com/fixing-vite-build-error-on-linux-and-windows-using-docker-error-cannot-find-module-e73bb2fb479d
so i had to reinstall everything 
rm -rf node_modules package-lock.json
npm install

