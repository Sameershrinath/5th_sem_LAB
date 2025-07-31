#include<stdio.h>
int main(){
    char name[15];
    printf("Enter any string: ");
    scanf("%s",name);

    int length = 0;
    for (length = 0; name[length] != '\0'; length++){
        printf("checking...");
    }

    printf("\nLength of string is: %d", length);
    return 0;
}
