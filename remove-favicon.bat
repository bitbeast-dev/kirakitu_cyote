@echo off
if exist "src\app\favicon.ico" (
    del "src\app\favicon.ico"
    echo Removed Next.js default favicon
) else (
    echo Favicon already removed
)
