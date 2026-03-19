def get_set():
    raw_input = input().split()
    source_set = {int(x) for x in raw_input}

    set = {x**5 + 1 for x in source_set}

    result = sorted(set)

    print(*result)

if __name__ == "__main__":
    get_set()
