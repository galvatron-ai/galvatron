#!/bin/bash

# Check if .dev.vars already exists
if [ ! -f .dev.vars ]; then
    # Copy .dev.vars.example to .dev.vars
    cp .dev.vars.example .dev.vars
    
    # Generate a random token
    AUTH_TOKEN=$(head -c 32 /dev/urandom | base64)
    
    # Append the AUTH_TOKEN to .dev.vars
    echo "AUTH_TOKEN=$AUTH_TOKEN" >> .dev.vars
    
    echo ".dev.vars file created with a new AUTH_TOKEN."
else
    echo ".dev.vars file already exists. No changes made."
fi