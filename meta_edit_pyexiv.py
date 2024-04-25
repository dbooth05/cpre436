import pyexiv2

string_keys = ['Exif.Image.Software', 'Exif.Image.Make', 'Exif.Image.Model', 'Exif.Photo.LensModel']

def write_metadata(img_path, key, msg):
    # loads the image metadata in
    img = pyexiv2.ImageMetadata(img_path)
    img.read()

    # writes the message to the provided key
    # provided key chooses which category to store msg
    img[string_keys[key]] = msg
    img.write()


print("Keep messages small to conceal them")
for i in range(len(string_keys)):
    print(f'{i}. {string_keys[i]}')
print()

in_img = input("Enter path to image to write to: ")
in_key = int(input("Enter number of key to hide data at: "))
in_msg = input("What is the message you want to hide: ")

if in_key > 0 and in_key < len(string_keys):
    write_metadata(in_img, in_key, in_msg)
    print(f"Message hidden in {string_keys[in_key]}")
else:
    print(f"Failed to hide message, invalid key choice")
