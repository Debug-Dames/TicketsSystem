#!/bin/bash
# ============================================
# Team Git + Vite React Workflow Commands
# ============================================

echo "🚀 Team Workflow Helper Script"

# -------------------------------
# GIT BASICS
# -------------------------------

# Clone a repository
git clone <repo-url>

# Fetch all updates from remote
git fetch --all

# List all branches
git branch -a

# Switch to a branch
git checkout <branch-name>

# Create and switch to a new branch
git checkout -b <new-branch-name>

# Stage changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push changes (handles upstream if needed)
git push -u origin <branch-name>

# Pull latest changes from remote
git pull

# Pull specific remote + branch
git pull origin <branch-name>

# Make sure you’re on the branch you want to update
git checkout main

# Merge changes from another branch
git merge feature-branch

# -------------------------------
# VITE + REACT WORKFLOW
# -------------------------------

# Install dependencies
npm install

# Start development server
npm run dev

# Install a new package
npm install <package-name>

# Remove a package
npm uninstall <package-name>

