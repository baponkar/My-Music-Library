import os
import json

def create_music_json(directory):
    music_list = []

    # Get all .mp3 files in the directory
    for filename in os.listdir(directory):
        if filename.endswith(".mp3"):
            file_path = os.path.join(directory, filename)
            title = os.path.splitext(filename)[0]  # Extract title from filename

            # Create JSON object for each file
            music_data = {
                "backgroundImage": "./assets/images/poster-1.jpg",
                "posterUrl": "./assets/images/poster-1.jpg",
                "title": title,
                "album": "Not Found",
                "year": 2024,
                "artist": "Unknown Artist",
                "musicPath": file_path
            }
            music_list.append(music_data)

    # Write music_list to JSON file
    with open('music_data.json', 'w') as f:
        json.dump(music_list, f, indent=2)

# Directory containing .mp3 files
music_directory = './music'

# Create JSON file
create_music_json(music_directory)
