#include<stdio.h>
int main() {
    int num;
    printf("Enter the Number: ");
    scanf("%d", &num);

    switch(num) {
        case 12:
            printf("a dozen");
            break;
        case 13:
            printf("a baker's dozen");
            break;
        case 20:
            printf("a score");
            break;
        case 42:
            printf("you have the answer!");
            break;
        default:
            if (num >= 100)
                printf("lots and lots");
            else if (num<=10)
            {
                printf("Not a lot");
            }
            else
                printf("integer");
            break;
    }
    return 0;
}
