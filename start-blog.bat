@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "NODE_EXE=C:\Users\LEGION\.workbuddy\binaries\node\versions\22.22.2-3\node.exe"
if not exist "%NODE_EXE%" set "NODE_EXE=node"
start "" http://127.0.0.1:4173
"%NODE_EXE%" serve.js 4173
pause
