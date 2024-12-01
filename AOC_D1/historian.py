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


def historian_hysteria(input_list):
    similarity_score = 0
    left_list = []
    right_list = []
    for i in range(len(input_list)):
        if i % 2 == 0:
            left_list.append(input_list[i])
        else:
            right_list.append(input_list[i])

    right_map = {}
    for num in right_list:
        right_map[num] = right_map.get(num, 0) + 1

    for num in left_list:
        counts_in_right = right_map.get(num, 0)
        similarity_score += num * counts_in_right
        
    return similarity_score

