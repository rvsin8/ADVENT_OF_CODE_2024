/*
--- Day 2: Red-Nosed Reports ---
Fortunately, the first location The Historians want to search isn't a long walk from the Chief Historian's office.

While the Red-Nosed Reindeer nuclear fusion/fission plant appears to contain no sign of the Chief Historian, the engineers there run up to you as soon as they see you. Apparently, they still talk about the time Rudolph was saved through molecular synthesis from a single electron.

They're quick to add that - since you're already here - they'd really appreciate your help analyzing some unusual data from the Red-Nosed reactor. You turn to check if The Historians are waiting for you, but they seem to have already divided into groups that are currently searching every corner of the facility. You offer to help with the unusual data.

The unusual data (your puzzle input) consists of many reports, one report per line. Each report is a list of numbers called levels that are separated by spaces. For example:

7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
This example data contains six reports each containing five levels.

The engineers are trying to figure out which reports are safe. The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. So, a report only counts as safe if both of the following are true:

The levels are either all increasing or all decreasing.
Any two adjacent levels differ by at least one and at most three.
In the example above, the reports can be found safe or unsafe by checking those rules:

7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.
So, in this example, 2 reports are safe.

Analyze the unusual data from the engineers. How many reports are safe?

Your puzzle answer was 371.

--- Part Two ---
The engineers are surprised by the low number of safe reports until they realize they forgot to tell you about the Problem Dampener.

The Problem Dampener is a reactor-mounted module that lets the reactor safety systems tolerate a single bad level in what would otherwise be a safe report. It's like the bad level never happened!

Now, the same rules apply as before, except if removing a single level from an unsafe report would make it safe, the report instead counts as safe.

More of the above example's reports are now safe:

7 6 4 2 1: Safe without removing any level.
1 2 7 8 9: Unsafe regardless of which level is removed.
9 7 6 2 1: Unsafe regardless of which level is removed.
1 3 2 4 5: Safe by removing the second level, 3.
8 6 4 4 1: Safe by removing the third level, 4.
1 3 6 7 9: Safe without removing any level.
Thanks to the Problem Dampener, 4 reports are actually safe!

Update your analysis by handling situations where the Problem Dampener can remove a single level from unsafe reports. How many reports are now safe?

Your puzzle answer was 426.
*/
const reports = input.split('\n').map(line => line.trim().split(' ').map(Number));
function countSafeReports(input) {
    let safeCount = 0;
    
    function isSafe(report) {
        let increasing = true, decreasing = true;
        for (let i=1; i<report.length; i++) {
            const diff = report[i] - report[i-1];
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
            if (diff > 0) decreasing = false;
            if (diff < 0) increasing = false;
        }
        return increasing || decreasing;
    };

    for (let report of reports) {
        if (isSafe(report)) safeCount++;
    };

    return safeCount;
};

function countSafeReportsWithDampener(input) {
    let safeCount = 0;

    function isSafe(report) {
        let increasing = true;
        let decreasing = true;
        for (let i = 1; i < report.length; i++) {
            const diff = report[i] - report[i - 1];
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
                return false;
            }
            if (diff > 0) decreasing = false;
            if (diff < 0) increasing = false;
        }
        return increasing || decreasing;
    };

    function isSafeWithDampener(report) {
        if (isSafe(report)) return true;
        for (let i = 0; i < report.length; i++) {
            const modifiedReport = [...report];
            modifiedReport.splice(i, 1); // Remove one level
            if (isSafe(modifiedReport)) {
                return true;
            }
        }
        return false;
    };

    for (let report of reports) {
        if (isSafeWithDampener(report)) {
            safeCount++;
        }
    };

    return safeCount;
}



