@echo off
echo Starting force fix... > fix_log.txt 2>&1

echo Renaming client dotgit... >> fix_log.txt 2>&1
move "client\.git" "client\git_backup" >> fix_log.txt 2>&1
if exist "client\.git" (
    echo Failed to move client .git >> fix_log.txt 2>&1
    attrib -r -s -h "client\.git" /s /d >> fix_log.txt 2>&1
    rmdir /s /q "client\.git" >> fix_log.txt 2>&1
)

echo Renaming server dotgit... >> fix_log.txt 2>&1
move "server\.git" "server\git_backup" >> fix_log.txt 2>&1
if exist "server\.git" (
    echo Failed to move server .git >> fix_log.txt 2>&1
    rmdir /s /q "server\.git" >> fix_log.txt 2>&1
)

echo Resetting index... >> fix_log.txt 2>&1
git rm -r --cached . >> fix_log.txt 2>&1

echo Adding files... >> fix_log.txt 2>&1
git add . >> fix_log.txt 2>&1

echo Committing... >> fix_log.txt 2>&1
git commit -m "Force fix of nested repos" >> fix_log.txt 2>&1

echo Pushing... >> fix_log.txt 2>&1
git push origin main >> fix_log.txt 2>&1

echo Done. >> fix_log.txt 2>&1
