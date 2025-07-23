# Write  a program to store students record (roll no., Name, Father name) of a class using file handling.
import pandas as pd

# Read existing data
try:
    df = pd.read_csv("students.csv")
except FileNotFoundError:
    df = pd.DataFrame(columns=["Roll No.", "Name", "Father Name"])

while True:
    print("*" * 20)
    print("Enter data : 1 \nShow data: 2 \nExit : 3")
    choice = input("Enter your choice: ")
    if choice == "1":
        Rollno = int(input("Enter your Roll no.: "))
        name = input("Enter your name: ")
        Father_name = input("Enter your Father name: ")
        df = pd.concat([df, pd.DataFrame([{
            "Roll No.": Rollno,
            "Name": name,
            "Father Name": Father_name
        }])], ignore_index=True)
    elif choice == "2":
        print(df)
    elif choice == "3":
        break

print(df)