@echo off
echo Cleaning build artifacts...

REM Kill any running Node processes
taskkill /F /IM node.exe 2>nul

REM Wait for processes to fully terminate
timeout /t 2 /nobreak >nul

REM Delete .next folder
if exist .next (
    echo Removing .next folder...
    rmdir /s /q .next
)

REM Delete node_modules/.prisma
if exist node_modules\.prisma (
    echo Removing Prisma cache...
    rmdir /s /q node_modules\.prisma
)

REM Delete node_modules/@prisma
if exist node_modules\@prisma (
    echo Removing @prisma folder...
    rmdir /s /q node_modules\@prisma
)

echo.
echo Reinstalling Prisma...
call npm install @prisma/client prisma

echo.
echo Generating Prisma Client...
call npx prisma generate

echo.
echo Building Next.js...
call npm run build

echo.
echo Done!
pause
