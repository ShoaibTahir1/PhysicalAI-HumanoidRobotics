#!/bin/bash

# Script to add AITutor component to all documentation files
# Run from the root directory of the project

echo "Updating documentation files with AITutor component..."

# Find all markdown files in docs directory
for file in docs/*.md; do
    if [ -f "$file" ]; then
        echo "Updating $file..."

        # Create a temporary file
        temp_file=$(mktemp)

        # Read the file line by line
        line_num=0
        in_frontmatter=false
        after_frontmatter=false

        while IFS= read -r line || [ -n "$line" ]; do
            echo "$line" >> "$temp_file"

            if [[ $line_num -eq 0 && "$line" == "---" ]]; then
                in_frontmatter=true
            elif [[ $in_frontmatter == true && "$line" == "---" ]]; then
                in_frontmatter=false
                after_frontmatter=true
                # Add the import and component after frontmatter
                echo "" >> "$temp_file"
                echo "import AITutor from '../src/components/AITutor';" >> "$temp_file"
                echo "" >> "$temp_file"

                # Extract chapter title from the file
                chapter_title=$(grep -m 1 "title:" "$file" | sed 's/title: //; s/"//g; s/^\s*//; s/\s*$//')
                if [ -z "$chapter_title" ]; then
                    # If no title found in frontmatter, use filename
                    chapter_title=$(basename "$file" .md)
                    chapter_title=$(echo "$chapter_title" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
                fi

                # Create a slug from the filename
                chapter_slug=$(basename "$file" .md)

                echo "<AITutor chapterTitle=\"$chapter_title\" chapterSlug=\"$chapter_slug\" />" >> "$temp_file"
                echo "" >> "$temp_file"
            fi

            ((line_num++))
        done < "$file"

        # Replace the original file with the modified version
        mv "$temp_file" "$file"
        echo "✓ Updated $file"
    else
        echo "⚠ File $file does not exist"
    fi
done

echo "All documentation files updated with AITutor component!"