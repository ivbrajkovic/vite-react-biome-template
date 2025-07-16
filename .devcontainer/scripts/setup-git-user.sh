#!/bin/bash

USERNAME=$(git config user.name)
USEREMAIL=$(git config user.email)

echo "🔍 Checking Git user config..."

if [[ -n "$USERNAME" && -n "$USEREMAIL" ]]; then
  echo "✅ Git user is already configured:"
  echo "  Name : $USERNAME"
  echo "  Email: $USEREMAIL"
  exit 0
fi

echo "⚠️  Git user.name or user.email not set."

read -rp "Enter Git user.name: " NEW_USERNAME
read -rp "Enter Git user.email: " NEW_USEREMAIL

git config user.name "$NEW_USERNAME"
git config user.email "$NEW_USEREMAIL"

echo "✅ Git user config set:"
echo "  Name : $(git config user.name)"
echo "  Email: $(git config user.email)"
