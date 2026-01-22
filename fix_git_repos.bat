@echo off
echo Cleaning up nested git repositories...

REM Remove client/.git if it exists
if exist "client\.git" (
    echo Removing client/.git...
    rmdir /s /q "client\.git"
)

REM Remove server/.git if it exists
if exist "server\.git" (
    echo Removing server/.git...
    rmdir /s /q "server\.git"
)

REM Unstage everything to reset state (safely, keeping files)
echo Resetting git index...
git rm -r --cached . >nul 2>&1

REM Add everything again properly
echo Adding all files...
git add .

REM Commit
echo Committing...
git commit -m "Fix: Consolidate nested repositories and resolve deleted file status"

REM Push
echo Pushing...
git push -u origin main

echo Done!
