import csv
import os

class FileServices:

    def readFile(self, path):
        try:
            if not os.path.exists(path): 
                return 'File not found'

            with open(path, "r", encoding="utf-8") as fh:
                reader = csv.reader(fh)
                data = [row for row in reader]
            return data
        except Exception as e:
            return str(e)
        
if __name__ == "__main__":
    FileService = FileServices()
    FileServices.readFile()
    