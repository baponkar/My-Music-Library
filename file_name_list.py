import os

def list_mp3_files(directory):
    # List to store the file names without extension
    file_names = []

    # Iterate over all the files in the directory
    for file in os.listdir(directory):
        # Check if the file is an mp3 file
        if file.endswith('.mp3'):
            # Add the file name without the extension to the list
            file_names.append(os.path.splitext(file)[0])

    return file_names

# Replace 'your_directory_path' with the path to your music directory
directory_path = './music'
mp3_files = list_mp3_files(directory_path)

# Print the list of mp3 file names without the extension
print(mp3_files)
