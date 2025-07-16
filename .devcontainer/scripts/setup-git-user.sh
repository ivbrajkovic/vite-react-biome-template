#!/bin/bash

USERNAME=$(git config --global user.name)
USEREMAIL=$(git config --global user.email)

echo "🔍 Checking Git global config..."

if [[ -n "$USERNAME" && -n "$USEREMAIL" ]]; then
  echo "✅ Git is already configured:"
  echo "  Name : $USERNAME"
  echo "  Email: $USEREMAIL"
  exit 0
fi

echo "⚠️  Git global user.name or user.email not set."

read -rp "Enter Git user.name: " NEW_USERNAME
read -rp "Enter Git user.email: " NEW_USEREMAIL

git config --global user.name "$NEW_USERNAME"
git config --global user.email "$NEW_USEREMAIL"

echo "✅ Git global config set:"
echo "  Name : $(git config --global user.name)"
echo "  Email: $(git config --global user.email)"
