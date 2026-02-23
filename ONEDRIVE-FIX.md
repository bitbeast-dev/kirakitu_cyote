# OneDrive Build Fix Instructions

## Problem
OneDrive is syncing your `node_modules` and `.next` folders, causing file lock issues during build.

## Solution: Exclude folders from OneDrive sync

### Method 1: Using OneDrive Settings (Recommended)
1. Right-click the OneDrive icon in system tray
2. Click "Settings"
3. Go to "Sync and backup" tab
4. Click "Advanced settings"
5. Add these folders to exclusion list:
   - `baby/.next`
   - `baby/node_modules`

### Method 2: Using File Explorer
1. Navigate to: `C:\Users\Mr. BitBeast\OneDrive\Desktop\baby`
2. Right-click on `.next` folder → Properties
3. Uncheck "Always keep on this device"
4. Repeat for `node_modules` folder

### Method 3: Move project outside OneDrive (Best)
```bash
# Move project to local drive
xcopy /E /I "C:\Users\Mr. BitBeast\OneDrive\Desktop\baby" "C:\Projects\baby"
cd C:\Projects\baby
npm install
npm run build
```

## After Exclusion, Run:
```bash
clean-build.bat
```

## Alternative: Quick Fix
If you can't exclude folders, pause OneDrive sync before building:
1. Right-click OneDrive icon
2. Click "Pause syncing" → "2 hours"
3. Run `clean-build.bat`
4. Resume sync after build completes
