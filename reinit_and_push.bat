@echo off
cd /d "%~dp0"
echo Re-initializing git... > reinit_log.txt 2>&1

rmdir /s /q .git >> reinit_log.txt 2>&1
git init >> reinit_log.txt 2>&1

echo Cleaning nested repos... >> reinit_log.txt 2>&1
if exist "client\.git" (
    attrib -r -s -h "client\.git" /s /d >> reinit_log.txt 2>&1
    rmdir /s /q "client\.git" >> reinit_log.txt 2>&1
)
if exist "server\.git" (
    attrib -r -s -h "server\.git" /s /d >> reinit_log.txt 2>&1
    rmdir /s /q "server\.git" >> reinit_log.txt 2>&1
)

echo Adding remote... >> reinit_log.txt 2>&1
git remote add origin https://github.com/Rupesh946/StaySpace.git >> reinit_log.txt 2>&1

echo Adding files... >> reinit_log.txt 2>&1
git add . >> reinit_log.txt 2>&1

echo Committing... >> reinit_log.txt 2>&1
git commit -m "Initial commit (consolidated monorepo)" >> reinit_log.txt 2>&1

echo Pushing... >> reinit_log.txt 2>&1
git branch -M main >> reinit_log.txt 2>&1
git push -u origin main --force >> reinit_log.txt 2>&1

echo Done. >> reinit_log.txt 2>&1
