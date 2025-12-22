#!/bin/bash

# Fixed script to update all documentation files with the new Chatbot component
# Removes any existing AITutor components first
# Run from the root directory of the project

echo "Updating documentation files with Chatbot component (fixed version)..."

# Find all markdown files in docs directory
for file in docs/*.md; do
    if [ -f "$file" ]; then
        echo "Updating $file..."

        # Create a temporary file
        temp_file=$(mktemp)

        # First, remove any existing AITutor imports and components
        sed -e '/import AITutor from/,/^<AITutor/d' "$file" > "$temp_file"

        # Now read the cleaned file and add Chatbot component after frontmatter
        cleaned_file=$(mktemp)
        line_num=0
        in_frontmatter=false
        after_frontmatter=false

        while IFS= read -r line || [ -n "$line" ]; do
            echo "$line" >> "$cleaned_file"

            if [[ $line_num -eq 0 && "$line" == "---" ]]; then
                in_frontmatter=true
            elif [[ $in_frontmatter == true && "$line" == "---" ]]; then
                in_frontmatter=false
                after_frontmatter=true
                # Add the import and component after frontmatter
                sed -i.bak -e "/---/r /dev/stdin" "$cleaned_file" << EOF

import Chatbot from '../src/components/Chatbot';

<Chatbot chapterTitle="Chapter Title Placeholder" chapterSlug="$(basename "$file" .md)" />
EOF
                # Now we need to fix the chapter title by extracting it properly
            fi

            ((line_num++))
        done < "$temp_file"

        # Extract the actual chapter title
        if grep -q "title:" "$file"; then
            chapter_title=$(grep -m 1 "title:" "$file" | sed 's/title: //; s/"//g; s/^\s*//; s/\s*$//')
        else
            # Try to extract from first H1
            chapter_title=$(grep -m 1 "^#" "$file" | sed 's/^#\s*//' | sed 's/^##.*$//' | head -n 1)
            if [ -z "$chapter_title" ] || [ "$chapter_title" = "" ]; then
                chapter_title=$(basename "$file" .md)
                chapter_title=$(echo "$chapter_title" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
            fi
        fi

        # Replace the placeholder with actual title
        sed "s/Chapter Title Placeholder/$chapter_title/g" "$cleaned_file" > "$file"

        rm "$temp_file" "$cleaned_file" "$cleaned_file.bak"
        echo "✓ Updated $file"
    else
        echo "⚠ File $file does not exist"
    fi
done

echo "All documentation files updated with Chatbot component!"