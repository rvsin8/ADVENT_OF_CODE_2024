def historian_hysteria(input_list):
    total_difference = 0
    left_list = []
    right_list = []
    for i in range(len(input_list)):
        if i % 2 == 0:
            left_list.append(input_list[i])
        else:
            right_list.append(input_list[i])
    left_list.sort()
    right_list.sort()

    for i in range(len(left_list)):
        total_difference += abs(left_list[i] - right_list[i])
        
    return total_difference

input_list = [3, 4, 4, 3, 2, 5, 1, 3, 3, 9, 3, 3]
print(historian_hysteria(input_list))  # Output: 11
