#include <stdio.h>

void comparing(int num) {
    int num_min = 45;
    int num_max = 100;
    if (num >= num_min && num <= num_max) {
        printf("Number %d is satisfying condition.\n", num);
    } else {
        printf("Not satisfying condition\n");
    }
}

int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    comparing(num);
    return 0;
}