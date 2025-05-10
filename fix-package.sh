
#!/bin/bash
# This script fixes the package.json file by adding a missing comma between scripts

# Find the pattern "dev": "vite" and replace it with "dev": "vite",
sed -i 's/"dev": "vite"/"dev": "vite",/g' package.json

echo "Fixed package.json file"
