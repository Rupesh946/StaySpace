@echo off
echo Installing Server Dependencies...
cd server
call npm install
echo Seeding Database...
call npm run seed
cd ..

echo Installing Client Dependencies...
cd client
call npm install
cd ..

echo Setup Complete!
pause