const input = `38 41 44 47 50 47
75 78 79 82 85 85
11 13 16 19 21 25
39 40 43 44 50
75 77 80 78 80 83 84 87
17 20 23 21 22 23 24 22
80 82 79 80 82 82
50 51 49 52 56
78 80 82 83 80 81 82 88
43 45 48 50 52 52 55
34 35 38 38 41 39
51 54 57 60 62 63 63 63
24 26 27 30 33 33 34 38
24 25 26 26 27 28 33
33 35 37 41 44 46
55 58 60 63 66 70 71 70
90 93 94 98 98
63 64 67 69 73 77
13 15 18 22 25 28 34
60 63 68 70 71 74 76 79
76 79 82 89 87
63 66 69 71 74 76 82 82
55 57 63 64 66 70
63 64 67 68 74 75 82
47 45 46 47 49
22 21 22 24 27 26
67 64 65 67 69 72 75 75
24 22 24 26 28 31 35
50 48 49 52 57
69 67 70 71 68 69 70 71
38 37 38 39 42 41 38
34 32 31 32 32
14 13 14 17 19 18 22
76 74 77 79 80 83 81 88
89 87 87 90 92
86 85 87 90 90 92 93 92
34 33 34 37 37 37
91 88 89 92 92 96
84 82 83 86 88 88 95
10 8 10 14 16 18
67 64 66 68 72 70
31 30 32 36 38 38
64 61 65 66 69 70 74
61 60 61 65 68 75
56 53 55 56 63 64
37 34 35 36 43 44 42
41 39 41 44 50 51 51
36 33 34 40 42 43 45 49
45 44 45 47 50 57 63
84 84 85 87 90 91 92
40 40 41 43 46 49 47
24 24 25 28 30 30
86 86 88 89 91 94 95 99
28 28 30 33 35 37 38 43
74 74 76 73 76
85 85 86 84 82
93 93 92 93 96 96
70 70 73 72 76
49 49 48 49 54
12 12 13 15 18 18 21
59 59 61 63 66 68 68 66
28 28 31 31 31
89 89 89 91 95
24 24 26 28 28 31 32 39
70 70 71 75 78 81 82
45 45 48 50 54 51
42 42 46 48 50 50
12 12 13 17 19 21 24 28
4 4 8 11 18
18 18 19 24 26
45 45 50 52 53 50
60 60 62 65 68 74 74
49 49 51 58 60 61 64 68
21 21 28 29 30 36
69 73 76 79 82
5 9 11 14 17 18 15
4 8 10 12 12
62 66 68 69 73
2 6 7 9 10 11 13 19
54 58 55 58 59 62
1 5 7 4 5 3
55 59 56 58 61 64 64
85 89 86 88 90 93 97
79 83 82 84 89
40 44 44 45 46
19 23 24 24 23
28 32 33 33 36 36
28 32 32 35 38 42
47 51 52 52 53 59
29 33 35 37 41 42
75 79 83 84 85 88 85
41 45 49 51 54 55 55
36 40 42 44 48 52
16 20 23 25 29 36
47 51 54 55 57 62 63
87 91 93 99 96
15 19 21 26 26
37 41 44 49 52 55 59
9 13 20 21 28
16 22 23 26 29
34 41 43 44 47 48 46
3 10 12 13 14 14
16 23 25 28 31 35
18 24 26 28 29 32 37
59 66 69 70 73 70 72
40 45 46 49 46 49 46
14 20 22 24 27 24 24
75 82 83 86 84 88
14 21 22 24 23 26 29 36
1 7 10 10 11 13 14 16
2 8 9 12 14 14 12
2 9 9 12 13 14 14
10 15 17 17 21
54 59 60 60 65
70 77 79 83 84
21 28 32 35 36 38 37
26 33 34 38 41 42 43 43
4 11 12 16 17 18 21 25
25 32 33 35 38 42 45 50
19 26 28 29 34 37 40 43
39 46 51 53 56 57 55
1 8 13 15 15
55 62 65 66 71 72 76
42 49 56 57 58 59 61 68
78 76 75 74 76
30 29 27 26 24 23 21 21
16 13 11 10 7 3
41 40 38 37 34 32 31 25
49 46 48 47 44 41
71 69 71 69 71
6 3 5 2 2
94 91 88 86 83 84 82 78
35 33 30 33 30 25
43 40 38 38 36 35 33
34 32 30 29 28 28 27 29
61 58 58 55 54 52 52
79 77 76 76 73 69
81 79 76 73 73 71 66
20 19 17 13 10
94 92 89 88 86 83 79 81
55 54 51 47 47
27 26 24 21 17 15 11
20 19 18 14 13 10 4
50 49 48 47 45 39 36 34
82 80 74 71 74
93 92 89 88 83 81 81
98 95 89 88 85 81
28 25 23 20 18 11 9 2
6 7 4 2 1
52 53 51 49 50
7 9 8 7 6 5 4 4
89 90 88 86 83 81 77
29 32 31 29 28 21
68 70 72 69 68 65 64 61
85 87 86 85 87 89
46 49 48 49 49
83 84 82 83 79
32 35 33 35 28
14 17 16 16 14
46 47 47 44 47
15 18 16 13 13 13
11 13 12 12 11 8 4
92 93 92 92 89 82
39 41 38 37 33 31
12 13 12 8 6 5 3 4
70 73 70 67 66 62 59 59
17 18 17 16 15 13 9 5
39 42 38 35 32 29 27 22
54 57 54 49 47
51 54 52 50 45 48
24 25 24 17 16 16
32 34 27 25 21
38 39 37 32 27
14 14 11 10 7 5 2
87 87 86 85 82 81 82
50 50 47 44 43 43
78 78 76 73 69
21 21 20 17 16 13 12 6
53 53 56 53 51 49 48 45
92 92 95 93 91 89 87 88
6 6 7 5 3 1 1
98 98 96 98 95 93 92 88
15 15 17 14 13 12 9 3
38 38 38 35 34 33 31
42 42 40 39 39 36 38
32 32 31 28 28 27 27
9 9 9 8 5 1
49 49 47 44 42 41 41 35
49 49 48 47 43 40
61 61 58 56 52 49 46 49
87 87 83 80 80
91 91 89 85 84 80
27 27 26 22 17
91 91 90 89 82 81 78
50 50 48 45 38 39
12 12 6 3 1 1
84 84 82 81 74 72 70 66
50 50 47 45 43 38 37 31
82 78 77 74 71
94 90 89 86 89
16 12 10 7 7
85 81 80 77 73
86 82 79 76 69
90 86 85 86 83 82
46 42 39 36 38 41
16 12 15 13 10 7 4 4
38 34 37 35 33 31 27
53 49 47 44 46 45 38
58 54 54 53 50
69 65 63 61 58 58 57 58
28 24 23 22 21 21 21
32 28 28 25 22 18
19 15 13 13 10 4
63 59 56 52 49 47 46 45
32 28 25 21 19 17 15 18
62 58 57 56 52 52
93 89 88 87 83 79
94 90 87 83 76
72 68 65 60 58 55
44 40 37 30 32
69 65 64 63 61 58 51 51
82 78 76 70 69 66 62
62 58 52 51 45
90 85 82 81 79 78 75 72
76 69 67 66 69
68 63 61 60 58 56 56
72 65 62 60 56
81 74 73 71 68 65 58
69 63 60 63 62 60
69 62 61 60 58 57 60 61
57 51 53 51 50 49 49
26 20 18 21 19 15
44 39 36 37 30
48 41 41 39 37
29 24 24 22 23
38 31 28 28 27 27
97 92 90 90 88 84
53 46 45 42 42 35
72 67 64 60 58 55 53
69 64 63 62 60 57 53 56
32 25 22 18 16 16
24 17 13 12 8
31 24 21 19 15 9
41 36 29 27 24 21 20 18
22 15 10 7 5 7
56 51 50 48 42 39 38 38
59 52 49 43 39
89 82 81 78 72 69 64
8 10 11 12 14 15 16 13
18 20 21 22 24 26 26
36 37 39 42 45 48 50 54
15 16 18 20 21 28
10 13 10 11 13
87 90 93 96 98 99 97 94
96 97 98 96 96
6 7 4 5 8 12
53 55 53 55 60
26 27 29 30 30 32 33
43 44 44 47 46
31 33 35 35 38 41 44 44
13 16 17 19 19 21 22 26
29 31 31 34 35 37 40 45
83 84 86 87 91 93 96
78 80 83 84 88 86
1 2 3 5 9 11 11
3 4 8 9 10 14
66 69 73 75 80
15 18 19 21 28 29 31
74 76 79 84 86 89 87
17 19 22 24 31 31
13 14 15 18 23 25 27 31
26 27 29 34 37 44
38 35 38 39 40 41 42
78 76 78 79 81 80
8 6 7 8 9 10 10
56 55 56 59 62 63 65 69
43 40 42 45 47 48 53
88 86 85 88 90
75 74 77 75 76 77 80 77
7 6 9 6 8 8
54 52 53 52 53 54 58
32 29 30 33 32 37
66 63 64 65 65 66
85 82 82 83 82
71 69 69 70 71 71
82 80 83 86 88 88 92
92 89 89 90 93 94 99
72 70 72 73 75 79 80
51 48 49 50 54 55 58 57
72 70 73 75 79 80 80
71 68 71 72 76 80
49 48 52 55 56 59 65
42 40 41 44 49 50
65 63 69 70 71 70
46 44 45 48 49 54 55 55
20 18 20 23 30 32 36
29 27 30 37 40 45
86 86 88 90 92
79 79 80 83 86 89 92 89
73 73 76 79 81 83 83
61 61 62 63 65 67 71
87 87 90 91 98
48 48 51 50 53 56
54 54 53 54 52
92 92 91 92 95 95
31 31 33 36 37 34 35 39
55 55 52 53 58
82 82 83 84 86 86 87 89
20 20 20 21 20
27 27 30 30 31 31
22 22 23 23 24 27 28 32
82 82 84 85 85 87 93
41 41 45 46 49 50
61 61 65 67 69 68
54 54 58 61 64 64
48 48 52 55 59
16 16 17 21 26
18 18 21 24 29 30 32 33
26 26 29 35 32
15 15 18 21 24 25 32 32
63 63 65 71 73 77
36 36 39 42 45 46 53 60
40 44 45 47 50 52
3 7 9 11 12 15 12
39 43 45 48 49 50 53 53
1 5 6 9 10 14
81 85 88 90 91 92 99
25 29 31 34 32 35
71 75 77 76 73
38 42 39 40 42 44 44
1 5 8 10 9 10 14
80 84 85 84 86 92
72 76 78 81 81 84 85
85 89 92 92 93 95 94
89 93 93 94 94
8 12 13 14 15 16 16 20
57 61 63 66 66 72
82 86 89 90 93 97 98 99
4 8 10 14 15 13
4 8 9 11 15 15
26 30 33 36 37 41 45
10 14 16 20 22 29
3 7 12 15 18
72 76 78 79 82 87 90 89
71 75 77 82 82
71 75 82 84 88
15 19 26 29 34
66 72 74 76 78 81
13 19 22 23 20
43 50 53 56 58 58
67 72 73 76 78 82
67 73 75 77 80 83 84 89
71 78 77 80 83
23 30 32 33 32 31
31 36 39 36 36
35 41 43 46 45 48 52
36 43 40 42 48
49 54 55 57 57 60 63 64
42 49 52 52 49
65 70 73 73 75 77 80 80
61 66 66 69 70 71 73 77
32 38 38 40 47
65 72 74 75 77 81 84
42 48 49 51 55 53
47 54 56 57 61 62 62
7 14 16 20 21 22 26
45 50 52 55 59 62 64 71
37 44 49 52 53
27 32 38 40 42 45 46 45
47 52 58 59 61 61
1 6 7 12 13 14 17 21
40 47 53 55 56 63
74 73 72 70 68 66 63 66
11 9 7 5 3 3
38 35 33 31 29 25
66 64 62 61 60 59 56 49
20 17 16 17 14 12 11 10
88 87 88 85 82 81 80 83
40 37 40 38 37 34 33 33
13 11 13 11 8 7 3
64 61 60 63 62 55
28 26 26 23 22 19
13 10 7 6 6 7
53 50 49 49 47 45 45
71 68 66 65 65 62 60 56
80 77 75 73 72 72 69 62
39 37 34 30 29 27
40 38 37 33 34
39 37 33 31 29 26 24 24
60 57 53 51 47
26 23 19 18 11
57 56 51 49 48 47 46 44
75 74 67 66 63 62 61 62
26 25 20 17 17
30 29 27 21 19 18 14
86 85 79 78 71
38 39 38 35 34 31 30
52 53 50 49 46 44 45
92 93 92 91 90 90
24 27 25 24 23 19
29 32 29 28 25 24 18
77 78 81 78 77 75
21 22 21 19 21 22
32 35 32 31 32 31 28 28
81 83 84 82 80 78 74
23 24 21 18 17 18 15 8
20 22 21 21 18
54 57 56 55 53 51 51 52
11 12 10 10 10
45 46 45 44 42 42 38
69 70 67 65 65 64 58
15 16 15 11 10 9 8
37 38 34 33 31 29 27 29
46 49 46 45 41 38 37 37
41 43 39 37 36 32
82 85 81 79 77 74 69
85 87 84 82 81 76 73 71
75 78 73 70 73
43 45 38 36 35 33 33
62 65 59 58 55 51
31 34 32 27 24 17
11 11 8 7 4 1
94 94 93 91 90 87 86 87
26 26 23 20 19 17 17
12 12 10 9 7 3
79 79 78 76 75 69
16 16 17 16 13
38 38 35 34 37 36 33 35
37 37 36 37 36 34 32 32
48 48 47 50 48 45 41
53 53 52 49 51 49 42
78 78 78 76 75
91 91 90 87 85 85 82 85
58 58 56 54 51 51 51
29 29 27 27 26 25 23 19
71 71 71 70 69 64
17 17 14 11 7 4 3 1
21 21 19 15 17
28 28 26 22 22
51 51 50 46 42
26 26 25 21 20 17 11
72 72 70 65 63 61 58 56
84 84 78 77 80
40 40 39 36 31 29 28 28
22 22 21 18 13 11 10 6
63 63 61 56 54 47
91 87 84 81 78 77
97 93 91 89 86 85 84 87
19 15 14 13 13
20 16 13 12 10 6
96 92 90 88 86 83 76
97 93 95 94 92 89
47 43 41 38 36 38 40
85 81 84 81 79 76 76
80 76 77 75 71
32 28 26 29 27 24 23 18
30 26 24 24 21 19 18 17
22 18 16 16 18
77 73 71 71 69 68 67 67
41 37 36 34 31 31 28 24
97 93 91 88 85 85 79
47 43 39 36 34
29 25 23 21 17 19
55 51 48 47 43 43
91 87 86 83 79 78 74
54 50 46 45 40
42 38 37 32 31
40 36 30 29 28 25 24 27
55 51 44 43 40 37 37
45 41 36 33 29
74 70 63 61 54
38 31 29 26 24 23
55 50 47 44 41 39 40
64 57 56 54 53 50 50
26 20 19 17 13
86 79 76 73 67
21 15 12 9 6 3 6 3
90 85 83 80 82 84
59 52 54 51 51
41 35 37 34 31 28 24
48 42 40 38 35 34 36 31
40 35 34 34 32
69 62 62 59 61
79 73 71 68 67 67 65 65
57 52 49 48 48 47 45 41
37 30 29 29 27 26 19
45 38 35 31 28
80 74 70 68 66 64 61 62
91 84 80 78 76 76
22 16 13 11 7 3
34 29 25 24 22 15
87 82 76 73 72
29 22 19 13 10 13
86 79 73 72 72
71 66 65 63 56 55 51
37 32 25 22 19 18 11
87 87 86 85 78 76 76
7 11 13 15 18
47 46 48 50 51 56 58 63
35 35 36 35 33 30 32
38 34 32 25 24 26
46 41 38 35 32 32
19 19 15 13 12 5
22 18 17 16 13 10 9 5
65 69 72 77 78
23 22 25 25 24
3 2 4 5 12 15
21 21 20 13 11
45 45 44 43 42 40 38 41
66 64 63 62 64 64
39 32 31 27 20
23 20 18 18 15 12 9 5
44 41 42 45 48 49 52 56
10 14 17 18 16
86 81 75 74 68
77 76 73 70 69 69
25 23 26 32 30
16 20 23 21 24 28
80 80 83 85 85 82
21 21 18 20 21 24 26
26 29 28 26 21
9 15 17 19 20 21 23 28
57 58 61 63 65 69 70 75
72 75 78 81 86 88 90 91
66 68 69 74 79
16 15 15 16 17 24
60 66 67 66 69 76
46 42 43 42 41 39 34
31 31 34 34 34
18 18 14 13 11 7
1 1 4 5 6 8 15
43 47 49 55 59
11 11 14 17 16
31 34 32 30 29 28 29
99 99 97 97 95 98
66 68 72 74 78
6 13 15 16 19 19 20 21
91 92 91 91 89 90
33 39 42 46 52
51 50 51 52 52
41 38 40 43 47 48 52
40 36 34 32 32 29 29
35 34 37 39 43 44 47
89 87 86 83 81 79 78 71
33 29 26 21 20 15
70 72 73 74 77 77 78 78
86 87 85 87 89 92 95
56 59 58 56 55 55 52 52
8 8 10 11 12 11 17
29 30 27 26 23 22 20 20
47 53 55 56 57 59 56 56
8 8 10 11 15 19
15 15 16 21 24 27 28 25
55 52 55 58 65 67 67
74 68 65 64 62 60 58 52
30 34 36 35 37
64 60 59 57 54 53 52 47
34 36 38 36 39 42 46
36 30 30 29 26 25 22 22
95 96 98 96 95
49 47 44 41 37
8 14 15 15 18 19 16
40 42 40 40 33
50 48 51 51 51
18 17 20 23 26 26 27 31
87 91 92 93 93 97
50 53 56 60 62 64
71 75 79 81 81
74 76 70 68 63
27 22 19 21 20 20
67 63 62 58 56 54 52 48
83 85 88 91 92 93 96 96
67 74 76 74 75 78 80 78
60 60 57 53 53
16 15 14 17 20 22 25 29
66 69 66 66 62
65 69 72 75 74 74
52 45 42 40 43
17 17 20 23 26 31 35
35 40 42 44 45 44
80 79 80 82 83 83 84
25 24 20 17 16 13 8
88 81 80 77 73 75
70 69 69 67 61
9 14 15 21 22 19
40 40 43 44 45 46 49 52
78 73 72 70 71 68
14 20 23 25 31 37
16 22 23 24 26 25 26
32 28 26 24 24
24 21 24 27 28 32 38
47 48 47 45 41
45 49 53 54 57 63
37 40 42 44 45 47 50 55
42 42 39 42 44 47 47
45 41 42 41 39 38 35 31
13 9 7 6 2 2
63 63 60 59 58 55 54
44 41 40 38 37 32 28
33 28 24 23 20 19 19
27 21 18 18 17 16 15 16
11 14 13 14 19
87 83 80 77 70 68 65 65
15 13 11 8 10
35 39 40 39 41 39
46 50 50 53 56 63
76 79 77 70 68
63 65 69 72 74 77 75
30 34 36 38 41 42 46
20 16 15 12 10 8 5 3
41 45 45 48 45
27 33 33 34 38
78 83 84 90 92 96
28 29 28 25 22 19 15 15
81 83 83 80 78 75
74 69 66 65 62 61 58 54
89 83 81 79 78 77 77 74
58 58 56 57 60 61 62 66
9 12 14 17 19 22 25 24
14 14 11 9 8 6 7 3
22 22 20 17 19 14
43 43 44 51 53 55 62
75 75 74 73 73 70
61 61 64 66 66 70
38 35 35 33 31 29 32
41 41 39 37 36 33 31 24
73 70 72 69 76
91 91 90 89 88 84
12 16 20 23 25 27 30 34
84 86 87 89 90 93
94 92 89 86 85 84 83 82
49 46 45 44 41
21 19 17 16 14 12 10
23 24 25 28 30 31 34 36
15 12 10 8 6
67 70 71 72 75 77
27 26 24 23 20 17 14
74 75 76 79 81 84 85 88
35 34 31 29 26 24 23
9 8 7 4 2
17 16 13 10 8 6 4 3
45 47 50 52 54 56 58
28 29 30 31 32 35 38 40
69 68 66 64 63 62 60
43 44 47 48 51 52
21 24 26 28 29
29 27 25 22 19 18 16
86 83 82 80 77 76 73 71
23 21 20 17 16 15 12 10
7 8 9 12 15 17 20
26 28 30 33 36 38
29 28 25 24 21 19 17
86 84 83 81 78 77 74
5 8 11 13 16 18
70 71 72 73 76 77
28 31 32 33 35 37
27 25 24 22 19
36 35 34 31 30 29
30 28 25 22 20 18 15 13
27 30 31 33 34 35 36
15 17 18 21 23 24
23 26 28 29 31
76 79 82 83 86 87 90 91
32 31 28 25 23
3 4 5 8 9 10 13 16
8 11 13 15 17
58 56 55 54 52 51 48
41 44 45 47 50 52 54 57
66 65 64 62 60 59 57
69 66 63 60 58 55
27 30 31 33 34 35 36 39
43 40 39 38 36 35
42 41 39 36 33
77 79 82 85 88 89 91
14 13 12 9 6 4 3 2
47 49 52 55 56
88 91 92 93 96 97 99
99 97 96 93 91 90
74 77 79 82 85 88 90
1 4 5 7 10 11
16 18 21 24 26 28 30
99 96 93 90 89
70 69 66 64 63 60 58 57
77 75 72 69 67 64
30 27 25 23 21 18
87 84 83 81 79 77
20 21 24 27 29
29 26 23 21 20 17 16 14
43 41 40 39 38 36 35
61 64 66 68 70 73 74 75
39 41 42 43 44 46 49
17 20 23 25 28 29 30 31
37 40 43 45 48 49 51 54
49 52 54 57 58
15 18 21 24 27 30
20 18 16 15 14
86 85 82 81 80 77
62 61 60 58 56 54 53 52
16 13 10 9 6 4 3 2
14 13 11 9 8 7 6 5
55 56 57 59 62 63 66
59 61 64 66 67 69 72 75
14 17 19 21 22
52 49 47 46 43
80 82 84 85 88
18 15 13 11 10
86 83 80 79 78 75 74
50 49 46 44 42 41
46 48 50 52 54 55 58
64 61 59 57 55 52
10 11 14 17 19 20
86 85 83 80 78 77 74
57 55 54 53 50 49
72 70 69 68 67 64 63 60
60 59 56 55 53 52
46 48 51 54 55 58 61
24 23 22 20 17 15 12
71 74 76 78 80 81 84
30 33 34 35 37 39 40 43
67 68 70 73 75 78 80 81
53 51 49 46 43 42
46 47 48 49 50 52
16 17 18 20 23 25 27 28
74 72 71 69 66 65 64 63
98 97 94 91 88 87 85
49 48 47 45 44 42 41 38
83 84 85 87 88 89 90
41 44 46 48 50 51 52 53
56 58 59 62 65 67 70
33 32 31 28 27 25
57 58 61 64 66 69
60 59 56 53 50 47
69 70 72 73 75 78
39 42 44 47 48
57 60 61 62 63 66 68 69
2 3 5 7 9 10
66 67 68 69 70 71 72
9 8 7 4 1
86 84 81 79 76 73 72
56 55 54 52 50
35 38 41 42 45 46
41 39 38 35 34 31
85 82 79 76 73 71 69
10 13 14 15 16 19 22
31 28 26 24 22 19
89 88 86 83 82 81 80
50 47 46 44 43 42 39 38
64 63 60 59 56 54 51 49
43 41 40 39 37 35 33
64 61 58 57 54 52 50
41 44 45 47 49
89 90 93 94 96
39 36 33 30 27 25
30 28 27 25 24
83 84 86 88 89 92 95
42 41 38 35 32
30 29 27 26 23 22 21 20
8 10 11 12 15
59 56 54 52 51
64 63 61 59 56 54 53 52
68 69 70 73 75 76 79
62 64 66 68 70 73 75
33 35 36 37 39 41
49 52 55 56 59 61
46 48 51 53 54 57 60 61
24 26 29 31 33 34 35
41 39 36 35 34 33 30
98 96 93 90 87 86 84
31 29 28 27 25 22 21
28 31 32 34 35 36 39
76 77 80 82 84 86
10 12 15 17 18 19 22
75 76 79 81 83
44 43 41 40 38 35 32 31
63 65 67 70 73 75 77 78
69 66 63 62 60
17 20 22 24 26 27
90 87 85 82 81 78
95 94 93 90 87 85 83 80
18 21 23 24 26
43 41 40 38 37 35 33 32
70 71 72 74 75 78 79 80
32 30 27 25 23 21
55 57 59 62 64 67 69
52 53 54 56 59 61 62 65
29 27 24 21 20
41 42 44 45 46 47
67 69 70 73 76
24 22 21 20 17 14 13
73 72 69 67 65 63 61
19 20 22 23 24 25 28 29
37 36 35 34 31 30 29 27
42 43 44 46 49
79 82 85 88 90
27 25 22 20 18
47 49 52 55 57
68 66 64 62 59 56
89 87 84 82 80
93 91 90 87 86
31 28 26 25 22
12 9 7 4 2
27 26 24 22 21
71 74 76 79 81 82
24 23 20 17 14 11 10
58 55 52 49 48
97 94 92 89 87 86 85 82
91 88 87 85 83 82
63 60 57 56 53 52 51 49
63 66 68 70 73 76
22 20 19 18 15 13
65 63 62 61 60 59
97 95 94 91 88 85
13 15 18 20 21 23
66 67 70 71 74 77
61 60 58 56 53 52 49
17 15 12 11 10 7 6 3
86 87 88 89 91 92
78 80 83 86 89 91 92 94
66 65 63 62 61 59 58
84 86 88 89 92
80 83 86 87 88
69 68 65 62 60 59 56 53
57 59 62 65 68 69 72 73
11 14 15 16 18 21 22
20 21 23 26 29 31 33
26 25 24 22 20 18
25 28 29 32 34
63 62 61 60 59 57 56
69 72 75 77 80 82 83 86
59 56 53 50 48 45 42
30 33 34 36 37 40
51 48 45 42 41
79 81 83 85 87 89 90 93
59 61 63 64 66 69 70 72
44 45 46 49 51 54 57 59
40 41 42 43 46 48 51
10 13 15 17 20 21 23 25
11 9 6 5 4 3
88 90 91 93 94 97
94 93 90 87 84 83 80 78
72 74 76 79 82 83 86
91 90 89 88 87 86
24 27 30 33 35 37 38 41
54 53 50 48 45 43 40
75 74 72 70 68 66 63
86 85 83 80 78 75
72 73 76 77 78 79 82
81 79 78 77 76 74 71 69
11 14 16 19 21
83 80 77 74 71 70
75 77 79 82 85 87 89 91
38 40 41 44 47 49
37 39 40 43 46 48 51
26 25 22 21 19 16
28 25 24 22 19 17 15 14
99 96 93 91 88 87 86
68 67 66 65 62 60 58
36 38 41 43 46
69 71 74 76 78 80 83 85
37 34 31 28 27 26
70 73 76 77 78 80 81 83
65 64 61 59 57 54 52
13 10 9 6 4
85 88 91 93 94
77 78 80 83 86 87 90 93
36 37 38 39 42 45 46 47
66 69 70 73 76 79 80
81 80 77 75 74 71 69
56 53 50 47 45 42 40
75 72 70 67 65 64 61 59
35 33 30 28 26 24 21
13 14 16 17 18 20 23 25
30 31 32 33 36 39
40 37 35 34 32 29 26 25
19 17 16 14 13 12 11 9
54 53 50 47 44
65 64 62 60 57 54
37 35 32 29 27
28 29 32 35 38 40 43 46
87 90 92 93 95 97
9 10 13 16 17 18 20
60 57 55 54 53 52 50 47
74 73 71 69 66
62 63 66 69 70 71
37 39 42 43 44 46 48
15 18 19 20 22
62 59 58 56 55 54 52 50
29 26 25 23 20 19
62 63 66 67 68 70
97 96 94 93 92 91 88
42 40 37 35 34
65 63 60 57 56 54 51
39 38 37 36 35 33
45 42 39 36 34 33
37 35 33 30 28 25 24 22
20 19 16 15 12 9
41 38 35 34 33 31 30 29
69 67 65 63 62 59
77 75 73 71 70 68 65 63
3 5 8 10 13 16 18
21 23 25 27 30 33 35
67 66 64 62 60
95 92 90 87 84
66 63 60 57 56 53 50 49
47 46 44 41 40
39 42 43 44 47
57 56 53 51 48 47
23 24 25 26 28 30 31
78 79 80 81 83 86 87
13 16 18 20 21 24
90 88 86 83 82 80 78 77
82 80 79 77 76 73 71 68
64 65 67 69 71
64 66 68 69 71 73 74
25 27 28 31 32 35 36 39
54 55 57 58 59
58 55 52 49 46
18 15 12 9 8 5 3
13 15 17 19 22 25 26 28
77 79 82 85 88
59 61 63 66 69
15 12 11 8 7 6
60 63 65 67 70 71 74
75 74 71 68 67 65 63
39 40 43 46 48
67 70 73 75 76 78 81
73 70 67 64 61
22 24 25 28 31
62 64 67 69 71 73
44 41 40 37 36 33 32 31
50 47 45 43 41 39 37 34
36 38 40 41 42
93 92 90 87 86 84 83 82
17 14 11 10 8
90 87 86 84 81
56 57 60 63 64 66 67 69
38 36 33 32 31
67 64 63 60 57 54 52 51
76 77 79 81 83
82 83 86 87 88
39 40 43 45 46 49 52
67 68 71 73 75 76 78 81
25 24 21 18 17 16 15 13
89 86 83 80 78 77 75 72
20 21 23 25 27 28 29
1 4 6 9 12 15 18 19
51 52 53 54 55 56 57
71 70 68 67 65 62 61
29 26 24 21 18 17 15
55 53 52 50 49 48 46 45
24 27 28 29 32 33 34 37
61 64 65 66 67 68
82 80 77 75 74
71 68 66 63 61 58 56 54
27 28 30 31 33 35 38 41
12 13 16 19 21 24 26
46 49 51 54 55 58 59 61
63 62 60 57 54
78 75 74 71 69 66 64
84 82 80 77 75 72
75 72 70 68 67
52 54 57 59 61 64
42 45 47 49 50 53
80 83 85 86 88 91 93 94
29 32 33 36 38
4 5 7 8 9
37 36 35 33 31 29
58 59 62 63 65 67
60 58 56 55 53
76 79 81 82 84 86 87
87 89 90 92 93 95 96
59 61 64 65 68
63 65 68 69 71 74
81 83 86 89 90 91 94 95
54 53 51 50 49 47 44
78 81 83 86 89 92
64 65 68 69 70
30 28 25 22 21 18 17
36 34 33 32 30
31 30 27 24 23 22 21 18
62 64 65 66 69 72
9 6 5 3 1
6 8 11 13 14
51 49 48 47 45 43 41
76 75 74 71 68 65 63 61
83 85 88 91 92 93
51 49 47 45 44 43
69 66 64 62 60 58
6 7 9 10 12 13 16 19
45 44 43 42 41
56 58 60 63 64 67 68
71 73 76 78 81 83 84 86
83 82 81 78 75 72 70 67
51 50 48 45 42 39 37
88 86 85 82 79
51 48 46 43 42 40 39 38
34 36 39 42 45 48 50 53
27 24 22 21 19 17 16
66 63 61 60 58 57 54 53
83 84 87 90 91 94 96 98`

console.log(countSafeReportsWithDampener(input)); // Output: (Number of safe reports)

