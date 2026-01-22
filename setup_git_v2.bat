@echo off
(
  git init
  git add .
  git commit -m "Enhance landing page aesthetic with video background and redesign navbar"
  git remote remove origin
  git remote add origin https://github.com/Rupesh946/StaySpace.git
  git branch -M main
  git push -u origin main
) > git_log.txt 2>&1
