#!/bin/bash

# Script to clean up duplicate AITutor imports and ensure proper format
# Run from the root directory of the project

echo "Cleaning up duplicate AITutor components..."

for file in docs/*.md; do
    if [ -f "$file" ]; then
        echo "Processing $file..."

        # Create a temporary file
        temp_file=$(mktemp)

        # Use sed to remove duplicate import/component pairs
        # This removes any duplicate import statements and component usage
        sed -e '/import AITutor from/,/^<AITutor/{N;s/import AITutor from.*\n<AITutor[^\>]*>//' -e '}' \
            -e '/import AITutor from/,/^<AITutor/{N;s/import AITutor from.*\n<AITutor[^\>]*>//' -e '}' \
            "$file" > "$temp_file"

        # Now we need to ensure the correct chapter title is used
        # Extract the actual title from the file content or frontmatter
        if grep -q "title:" "$file"; then
            chapter_title=$(grep -m 1 "title:" "$file" | sed 's/title: //; s/"//g; s/^\s*//; s/\s*$//')
        else
            # If no title in frontmatter, try to extract from the first H1
            chapter_title=$(grep -m 1 "^#" "$file" | sed 's/# //; s/^## //' | head -c -1)
            if [ -z "$chapter_title" ]; then
                chapter_title=$(basename "$file" .md)
                chapter_title=$(echo "$chapter_title" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
            fi
        fi

        # Create the correct slug
        chapter_slug=$(basename "$file" .md)

        # Add the proper import and component at the beginning (after frontmatter)
        # First, read the cleaned content
        cleaned_content=$(cat "$temp_file")

        # Write back to temp file with proper format
        {
            # Extract and preserve frontmatter
            sed -n '/^---/,/^---/p' "$file"
            echo ""
            echo "import AITutor from '../src/components/AITutor';"
            echo ""
            echo "<AITutor chapterTitle=\"$chapter_title\" chapterSlug=\"$chapter_slug\" />"
            echo ""
            # Add the rest of the content, skipping frontmatter
            echo "$cleaned_content" | sed '1,/^---$/d;/^---$/,$d'
        } > "$temp_file"

        # Replace the original file
        mv "$temp_file" "$file"
        echo "✓ Fixed $file"
    fi
done

echo "All files cleaned up with proper AITutor component!"